import { useState, useEffect } from "react";

export default function BuyNowClick() {
    const [buyNowProduct, setBuyNowProduct] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from localStorage on mount
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(storedCart);
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            setCart([]); // Fallback to empty array
        }
    }, []);

    function handleClickBuyNow(event) {
        const target = event.target;
        if (target.classList.contains("BuyNowContorl")) {
            const productId = parseInt(target.getAttribute("data-id"), 10);

            try {
                const storedProducts = JSON.parse(
                    localStorage.getItem("products") || "[]"
                );
                const storedCart = JSON.parse(
                    localStorage.getItem("cart") || "[]"
                );

                const productToBuy = storedProducts.find(
                    (product) => Number(product.id) === productId
                );
                const productFromCart = storedCart.find(
                    (product) => product.id === productId
                );

                if (productToBuy) {
                    setBuyNowProduct({
                        ...productToBuy,
                        count: productFromCart ? productFromCart.count : 1,
                    });
                } else {
                    console.warn(
                        "Product not found in storedProducts:",
                        productId
                    );
                }
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
            }
        }
    }

    function updateQuantity(change) {
        setBuyNowProduct((prev) => {
            if (!prev) return null;

            const newCount = Math.max(1, prev.count + change);
            const updatedProduct = { ...prev, count: newCount };

            // Update cart state immediately
            setCart((prevCart) => {
                const updatedCart = prevCart.map((p) =>
                    p.id === updatedProduct.id ? updatedProduct : p
                );

                if (!updatedCart.find((p) => p.id === updatedProduct.id)) {
                    updatedCart.push(updatedProduct);
                }

                return updatedCart;
            });

            return updatedProduct;
        });
    }

    function handleCheckout() {
        if (!buyNowProduct) return;

        // Show alert
        alert("Product Ordered!");

        try {
            // Get current cart from localStorage
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

            // Remove the purchased product from the cart
            const updatedCart = storedCart.filter(
                (product) => product.id !== buyNowProduct.id
            );

            // Save updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // Get current orders from localStorage
            const storedOrders = JSON.parse(
                localStorage.getItem("orders") || "[]"
            );

            // Add the ordered product to the orders list
            storedOrders.push(buyNowProduct);

            // Save orders back to localStorage
            localStorage.setItem("orders", JSON.stringify(storedOrders));
        } catch (error) {
            console.error("Error updating localStorage:", error);
        }

        // Clear buyNowProduct state (close modal)
        setBuyNowProduct(null);
    }

    function closeModal() {
        setBuyNowProduct(null);
    }

    // Update localStorage whenever cart changes
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart]);

    useEffect(() => {
        document.addEventListener("click", handleClickBuyNow);
        return () => {
            document.removeEventListener("click", handleClickBuyNow);
        };
    }, []);

    if (!buyNowProduct) return null;

    return (
        buyNowProduct && (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={closeModal}
            >
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[700px] flex flex-col justify-around"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4">Buy Now</h2>

                    {buyNowProduct?.image && (
                        <img
                            src={buyNowProduct.image}
                            alt={buyNowProduct.title || "Product Image"}
                            className="w-full h-[40%] object-contain rounded-md"
                        />
                    )}

                    <h3 className="text-xl font-bold">
                        {buyNowProduct?.title || "No Title"}
                    </h3>

                    <p className="text-xl font-medium text-gray-700">
                        {buyNowProduct?.price !== undefined
                            ? `$${buyNowProduct.price.toFixed(2)}`
                            : "Price not available"}
                    </p>

                    <div className="flex items-center justify-around font-semibold text-2xl">
                        <button
                            className="px-3 py-1 bg-gray-300 rounded"
                            onClick={() => updateQuantity(-1)}
                        >
                            -
                        </button>
                        <span>{buyNowProduct?.count || 1}</span>
                        <button
                            className="px-3 py-1 bg-gray-300 rounded"
                            onClick={() => updateQuantity(1)}
                        >
                            +
                        </button>
                    </div>

                    <p className="text-2xl font-semibold">
                        Total: $
                        {buyNowProduct?.price !== undefined
                            ? (
                                  buyNowProduct.count * buyNowProduct.price
                              ).toFixed(2)
                            : "0.00"}
                    </p>

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        ✖
                    </button>
                </div>
            </div>
        )
    );
}
