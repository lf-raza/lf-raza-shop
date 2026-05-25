import Home_image from "../assets/Hero.png";
import products from "../Data/products";
import ProductCard from "../Components/ProductCard";
import '../styles/Home.css';
import { useState } from "react";
import { Link } from "react-router-dom";




export default function Home({ addToCart, removeFromCart }) {
  const [startIndex, setStartIndex] = useState(0);


  const filterProducts = products.filter((product) => product.status === 1);
 
  const visibleProducts = [
    filterProducts[startIndex % filterProducts.length],
    filterProducts[(startIndex+1) % filterProducts.length],
    filterProducts[(startIndex+2) % filterProducts.length]
  ]


  const previousProducts = () => {
    startIndex === 0 ? (
      setStartIndex(filterProducts.length - 1)
    ) : (
      setStartIndex(startIndex - 1)
    )
  }

  const nextProducts = () => {
    setStartIndex(startIndex + 1)
  }
  

  return(
    <div>
      <section className="Home"> 
        <img 
          src={Home_image} 
          alt="Home_image" 
          className="Home_image"
        />
        <div className="Home_content">
          <h1>L&F RAZA</h1>
          <p className="subtitle">
            Vanille Bourbon de Madagascar - Qualité gourmet
          </p>
          <Link to="/Boutique">
            <button className="Home_btn">Découvrir nos produits</button>
          </Link>
        </div>
      </section>  
      <section className="Home_carrousel">
        <button
          className="Home_btnNext"
          onClick={nextProducts}
        >
        🡸
        </button>
        <div className="Home_productsList">
          {visibleProducts
            .map((product) => (
              <ProductCard
                key = {product.id} 
                addToCart = {addToCart} 
                removeFromCart = {removeFromCart}
                product = {product} 
              />
            ))    
          }
        </div>
        <button
          className="Home_btnPrevious"
          onClick={previousProducts}
        >
          🡺
        </button>      
      </section>  
    </div> 
  );
}
