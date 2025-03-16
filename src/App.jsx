import { useState, useEffect } from "react";
import "./Style.css";
import ProductList from "./products/products";
import BuyNowClick from "./products/Buynow";
import PageHeader from "./profile/profile";

export default function App() {
    const [currentPage, setCurrentPage] = useState("#home");
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartClick = () => {
        if (cart.length === 0) {
            alert("Please Add Products To Cart");
            window.location.hash = "#products"; // Redirect to Products page
        } else {
            setIsCartOpen((prev) => !prev); // Toggle cart open/close
        }
    };

    // Handle hash change
    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash || "#home";
            setCurrentPage(newHash);

            // Reset isCartOpen when navigating away from the cart page
            if (newHash !== "#cart") {
                setIsCartOpen(false);
            }
        };

        // Add event listener for hash change
        window.addEventListener("hashchange", handleHashChange);

        // Trigger initial hash check
        handleHashChange();

        // Cleanup event listener
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <div className="App">
            <PageHeader cart={cart} handleCartClick={handleCartClick} />
            {currentPage === "#home" && (
                <div className="home-page flex flex-col items-center">
                    <h1>Welcome to Our Store</h1>
                    <a href="#products">Browse Products</a>
                </div>
            )}
            {currentPage === "#products" && (
                <ProductList
                    cart={cart}
                    setCart={setCart}
                    setIsCartOpen={setIsCartOpen}
                    IsCartOpen={isCartOpen}
                />
            )}
            {currentPage === "#cart" && (
                <ProductList
                    cartPage={true}
                    cart={cart}
                    setCart={setCart}
                    setIsCartOpen={setIsCartOpen}
                    IsCartOpen={isCartOpen}
                />
            )}
            <BuyNowClick />
        </div>
    );
}
