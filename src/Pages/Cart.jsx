import '../styles/Cart.css';
import products from "../Data/products";

function Cart({addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cart}) {
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price*item.quantity,0)

  const handleCheckout = async () => {
    try{
      const response = await fetch("http://localhost:4242/api/stripe/create-checkout-session",{
        method: "post",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({cart})
      })

      const data = await response.json();

      window.location.href = data.url;
    } catch(error) {
      console.error("Erreur checkout :", error);
    }
  };
 
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
      <div className="Cart">
        <div className="Cart_container">
          <h1>Panier</h1>  
          <div className="Cart_list">
            {cart
              .map((product) => (
                <div 
                  className="Cart_item"
                  key={product.id}
                >
                  <div className="Cart_info">
                    <h2>{product.name}</h2>
                    <p>{product.price} €</p>
                    <span> {product.image} </span>
                  </div>
                  <div className="Cart_quantity">
                    <button 
                      className="Cart_decreaseQuantity"
                      onClick={()=> decreaseQuantity(product.id)}
                    >
                      -
                    </button>
                    <span> {product.quantity} </span>
                    <button 
                      className="Cart_increaseQuantity"
                      onClick={()=> increaseQuantity(product.id)}
                    >
                      +
                    </button>
                  </div> 
                  <p className="Cart_lineTotal">
                    {(product.price * product.quantity).toFixed(2)} €                   
                  </p>
                  <button 
                    className="Cart_removeFromCart"
                    onClick={()=> removeFromCart(product.id)} 
                  >
                    supprimer du panier
                  </button>                     
                                  
                </div>
              ))
            }
          </div>
          <div className="cart_summary">
            <span>Total panier</span>
            <strong>{totalCartPrice.toFixed(2)} €</strong>             
          </div> 
          <button 
            className="cart_checkout"
            onClick ={handleCheckout}
          >
            Commander
          </button>
        </div>
      </div>
    );     
}

export default Cart;