import { useEffect, useState } from "react";

export default function OnClickCartAdds({ products }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    function handleClick(event) {
        const target = event.target;
        if (target.id && target.id.startsWith("product_title_cart_")) {
            const productId = parseInt(target.id.split("_").pop()); // Extract product ID


            const productToAdd = products.find(
                (product) => product.id === productId
            );


            if (productToAdd) {
                setCart((prevCart) => [...prevCart, productToAdd]);
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
        const productCount = document.querySelector(".product_added");
        if (productCount) {
            productCount.innerHTML = cart.length;
        }
    }, [cart]);


    useEffect(() => {
        document.addEventListener("click", OnClickCartOpen);

        return () => {
            document.removeEventListener("click", OnClickCartOpen);
        };
    }, [cart]);


    return (
        <div>
            {/* Cart Items Display - Only when isCartOpen is true */}
            {isCartOpen && (
                <div className="cart-container flex">
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
                                className="h-[60%]"
                            />
                            <p
                                className={`font-medium product_title_${
                                    index + 1
                                }`}
                            >
                                {product.title}
                            </p>
                            <p className="text-xl font-bold">
                                ${product.price}
                            </p>
                            <div className="flex font-semibold">
                                <span id={`product_title_cart_${index + 1}`}>
                                    Add to Cart
                                </span>
                                <span>Buy Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

