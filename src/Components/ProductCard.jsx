import '../styles/ProductCard.css';
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart, removeFromCart }) {
  return (
    <div className="ProductCard">
      <h3> {product.name} </h3> 
      <img src={product.image} alt={product.name} className="ProductCard_img"/> 
      <p className="ProductCard_description"> {product.description} </p>
      <p className="ProductCard_price"> {product.price} €</p>
      <button onClick={()=> addToCart(product)} >Ajouter au panier</button>
      <span>
         <Link to={`/Boutique/${product.id}`}
            className="ProductCard_produit" 
         >
            En savoir plus
         </Link>
      </span>
      {/*
      <span>
        <button onClick={()=> removeFromCart(product.id)} >Supprimer panier</button>
      </span>
      */}
    </div>
  );
}


export default ProductCard;
