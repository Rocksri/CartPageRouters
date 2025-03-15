import { useEffect, useState } from "react";


export default function OnClickCartAdds({
    products,
    setIsCartOpen,
    IsCartOpen,
}) {
    const [cart, setCart] = useState(() => {
        // Load cart from localStorage on first render
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function handleClick(event) {
        const target = event.target;

        if (target.id && target.id.startsWith("product_title_cart")) {
            // const productId = parseInt(target.id.split("_").pop()); // Extract product ID
            const productId = parseInt(target.getAttribute("data-id")); // Get the real product ID

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
                        // If product exists, increase the count
                        return prevCart.map((item) =>
                            item.id === productId
                                ? { ...item, count: item.count + 1 }
                                : item
                        );
                    } else {
                        // Otherwise, add new product with count = 1
                        return [...prevCart, { ...productToAdd, count: 1 }];
                    }
                });
            }
            document
                .getElementById("product_add")
                .classList.add("product_added");
        }
    }

    function OnClickCartOpen(event) {
        const target = event.target;
        if (target.closest(".MainCart")) {
            if (cart.length === 0) {
                alert("Please Add Products To Cart");
            } else {
                console.log("Opening cart...");
                setIsCartOpen((prev) => !prev);
            }
        }
    }

    function CountControl(event, type) {
        const productId = parseInt(
            event.target.parentNode.getAttribute("data-id")
        );

        setCart((prevCart) => {
            const productInCart = prevCart.find(
                (item) => item.id === productId
            );

            if (productInCart) {
                const price = productInCart.price; // Access the price
                if (type === "Subract_Count") {
                    if (productInCart.count > 1) {
                        const newCount = productInCart.count - 1;
                        return prevCart.map((item) =>
                            item.id === productId
                                ? {
                                      ...item,
                                      count: newCount,
                                      total_price: parseFloat(
                                          (newCount * price).toFixed(2)
                                      ), // Calculate and format
                                  }
                                : item
                        );
                    } else {
                        // Remove from cart if count becomes 0
                        return prevCart.filter((item) => item.id !== productId);
                    }
                } else if (type === "Add_Count") {
                    const newCount = productInCart.count + 1;
                    return prevCart.map((item) =>
                        item.id === productId
                            ? {
                                  ...item,
                                  count: newCount,
                                  total_price: parseFloat(
                                      (newCount * price).toFixed(2)
                                  ), // Calculate and format
                              }
                            : item
                    );
                }
            } else {
                // Product not in cart, add it with count 1
                // Assuming you have price available when adding a new product
                const productToAdd = products.find(
                    (product) => product.id === productId
                );
                const price = productToAdd.price; // Access price
                return [
                    ...prevCart,
                    {
                        id: productId,
                        count: 1,
                        price: price,
                        total_price: parseFloat(price.toFixed(2)),
                    }, // Include price and initial total
                ];
            }
            return prevCart; // Return previous cart if no changes
        });
    }

    function removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("click", OnClickCartOpen);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("click", OnClickCartOpen);
        };
    }, [products, cart]); // Add cart as dependency.

    const productCount = document.querySelector(".product_added");
    if (productCount) {
        console.log("Cart updated:", cart);
        if (cart.length <= 0) {
            productCount.innerHTML = "";
            document
                .getElementById("product_add")
                .classList.remove("product_added");
        } else {
            productCount.innerHTML = cart.length;
        }
    }

    return IsCartOpen ? (
        cart.length > 0 ? ( // Check if cart is not empty
            <div className="cart-container gap-y-[1%] gap-x-[5%]">
                {cart.map((product, index) => (
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
                            style={{ height: "40%" }}
                        />
                        <p
                            className={`font-medium text-xl product_title_${
                                index + 1
                            }`}
                        >
                            {product.title}
                        </p>

                        <p className="text-2xl font-bold">
                            ${product.price} <br /> Total: $
                            {
                                typeof product.total_price === "number"
                                    ? product.total_price.toFixed(2) // Display total_price if it's a number
                                    : product.price.toFixed(2) // Otherwise, display the single price
                            }
                        </p>

                        <div className="CountControl flex" data-id={product.id}>
                            <button
                                className="Subract_Count"
                                onClick={(event) =>
                                    CountControl(event, "Subract_Count")
                                }
                            >
                                -
                            </button>
                            <span className="text-2xl">{product.count}</span>
                            <button
                                className="Add_Count"
                                onClick={(event) =>
                                    CountControl(event, "Add_Count")
                                }
                            >
                                +
                            </button>
                        </div>
                        <div className="flex font-semibold text-xl ">
                            <span
                                className="RemoveContorl"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Remove All
                            </span>
                            <span className="BuyNowContorl">Buy Now</span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-2xl font-semibold self-center">
                Cart is Empty
                <h2>Go Back To Shopping</h2>
            </div>
        )
    ) : null;
}
