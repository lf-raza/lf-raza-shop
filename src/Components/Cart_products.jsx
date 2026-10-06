import '../styles/Cart_products.css';

function Cart_products({cart, increaseQuantity, decreaseQuantity, removeFromCart}) {
    return (
        <div className="Cart_products">
            {cart
                .map((product) => (
                <div 
                    className="Cart_item"
                    key={product.id}
                >
                    <div className="Cart_info">
                    <h2>{product.name}</h2>
                    <p>{product.price} €</p>
                    <span> <img src={product.image_url} alt={product.name} className="Cart_img" /> </span>
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
                        disabled={product.quantity >=product.stock}
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

    )


}



export default Cart_products;

    