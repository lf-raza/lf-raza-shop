import { useParams } from "react-router-dom";
import '../styles/ProductPage.css';

function ProductPage({addToCart, products, loadingProducts}) {

    const {id} = useParams();

    const product = products.find((product) => product.id === Number(id));

    if (loadingProducts) {
    return <p>Chargement de la page produit...</p>
    }

    if (!product) {
        return <p>Produit introuvable</p>;
    }

    return (
        <main className="product-page">
            <section className="product-page_left">
                <h1>{product.name}</h1> 
                <img src={product.image_url} alt={product.name} className="product-page_img" />
            </section>

            <section className="product-page_right">
                <div className="product-page_right-row">
                    <h2>{product.price} €</h2> 
                    <span> - {product.quantityDescription}</span>
                </div>
                <h3>{product.description}</h3>
                <button onClick={() => addToCart(product)}>
                    Ajouter au panier
                </button>
            </section>      
        </main>
    ) ;
}

export default ProductPage;