import { useEffect, useState } from "react";
import OnClickCartAdds from "./productmap";
import BuyNowClick from "./Buynow";


export default function productslist() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [category_chk, setcategory_chk] = useState(() => {
        return localStorage.getItem("category_chk") || "All"; // Default to "All"
    });

    const filteredProducts =
        category_chk === "All"
            ? products
            : products.filter(
                    (product) => product.category === category_chk
                );

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);

            })
            .catch((error) => console.log(error));
    }, []);


    useEffect(() => {
        if (products && products.length > 0) {      // Check if products exist and are not empty
            // Extract all categories
            const allCategories = products.map(
                (products) => products.category
            );
            setFilter(allCategories);
            console.log("All categories:", allCategories);

            // Extract unique categories (using Set)
            const uniqueCategories = ["All",...new Set(allCategories)];
            setFilter(uniqueCategories);

            console.log("Unique categories:", uniqueCategories);
        }
    }, [products]);

    function returnOnClickProducts(event, category) {
        event.preventDefault(); // Prevent page reload
        const onClickProducts = document.getElementsByClassName(category);
        console.log("Products with category:", category, onClickProducts);
        setcategory_chk(category);
    }

    function renderCategories() {
        return (
            <>
                <ul className="text-2xl text-start flex-col">
                    {filter.map((category, index) => (
                        <li key={index}>
                            <a
                                href={`/category/${category}`}
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
            </>
        );
    };

    function returnOnClickCartAdds(event) {
        event.preventDefault();

        // Find the closest parent productCard
        const productCard = event.currentTarget.closest(".productCard");

        if (productCard) {
            // Get the product title from the corresponding ID
            const productTitleElement = productCard.querySelector(
                "[id^='product_title_cart']"
            );

            if (productTitleElement) {
                console.log(
                    "Clicked Product Add Cart:",
                    productTitleElement.innerText
                );

                productTitleElement.style.pointerEvents = "none"; // Prevent further clicks
                productTitleElement.style.opacity = "0.5"; // Make it look disabled
                productTitleElement.innerText = "Added"; // Change text
            } else {
                console.log("Product title not found.");
            }
        } else {
            console.log("Product card not found.");
        }
    }


    function formatTitle(title, maxLength = 20) {
        if (typeof title !== "string") return "Title Unavailable";

        let words = title.split(" ");
        let formattedTitle = "";
        let line = "";

        words.forEach((word) => {
            if ((line + word).length <= maxLength) {
                line += (line ? " " : "") + word; // Add space between words
            } else {
                formattedTitle += line + "<br>"; // Add the line with a break
                line = word; // Start a new line with the current word
            }
        });

        formattedTitle += line; // Add the remaining words

        return formattedTitle;
    }

    function renderProducts() {
        return filteredProducts.map((product, index) => {
            // rename products to product
            return (
                <div
                    key={index}
                    className="productCard justify-items-center justify-around flex flex-col"
                    style={{
                        height: "650px",
                    }}
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
                    <div className="flex font-semibold">
                        <span
                            id={`product_title_cart`}
                            data-id={product.id} // Store the actual product ID
                            onClick={(event) => returnOnClickCartAdds(event)}
                        >
                            Add to Cart
                        </span>
                        <span
                            className="BuyNowContorl"
                            data-id={product.id} // Store the actual product ID
                        >
                            Buy Now
                        </span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="Main_Shop_Page flex gap-[5%] ">
            <nav>{renderCategories()}</nav>

            {/* Hide product listings when the cart is open */}
            {!isCartOpen && (
                <div className="productlistings gap-y-[1%] gap-x-[5%]">
                    {renderProducts()}
                </div>
            )}
            <OnClickCartAdds
                products={filteredProducts}
                setIsCartOpen={setIsCartOpen}
                IsCartOpen={isCartOpen}
            />
            <BuyNowClick products={filteredProducts} />
        </div>
    );
}


