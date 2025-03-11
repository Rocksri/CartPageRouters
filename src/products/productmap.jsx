import { useEffect, useState } from "react";

export default function OnClickCartAdds({ products, setIsCartOpen, IsCartOpen }) {
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
                    const existingProduct = prevCart.find((item) => item.id === productId);

                    if (existingProduct) {
                        // If product exists, increase the count
                        return prevCart.map((item) =>
                            item.id === productId ? { ...item, count: item.count + 1 } : item
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

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [products]);


    useEffect(() => {
        document.addEventListener("click", OnClickCartOpen);

        return () => {
            document.removeEventListener("click", OnClickCartOpen);
            const productCount =
                document.querySelector(".product_added");
            if (productCount) {
                productCount.innerHTML = cart.length;
            }
        };
    }, [cart]);

    console.log(cart)
    return (
        IsCartOpen && ( // Only render when cart is not empty
            <div className="cart-container gap-[5%]">
                {cart.map((product, index) => (
                    <div
                        key={index}
                        className="productCard justify-items-center p-[5%] flex"
                        style={{
                            height: cart.length < 7 ? "60%" : "auto",
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
                            ${product.price} <br /> Total ${product.price * product.count}
                        </p>

                        <div className="flex font-semibold text-2xl">
                            <span>{product.count}</span>
                            <span>Buy Now</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
}

