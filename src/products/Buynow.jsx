import { useState, useEffect } from "react";

export default function BuyNowClick({ products }) {
    const [buyNowProduct, setBuyNowProduct] = useState(null);

    function handleClickBuyNow(event) {
        const target = event.target;

        if (target.classList.contains("BuyNowContorl")) {
            const productId = parseInt(target.getAttribute("data-id"), 10);
            const productToBuy = products.find(
                (product) => Number(product.id) === Number(productId)
            );

                console.log(productToBuy);

            if (productToBuy) {
                setBuyNowProduct({ ...productToBuy, count: 1 });
            }
        }
    }

    function updateQuantity(change) {
        setBuyNowProduct((prev) => {
            if (!prev) return null;
            return { ...prev, count: Math.max(1, prev.count + change) };
        });
    }

    function closeModal() {
        setBuyNowProduct(null);
    }


    useEffect(() => {
        document.addEventListener("click", handleClickBuyNow);

        return () => {
            document.removeEventListener("click", handleClickBuyNow);
        };
    }, [buyNowProduct]);

    if (!buyNowProduct) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4">Buy Now</h2>

                <img
                    src={buyNowProduct.image}
                    alt={buyNowProduct.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h3 className="text-xl font-semibold">{buyNowProduct.title}</h3>
                <p className="text-lg text-gray-700">
                    ${buyNowProduct.price.toFixed(2)}
                </p>

                <div className="flex items-center justify-between my-4">
                    <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(-1)}
                    >
                        -
                    </button>
                    <span className="text-xl">{buyNowProduct.count}</span>
                    <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(1)}
                    >
                        +
                    </button>
                </div>

                <p className="text-lg font-semibold">
                    Total: $
                    {(buyNowProduct.count * buyNowProduct.price).toFixed(2)}
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
