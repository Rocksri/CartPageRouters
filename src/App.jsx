import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import ProductList from "./products/products";
import BuyNowClick from "./products/Buynow";
import PageHeader from "./profile/profile";
import HomePage from "./profile/homepage"; // Corrected typo in import
// import "./Style.css";
import "./App.css";


function AppContent() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const [cartPage, setCartPage] = useState(false);
    const location = useLocation(); // Get the current location

    // Update cartPage based on the current route
    useEffect(() => {
        if (location.pathname === "/cart") {
            setCartPage(true);
        } else if (location.pathname === "/products") {
            setCartPage(false);
        }
    }, [location.pathname]); // Re-run effect when the path changes

    return (
            <div className="App">
                <PageHeader cart={cart} />
                <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<HomePage />} />
                    {/* Products Page */}
                    <Route
                        path="/products"
                        element={
                            <ProductList
                                cartPage={cartPage}
                                cart={cart}
                                setCart={setCart}
                            />
                        }
                    />
                    {/* Cart Page */}
                    <Route
                        path="/cart"
                        element={
                            <ProductList
                                cartPage={cartPage}
                                cart={cart}
                                setCart={setCart}
                            />
                        }
                    />
                </Routes>
                <BuyNowClick />
            </div>
    );
}


export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}