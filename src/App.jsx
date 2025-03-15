import "./Style.css";
import Header from "./profile/profile";
import Catalog from "./profile/catalog";
import ShopPage from "./shoppage/mainshop";
import BuyNowClick from "./products/Buynow";
import HomePage from "./profile/homepage";

function App() {
    return (
        <>
            <Header />
            <Catalog />
            <ShopPage />
            <BuyNowClick />
        </>
    );
}

export default App;
