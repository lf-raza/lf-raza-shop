import "../../styles/FAQ.css";

export default function FAQ() {
  return (
    <section className="faq-page">
      <div className="faq-container">
        <h1>FAQ</h1>

        <p className="faq-intro">
          Retrouvez ici les réponses aux questions les plus fréquentes concernant
          nos produits, la livraison, le paiement et les commandes.
        </p>

        <div className="faq-block">
          <h2>Produits</h2>

          <div className="faq-item">
            <h3>D’où vient votre vanille ?</h3>
            <p>
              Notre vanille est issue de Madagascar, reconnue pour la qualité de
              sa vanille Bourbon et ses arômes naturellement riches.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment conserver les gousses de vanille ?</h3>
            <p>
              Les gousses doivent être conservées à l’abri de la lumière, de la
              chaleur excessive et de l’air. Il est préférable de les garder dans
              leur emballage d’origine ou dans un contenant hermétique.
            </p>
          </div>

          <div className="faq-item">
            <h3>Est-il normal que les gousses soient souples et légèrement humides ?</h3>
            <p>
              Oui, une bonne gousse de vanille est généralement souple, charnue
              et légèrement grasse au toucher. Cela témoigne souvent d’un bon
              taux d’humidité et d’une bonne qualité aromatique.
            </p>
          </div>
        </div>

        <div className="faq-block">
          <h2>Commande</h2>

          <div className="faq-item">
            <h3>Comment passer commande ?</h3>
            <p>
              Il suffit d’ajouter les produits souhaités au panier, de vérifier
              votre commande, puis de cliquer sur le bouton de paiement.
            </p>
          </div>

          <div className="faq-item">
            <h3>Puis-je modifier ma commande après paiement ?</h3>
            <p>
              Si votre commande n’a pas encore été préparée ou expédiée, vous
              pouvez nous contacter rapidement par email afin de voir si une
              modification est possible.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment savoir si ma commande est confirmée ?</h3>
            <p>
              Après validation du paiement, vous serez redirigé vers une page de
              confirmation. Une confirmation pourra également vous être envoyée
              par email.
            </p>
          </div>
        </div>

        <div className="faq-block">
          <h2>Paiement</h2>

          <div className="faq-item">
            <h3>Quels moyens de paiement acceptez-vous ?</h3>
            <p>
              Le paiement s’effectue en ligne par carte bancaire via Stripe,
              notre prestataire de paiement sécurisé.
            </p>
          </div>

          <div className="faq-item">
            <h3>Mes informations bancaires sont-elles stockées sur votre site ?</h3>
            <p>
              Non. Les données bancaires sont traitées directement par Stripe.
              L&F RAZA ne stocke pas vos informations de carte bancaire.
            </p>
          </div>
        </div>

        <div className="faq-block">
          <h2>Livraison</h2>

          <div className="faq-item">
            <h3>Où livrez-vous ?</h3>
            <p>
              Les commandes sont expédiées en France métropolitaine. Pour toute
              autre destination, vous pouvez nous contacter avant de commander.
            </p>
          </div>

          <div className="faq-item">
            <h3>Quels sont les délais de livraison ?</h3>
            <p>
              Les commandes sont généralement préparées sous 1 à 3 jours ouvrés.
              Après expédition, la livraison intervient généralement sous 2 à 5
              jours ouvrés selon le transporteur.
            </p>
          </div>

          <div className="faq-item">
            <h3>Que faire si mon colis est abîmé ?</h3>
            <p>
              Contactez-nous rapidement par email avec votre numéro de commande
              et, si possible, des photos du colis et des produits concernés.
            </p>
          </div>
        </div>

        <div className="faq-block">
          <h2>Retours et remboursements</h2>

          <div className="faq-item">
            <h3>Puis-je retourner un produit ?</h3>
            <p>
              Le droit de rétractation peut s’appliquer selon les conditions
              prévues dans nos Conditions Générales de Vente. Certains produits
              alimentaires descellés peuvent être exclus du retour pour des
              raisons d’hygiène ou de sécurité alimentaire.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment demander un remboursement ?</h3>
            <p>
              Vous pouvez nous contacter par email en indiquant votre numéro de
              commande et le motif de votre demande. Nous vous répondrons dans
              les meilleurs délais.
            </p>
          </div>
        </div>

        <div className="faq-contact">
          <h2>Vous ne trouvez pas votre réponse ?</h2>
          <p>
            Contactez-nous par email, nous vous répondrons dès que possible.
          </p>
          <p>
            <strong>lnf.raza.vanille@gmail.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}