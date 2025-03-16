export default function PageHeader({ cart, handleCartClick }) {
    return (
        <header className="flex">
            <h1 className="LogoPath"></h1>
            <nav>
                <ul className="flex text-2xl">
                    <li>
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#products">Products</a>
                    </li>
                    <li
                        className="acricle MainCart justify-items-center"
                        onClick={handleCartClick}
                    >
                        <a href="#cart">Cart</a>
                        <span id="product_add" className="flex font-semibold">
                            {cart.length > 0 ? cart.length : ""}
                        </span>
                    </li>
                </ul>
            </nav>
            <h1 className="ProfileLogo"></h1>
        </header>
    );
}
