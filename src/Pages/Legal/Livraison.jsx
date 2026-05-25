import "../../styles/Livraison.css";

export default function Livraison() {
  return (
    <section className="livraison-page">
      <div className="livraison-container">
        <h1>Livraison</h1>

        <p className="livraison-intro">
          Chez L&F RAZA, nous préparons vos commandes avec soin afin de préserver
          la qualité de nos produits jusqu’à leur réception.
        </p>

        <div className="livraison-block">
          <h2>Zones de livraison</h2>
          <p>
            Les commandes sont expédiées en France métropolitaine.
          </p>
          <p>
            Pour toute demande de livraison vers une autre zone, vous pouvez nous
            contacter avant de passer commande.
          </p>
        </div>

        <div className="livraison-block">
          <h2>Délais de préparation</h2>
          <p>
            Les commandes sont généralement préparées sous 1 à 3 jours ouvrés
            après validation du paiement.
          </p>
          <p>
            En période de forte activité, ce délai peut être légèrement rallongé.
          </p>
        </div>

        <div className="livraison-block">
          <h2>Délais de livraison</h2>
          <p>
            Après expédition, le délai de livraison dépend du transporteur choisi.
          </p>
          <p>
            À titre indicatif, la livraison intervient généralement sous 2 à 5
            jours ouvrés après expédition.
          </p>
        </div>

        <div className="livraison-block">
          <h2>Frais de livraison</h2>
          <p>
            Les frais de livraison sont indiqués dans le panier avant la validation
            définitive de la commande.
          </p>
          <p>
            La livraison est offerte à partir de 30 € d’achat.
          </p>
        </div>

        <div className="livraison-block">
          <h2>Adresse de livraison</h2>
          <p>
            Le client est responsable de l’exactitude des informations de livraison
            fournies lors de la commande.
          </p>
          <p>
            En cas d’erreur dans l’adresse indiquée, L&F RAZA ne pourra être tenue
            responsable d’un retard ou d’une impossibilité de livraison.
          </p>
        </div>

        <div className="livraison-block">
          <h2>Commande endommagée ou non reçue</h2>
          <p>
            Si votre commande arrive endommagée ou si vous constatez un problème
            de livraison, contactez-nous rapidement par email avec votre numéro de
            commande et, si possible, des photos du colis.
          </p>
          <p>
            Email : <strong>lnf.raza.vanille@gmail.com</strong>
          </p>
        </div>

        <div className="livraison-contact">
          <h2>Une question ?</h2>
          <p>
            Pour toute question concernant votre livraison, vous pouvez nous
            contacter à l’adresse suivante :
          </p>
          <p>
            <strong>lnf.raza.vanille@gmail.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}