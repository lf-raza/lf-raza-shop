import products from "../Data/products";
import { useParams } from "react-router-dom";

function ProductPage({addToCart}) {

    const {id} = useParams();
    console.log("id URL :", id);
    console.log("products", products);

    const product = products.find((product) => product.id === Number(id));

    if (!product) {
        return <p>Produit introuvable</p>;
    }

    return (
        <main className="product-page">
        <h1>{product.name}</h1>

        <img
            src={product.image}
            alt={product.name}
            className="product-page-img"
        />

        <p>{product.description}</p>
        <p>{product.price} €</p>

        <button onClick={() => addToCart(product)}>
            Ajouter au panier
        </button>
        </main>
    ) ;
}

export default ProductPage;