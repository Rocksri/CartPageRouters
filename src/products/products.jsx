import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import OnClickCartAdds from "./productmap";

export default function ProductList({ cartPage, cart, setCart }) {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [category_chk, setcategory_chk] = useState(() => {
        return localStorage.getItem("category_chk") || "All";
    });
    const [addedProducts, setAddedProducts] = useState([]);
    const location = useLocation(); // Get the current location

    // Fetch products on component mount
    useEffect(() => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            fetch("https://fakestoreapi.com/products")
                .then((response) => response.json())
                .then((result) => {
                    setProducts(result);
                    localStorage.setItem("products", JSON.stringify(result));
                })
                .catch((error) =>
                    console.error("Error fetching products:", error)
                );
        }
    }, []);

    // Update categories when products change
    useEffect(() => {
        if (products && products.length > 0) {
            const allCategories = products.map((product) => product.category);
            const uniqueCategories = ["All", ...new Set(allCategories)];
            setFilter(uniqueCategories);
        }
    }, [products]);

    // Sync addedProducts with cart whenever cart changes
    useEffect(() => {
        const productIdsInCart = cart.map((item) => item.id);
        setAddedProducts(productIdsInCart);
    }, [cart]);

    // Reset addedProducts when navigating away from the cart page
    useEffect(() => {
        if (location.pathname !== "/cart") {
            setAddedProducts([]); // Reset addedProducts when not on the cart page
        }
    }, [location.pathname]);

    // Memoize filtered products to avoid unnecessary recalculations
    const filteredProducts = useMemo(() => {
        return category_chk === "All"
            ? products
            : products.filter((product) => product.category === category_chk);
    }, [products, category_chk]);

    // Handle category filter change
    function returnOnClickProducts(event, category) {
        event.preventDefault();
        setcategory_chk(category);
        localStorage.setItem("category_chk", category);
    }

    // Render category filters
    function renderCategories() {
        return (
            <ul className="text-2xl text-start flex-col">
                {filter.map((category, index) => (
                    <li key={index}>
                        <a
                            href={`/productpage?category=${category}`}
                            onClick={(event) =>
                                returnOnClickProducts(event, category)
                            }
                            className={category}
                        >
                            {category}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    // Add product to cart
    function handleAddToCart(productId) {
        const productToAdd = products.find(
            (product) => product.id === productId
        );

        if (productToAdd) {
            setCart((prevCart) => {
                const existingProduct = prevCart.find(
                    (item) => item.id === productId
                );

                if (existingProduct) {
                    alert("Product Already In Cart");
                    return prevCart.map((item) =>
                        item.id === productId
                            ? { ...item, count: item.count + 1 }
                            : item
                    );
                } else {
                    return [...prevCart, { ...productToAdd, count: 1 }];
                }
            });

            // Update addedProducts only for the specific productId
            setAddedProducts((prev) => {
                if (!prev.includes(productId)) {
                    return [...prev, productId]; // Add the productId to addedProducts
            }
                return prev; // If already added, return the previous state
            });
        }
    }

    // Format product title for display
    function formatTitle(title, maxLength = 20) {
        if (typeof title !== "string") return "Title Unavailable";
        let words = title.split(" ");
        let formattedTitle = "";
        let line = "";
        words.forEach((word) => {
            if ((line + word).length <= maxLength) {
                line += (line ? " " : "") + word;
            } else {
                formattedTitle += line + "<br>";
                line = word;
            }
        });
        formattedTitle += line;
        return formattedTitle;
    }

    // Render product listings
    function renderProducts() {
        return filteredProducts.map((product, index) => {
            return (
                <div
                    key={index}
                    className="productCard items-center justify-between flex flex-col"
                    style={{ height: "650px" }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-[50%]"
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: formatTitle(product.title),
                        }}
                        className={`font-medium product_title_${index + 1}`}
                        id={`product_title_${index + 1}`}
                    />
                    <p className="text-xl font-bold">${product.price}</p>
                    <div className="h-[20%] w-[60%] flex flex-col justify-around font-semibold">
                        <span
                            id={`product_title_cart_${product.id}`}
                            data-id={product.id}
                            onClick={() => handleAddToCart(product.id)}
                            style={{
                                pointerEvents: addedProducts.includes(
                                    product.id
                                )
                                    ? "none"
                                    : "auto",
                                opacity: addedProducts.includes(product.id)
                                    ? 0.5
                                    : 1,
                            }}
                        >
                            {addedProducts.includes(product.id)
                                ? "Added"
                                : "Add to Cart"}
                        </span>
                        <span className="BuyNowContorl" data-id={product.id}>
                            Buy Now
                        </span>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="Main_Shop_Page flex gap-[5%] justify-center">
            {!cartPage && <nav>{renderCategories()}</nav>}

            {!cartPage && (
                <div className="productlistings grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {renderProducts()}
                </div>
            )}

            {cartPage && (
                <OnClickCartAdds
                    cart={cart} // Pass cart state
                    setCart={setCart} // Pass setCart function
                />
            )}
        </div>
    );
}