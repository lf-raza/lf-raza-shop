import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AppRoutes from "./AppRoutes";


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      return JSON.parse(savedCart)
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) => 
          item.id === product.id ? 
          {...item, quantity : item.quantity+1 }
          : item
        )
      );
    } else {
      setCart([...cart, {...product, quantity :1}]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>  
        item.id === id ?
        {...item, quantity : item.quantity + 1}
        : item
      )   
    );
  };

  const decreaseQuantity = (id) => {
     setCart(
      cart
        .map((item) =>  
          item.id === id ?
          {...item, quantity : item.quantity - 1}
          : item
        )
        .filter((item) => item.quantity > 0)
    );      
  };

  const removeFromCart = (id) => {
    console.log("id reçu :", id);
    console.log("cart avant suppression :", cart);
    setCart(
      cart.filter((item) => Number(item.id) !== Number(id) )
    );
  };

  return (
    <div className="app-layout">
      <Header 
        addToCart={addToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        cart={cart}
      />

      
      <main className="app-main">
        <AppRoutes 
          addToCart={addToCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </main>


      <Footer />
    </div>
  );
}

export default App;