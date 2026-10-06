import '../styles/ProductCard.css';
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart, removeFromCart }) {
  return (
    <div className="ProductCard">
      <h3> {product.name} </h3> 
      {/* Cadre de l'image */}
      <div className="ProductCard_imgContainer">
        <img
           src={product.image_url}
           alt={product.name}
           className="ProductCard_img"
        />
      </div> 
      <p className="ProductCard_description"> {product.quantityDescription} </p>
      <p className="ProductCard_price"> {product.price} €</p>
      
      <div className="ProductCard_actions">
        <button onClick={()=> addToCart(product)} >
          Ajouter au panier
        </button>
      
        <Link 
           to={`/Boutique/${product.id}`}
            className="ProductCard_produit" 
         >
            En savoir plus
         </Link>

      </div>
      {/*
      <span>
        <button onClick={()=> removeFromCart(product.id)} >Supprimer panier</button>
      </span>
      */}
    </div>
  );
}


export default ProductCard;
