import ProductCard from "../Components/ProductCard";
import AboutUs from "./AboutUs";
import Reviews from "../Components/Reviews";
import '../styles/Home.css';
import { useState } from "react";
import { Link } from "react-router-dom";




export default function Home({ addToCart, removeFromCart, products, loadingProducts, productCategory, loadingProductCategory }) {
  const [startIndex, setStartIndex] = useState(0);


  const filterProducts = products.filter((product) => product.status === 1);
 
  const visibleProducts = 
  filterProducts.length>0 ? 
    [
      filterProducts[startIndex % filterProducts.length],
      filterProducts[(startIndex+1) % filterProducts.length],
      filterProducts[(startIndex+2) % filterProducts.length]
    ] : []


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

  const [startIndexHome, setStartIndexHome] = useState(0);


  const filterHome = productCategory.filter((item) => item.status === 1);
 
  const visibleHome = 
  filterHome.length > 0 ?
  [
    filterHome[startIndexHome % filterHome.length]
  ] : []

    const previousHome = () => {
    startIndexHome === 0 ? (
      setStartIndexHome(filterHome.length - 1)
    ) : (
      setStartIndexHome(startIndexHome - 1)
    )
  }

  const nextHome = () => {
    setStartIndexHome(startIndexHome + 1)
  }

  if (loadingProducts || loadingProductCategory) {
    return <p>Chargement de la page...</p>
  }
  

  return(
    <section> 

      {/*section carroussel en tête*/}
      <section className="Home">
        <div className="Home_carrousel">
          <button
            className="Home_btnPreviousHome"
            onClick={previousHome}
          >
            ←
          </button>
 
          <div className="Home_content-top">
            {visibleHome.map((item) => {
            const titleWords = item.description.split(" ");
              return (
                <h1
                  key={item.id}
                  className={`Home_title ${item.description_class || ""}`}
                >
                  <span>{titleWords[0]}</span>
                  <span>{titleWords.slice(1).join(" ")}</span>
                </h1>
              );
            })}
          </div>

          {visibleHome.map((item) => (
            <div
              key={item.id}
              className={`Home_image-wrapper Home_wrapper-${item.slug}`}
            >
              <img
                src={item.image_url}
                alt={item.description}
                className={`Home_image Home_image-${item.slug}`}
              />
            </div>
          ))}

          <button
            className="Home_btnNextHome"
            onClick={nextHome}
          >
            →
          </button>
        </div>
      </section>

      {/*section produits en boutique*/}
      <section className="Home_boutique">
        <div className="Home_boutiqueLine"></div>

        <h2 className="Home_boutiqueTitle">EN BOUTIQUE</h2>

        <div className="Home_boutiqueList">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`Home_boutiqueCard Home_boutiqueCard${index + 1}`}
            >
              <div className="Home_boutiqueImageShadow">
                <div className={`Home_boutiqueImageWrapper Home_shape${index + 1}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="Home_boutiqueImage"
                  />
                </div>
              </div>

              <div className="Home_boutiqueLabel">
                <span>{product.name}</span>
                <span className="Home_boutiqueArrow">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="Home_boutiqueLine Home_boutiqueLineBottom"></div>
      </section>

      
      
      {/*section produits en vedette*/}
      <section className="Home_carrousel_products">
        <h1>Les plus commandés</h1>
        <button
          className="Home_btnNext_products"
          onClick={nextProducts}
        >
        🡸
        </button>
        <div className="Home_productsList_products">
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
          className="Home_btnPrevious_products"
          onClick={previousProducts}
        >
          🡺
        </button>      
      </section>  

      {/*section qui sommes nous*/}
      <section className="Home_AboutUs">
        <AboutUs />
      </section>

      {/*section avis clients*/}
      <section>
        <Reviews />
      </section>

    </section> 
  );
}
