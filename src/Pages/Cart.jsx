import { supabase } from '../lib/supabaseClient';
import '../styles/Cart.css';
import { useState, useEffect } from "react";
import Cart_summary from "../Components/Cart_summary.jsx";
import Cart_products from '../Components/Cart_products.jsx';


function Cart({addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cart, products, loadingProducts,session}) {

  
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);

  const token = session?.access_token;
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price*item.quantity,0)


  useEffect(()=>{
    const fetchDeliveryMethods = async () => {
      const {data, error} = await supabase
        .from("delivery_methods")
        .select("code,label,price_cents")
        .eq("active", true)

      if (error) {
        console.error("Erreur modes de livraison :", error);
        return;
      }
      setDeliveryMethods(data);
    };
    fetchDeliveryMethods();
  },[]);

  const selectedDelivery = deliveryMethods.find((method) => method.code === deliveryMethod);

  const deliveryPrice = (selectedDelivery?.price_cents ?? 0) / 100;

  const handlePromoCode = async() => {

    const response = await fetch("http://localhost:4242/api/promo/check",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        promoCode,
        totalCartPrice,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      setDiscount(0);
      setPromoMessage(data.message || "Code promo invalide.");
      return;
    }

    setDiscount(data.discountAmount);

  };

  const finalTotal = Math.max(totalCartPrice - discount + deliveryPrice,0);

  const handleCheckout = async () => {

    try{

      const headers = {
      "Content-Type" : "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:4242/api/stripe/create-checkout-session",{
        method: "post",
        headers: headers,
        body: JSON.stringify({
          cart,
          deliveryMethod,
          promoCode,
        })
      })

      const data = await response.json();
      console.log("Réponse backend :", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.log("Pas d'URL Stripe reçue");
      }
      
    } catch(error) {
      console.error("Erreur checkout :", error);
    }
  };

  if (loadingProducts) {
    return <p>Chargement du panier...</p>
  }

  if (cart.length === 0 ) {
    return (
      <div className="Cart">
        <div className="Cart_container">
          <h1>Panier</h1>
          <p className="cart_empty">
            Le panier est vide
          </p>
        </div>
      </div>
    )
  }

  return ( 
    <main className="Cart">

      <h1>Votre Panier</h1>  

      <div className="Cart_content">

        <section className="Cart_productsList">
          <Cart_products
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        </section>

        <div className="Cart_checkout">

          <section className="Cart_delivery">
            <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <option value="">Choisir un mode de livraison</option>
              {deliveryMethods.map((method) => (
              <option key={method.code} value={method.code}>
                {method.label} - {(method.price_cents / 100).toFixed(2)} €
              </option>
              ))}
            </select>
          </section>

          <section className="Cart_summaryContent">
            <Cart_summary 
              totalCartPrice={totalCartPrice}
              discount={discount}
              finalTotal={finalTotal}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              promoMessage={promoMessage}
              handlePromoCode={handlePromoCode}
              handleCheckout={handleCheckout}  
              deliveryMethod={deliveryMethod}
              deliveryPrice={deliveryPrice}       
            />
          </section>

        </div>
      </div>
    </main>
  );     
}

export default Cart;