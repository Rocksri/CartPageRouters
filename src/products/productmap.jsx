import { useEffect, useState } from "react";

export default function OnClickCartAdds({ products }) {
    const [cart, setCart] = useState([]);

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
            document
                .getElementById("product_add")
                .classList.add("product_added_count");
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [products]);

    useEffect(() => {
        const productCount = document.querySelector(".product_added_count");
        if (productCount) {
            productCount.innerHTML = cart.length;
        }
    }, [cart]);
}


