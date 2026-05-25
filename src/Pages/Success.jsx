import { Link } from "react-router-dom";


export default function Success() {
    return(
        <div>
            <h1>Paiement réussi !</h1>
            <p>Merci pour votre commande. Votre paiement a bien été validé.</p>
            <p>Vous allez recevoir un email de confirmation prochainement.</p>

            <Link to="/">
                Retour à l'accueil
            </Link>
        </div>
    )
}