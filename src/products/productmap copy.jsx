import { useEffect, useState } from "react";

export default function OnClickCartAdds({
    products,
    setIsCartOpen,
    IsCartOpen,
}) {
    // Load cart from localStorage on initial render
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [cartCount, setCartCount] = useState(cart.length); // Store cart count

    // Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartCount(cart.reduce((total, item) => total + item.count, 0)); // Update count
    }, [cart]);

    function handleClick(event) {
        const target = event.target;

        if (target.id && target.id.startsWith("product_title_cart")) {
            const productId = parseInt(target.getAttribute("data-id"));

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
            }
        }
    }

    function removeFromCart(productId) {
        setCart((prevCart) => {
            return prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, count: item.count - 1 }
                        : item
                )
                .filter((item) => item.count > 0);
        });
    }

    function CountControl(event, type) {
        const productId = parseInt(
            event.target.parentNode.getAttribute("data-id")
        );

        setCart((prevCart) => {
            return prevCart.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          count:
                              type === "Add_Count"
                                  ? item.count + 1
                                  : Math.max(1, item.count - 1),
                      }
                    : item
            );
        });
    }

    return (
        <>
            {/* Cart Count Display - This will dynamically update */}
            <span id="product_add" className="flex font-semibold">
                {cartCount}
            </span>

            {IsCartOpen && (
                <div className="cart-container gap-y-[1%] gap-x-[5%]">
                    {cart.map((product, index) => (
                        <div
                            key={index}
                            className="productCard flex flex-col"
                            style={{ height: "650px" }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ height: "40%" }}
                            />
                            <p className="font-medium text-xl">
                                {product.title}
                            </p>
                            <p className="text-2xl font-bold">
                                ${product.price} <br /> Total: $
                                {product.price * product.count}
                            </p>
                            <div
                                className="CountControl flex"
                                data-id={product.id}
                            >
                                <button
                                    onClick={(event) =>
                                        CountControl(event, "Subract_Count")
                                    }
                                >
                                    -
                                </button>
                                <span className="text-2xl">
                                    {product.count}
                                </span>
                                <button
                                    onClick={(event) =>
                                        CountControl(event, "Add_Count")
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex font-semibold text-xl">
                                <span
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    Remove All
                                </span>
                                <span className="BuyNowControl">Buy Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
