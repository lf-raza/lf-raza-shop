import products from "../Data/products";
import productsCategory from "../Data/productsCategory";
import ProductCard from "../Components/ProductCard";
import ProductPage from "./ProductPage";
import '../styles/Boutique.css';

function Boutique({addToCart, removeFromCart}) {
  return (
    <div className="Boutique">
        <h1>Boutique</h1>
        {productsCategory
          .filter((product) => product.status === 1 )
          .map((product) => (
              <div key = {product.id} className="Boutique_category">
                <h2> Catégories : {product.name}</h2>

                <div className="Boutique_products">
                {products
                  .filter((products) => products.status === 1 && products.productsCategory === product.name )
                  .map((products) => (
                     <ProductCard
                        key = {products.id} 
                        addToCart = {addToCart} 
                        removeFromCart = {removeFromCart}
                        product = {products} 
                     />
                  ))
                }
                </div>

              </div>
          ))      
        }
    </div>
  );
}

export default Boutique;