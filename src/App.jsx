import { useState } from "react";
import "./Style.css";
import Header from "./profile/profile";
import Catalog from "./profile/catalog";
import ShopPage from "./shoppage/mainshop";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Catalog />
      <ShopPage/>
    </>
  );
}

export default App;
