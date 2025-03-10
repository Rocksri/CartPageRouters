

export default function pageHeader() {
    return (
        <header className="flex">
            <h1>Logo</h1>
            <nav>
                <ul className="flex text-2xl">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Menu</a>
                    </li>
                    <li className="acricle">
                        <a href="#">Cart</a>
                        <span id="product_add" className="flex">
                            <span id="product_add_count" className=""></span>
                        </span>
                    </li>
                    <li>
                        <a href="#">Search</a>
                    </li>
                </ul>
            </nav>
            <h1>Profile</h1>
        </header>
    );
}
