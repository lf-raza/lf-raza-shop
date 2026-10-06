import '../styles/Cart_summary.css';

function Cart_summary({totalCartPrice, discount, finalTotal, promoCode, setPromoCode, promoMessage, handlePromoCode, handleCheckout, deliveryMethod, deliveryPrice}) {

    return (
        <div className="Cart_summary">
            <h2>Récapitulatif</h2>

            <div className="promoCode">
                <input
                type="text"
                placeholder="Code P."
                value={promoCode}
                onChange={(e)=> setPromoCode(e.target.value)}
                />

                <button
                type="button"
                onClick={handlePromoCode}
                disabled={!promoCode}
                >
                Appliquer le Code Promo
                </button>
            </div>

            <div>
                <span>Sous-total </span>
                <span>{totalCartPrice.toFixed(2)} €</span>
            </div>

            {discount > 0 && (
                <div>
                <span>Réduction </span>
                <span>-{discount.toFixed(2)} €</span>
                </div>
            )}

            <div>
                <span>Livraison </span>
                <span>
                {deliveryMethod === "pickup" 
                    ? "Gratuite"
                    : `${deliveryPrice.toFixed(2)} €`}
                </span>
            </div>
            
            <div className="cartTotal">
                <strong>Total panier </strong>
                <strong>{finalTotal.toFixed(2)} €</strong>
            </div>
            
            <button 
                className="cart_checkout_btn"
                onClick ={handleCheckout}
                disabled={!deliveryMethod}
            >
                Passer au paiement
            </button> 
        </div>
    )
}

export default Cart_summary;