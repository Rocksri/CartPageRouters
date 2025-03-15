

export default function pageHeader() {
    return (
        <header className="flex">
            <h1 className="LogoPath"></h1>
            <nav>
                <ul className="flex text-2xl">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Menu</a>
                    </li>
                    <li className="acricle MainCart justify-items-center">
                        <a href="#">Cart</a>
                        <span
                            id="product_add"
                            className="flex font-semibold"
                        ></span>
                    </li>
                </ul>
            </nav>
            <h1 className="ProfileLogo"></h1>
        </header>
    );
}
