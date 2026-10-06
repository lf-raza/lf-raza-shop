import ProductCard from "../Components/ProductCard";
import '../styles/Boutique.css';



function Boutique({addToCart, removeFromCart, products, loadingProducts, productCategory, loadingProductCategory}) {

  if (loadingProducts || loadingProductCategory)  {
    return <p>Chargement des produits...</p>
  }

return (
  <div className="Boutique">
    <h1>Boutique</h1>

    {productCategory
      .filter((product) => product.status === 1)
      .map((product) => {
        const categoryProducts = products.filter(
          (products) =>
            products.status === 1 &&
            products.product_category_id === product.id
        );

        if (categoryProducts.length === 0) {
          return null;
        }

        return (
          <div key={product.id} className={`Boutique_category Boutique_category_${product.slug}`}>
            <div className="Boutique_category-line"></div>

            <h2>{product.name}</h2>

            <div className="Boutique_category-line"></div>

            <div className="Boutique_products">
              {categoryProducts.map((products) => (
                <ProductCard
                  key={products.id}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  product={products}
                />
              ))}
            </div>
          </div>
        );
      })}
  </div>
);
}

export default Boutique;