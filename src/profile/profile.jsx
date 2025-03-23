

import { Link } from "react-router-dom";

export default function PageHeader({ cart, handleCartClick }) {
    return (
        <header className="flex header">
            <h1 className="LogoPath"></h1>
            <nav>
                <ul className="flex text-2xl">
                    <li>
                        <Link to="/">Home</Link> {/* Link to Home */}
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                        {/* Link to Products */}
                    </li>
                    <li className="flex MainCart w-[30%] justify-around">
                        <Link to="/cart">
                            Cart
                        </Link>{" "}
                        {/* Link to Cart */}
                        <span id="product_add" className="flex font-semibold">
                            {cart.length > 0 ? cart.length : ""}
                        </span>
                    </li>
                    <li>
                        {/* <Link to="/myorders">My Orders</Link>{" "} */}
                        {/* Link to My Orders */}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
