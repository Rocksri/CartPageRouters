import React, { useEffect, useState } from "react";

export default function OnClickCartAdds({
  products,
  setIsCartOpen,
  IsCartOpen,
}) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [productAdded, setProductAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === productId);

        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === productId ? { ...item, count: item.count + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, count: 1 }];
        }
      });
      setProductAdded(true);
      setTimeout(() => setProductAdded(false), 2000);
    }
  };

  const handleCartClick = () => {
    if (cart.length === 0) {
      alert("Please Add Products To Cart");
    } else {
      setIsCartOpen((prev) => !prev);
    }
  };

  const handleCountChange = (productId, type) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === productId);

      if (productInCart) {
        if (type === "Subract_Count") {
          if (productInCart.count > 1) {
            return prevCart.map((item) => {
              if (item.id === productId) {
                const newCount = item.count - 1;
                return {
                  ...item,
                  count: newCount,
                  total_price: parseFloat(
                    (newCount * item.price).toFixed(2)
                  ),
                };
              }
              return item;
            });
          } else {
            return prevCart.filter((item) => item.id !== productId);
          }
        } else if (type === "Add_Count") {
          return prevCart.map((item) => {
            if (item.id === productId) {
              const newCount = item.count + 1;
              return {
                ...item,
                count: newCount,
                total_price: parseFloat(
                  (newCount * item.price).toFixed(2)
                ),
              };
            }
            return item;
          });
        }
      } else {
        // Product not in cart, add it with count 1
        // Assuming you have price available when adding a new product
        const productToAdd = products.find(
          (product) => product.id === productId
        );
        const price = productToAdd.price;
        return [
          ...prevCart,
          {
            id: productId,
            count: 1,
            price: price,
            total_price: parseFloat(price.toFixed(2)),
          },
        ];
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      {/* Product List (Example) */}
      <div className="productlistings">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <h3>{product.title}</h3>
            <button
              id={`product_title_cart_${product.id}`}
              data-id={product.id}
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <div className="MainCart" onClick={handleCartClick}>
        <a href="#">Cart</a>
        <span
          id="product_add"
          className={`flex ${productAdded ? "product_added" : ""}`}
        >
          {cart.length} {/* Display cart.length here */}
        </span>
      </div>

      {/* Cart Display */}
      {IsCartOpen && (
        <div className="cart-container gap-y-[1%] gap-x-[5%]">
          {cart.map((product, index) => (
            <div
              key={index}
              className="productCard justify-items-center justify-around flex flex-col"
              style={{
                height: "650px",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ height: "40%" }}
              />
              <p
                className={`font-medium text-xl product_title_${
                  index + 1
                }`}
              >
                {product.title}
              </p>
              <p className="text-2xl font-bold">
                ${product.price.toFixed(2)} <br />
                Total $
                {typeof product.total_price === "number"
                  ? product.total_price.toFixed(2)
                  : product.price.toFixed(2)}
              </p>
              <div className="CountControl flex" data-id={product.id}>
                <button
                  className="Subract_Count"
                  onClick={() => handleCountChange(product.id, "Subract_Count")}
                >
                  -
                </button>
                <span className="text-2xl">{product.count}</span>
                <button
                  className="Add_Count"
                  onClick={() => handleCountChange(product.id, "Add_Count")}
                >
                  +
                </button>
              </div>
              <div className="flex font-semibold text-xl ">
                <span
                  className="RemoveContorl"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove All
                </span>
                <span className="BuyNowContorl">Buy Now</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}