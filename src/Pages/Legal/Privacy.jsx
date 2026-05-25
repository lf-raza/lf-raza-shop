import "../../styles/Privacy.css";

export default function Privacy() {
  return (
    <section className="privacy-page">
      <div className="privacy-container">
        <h1>Politique de confidentialité</h1>

        <p className="privacy-intro">
          La présente politique de confidentialité explique comment L&F RAZA
          collecte, utilise et protège les données personnelles des utilisateurs
          du site.
        </p>

        <div className="privacy-block">
          <h2>1. Responsable du traitement</h2>

          <p>
            Le responsable du traitement des données personnelles est :
          </p>

          <ul>
            <li><strong>L&F RAZA</strong></li>
            <li>Statut juridique : [micro-entreprise / entreprise individuelle / société]</li>
            <li>SIRET : [numéro SIRET]</li>
            <li>Adresse : [adresse complète]</li>
            <li>Email : lnf.raza.vanille@gmail.com</li>
          </ul>
        </div>

        <div className="privacy-block">
          <h2>2. Données collectées</h2>

          <p>
            Dans le cadre de l’utilisation du site, L&F RAZA peut collecter les
            données suivantes :
          </p>

          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison</li>
            <li>Numéro de téléphone</li>
            <li>Informations relatives aux commandes</li>
            <li>Données nécessaires au traitement du paiement</li>
            <li>Données de navigation nécessaires au fonctionnement du site</li>
          </ul>
        </div>

        <div className="privacy-block">
          <h2>3. Utilisation des données</h2>

          <p>
            Les données personnelles collectées sont utilisées pour :
          </p>

          <ul>
            <li>Traiter les commandes</li>
            <li>Assurer la livraison des produits</li>
            <li>Gérer la relation client</li>
            <li>Répondre aux demandes envoyées via le formulaire de contact</li>
            <li>Envoyer des informations commerciales si le client y a consenti</li>
            <li>Assurer la sécurité et le bon fonctionnement du site</li>
          </ul>
        </div>

        <div className="privacy-block">
          <h2>4. Paiement sécurisé</h2>

          <p>
            Les paiements effectués sur le site sont traités par le prestataire
            sécurisé <strong>Stripe</strong>.
          </p>

          <p>
            L&F RAZA ne stocke pas les données bancaires des clients. Les
            informations de paiement sont traitées directement par Stripe selon
            ses propres conditions de sécurité.
          </p>
        </div>

        <div className="privacy-block">
          <h2>5. Base légale du traitement</h2>

          <p>
            Les données sont traitées sur les bases suivantes :
          </p>

          <ul>
            <li>L’exécution du contrat, notamment pour traiter une commande</li>
            <li>Le consentement, notamment pour l’inscription à la newsletter</li>
            <li>L’intérêt légitime, notamment pour la sécurité du site</li>
            <li>Les obligations légales, notamment comptables et fiscales</li>
          </ul>
        </div>

        <div className="privacy-block">
          <h2>6. Conservation des données</h2>

          <p>
            Les données personnelles sont conservées uniquement pendant la durée
            nécessaire aux finalités pour lesquelles elles ont été collectées.
          </p>

          <p>
            Les données liées aux commandes peuvent être conservées pendant la
            durée nécessaire au respect des obligations légales, comptables et
            fiscales.
          </p>
        </div>

        <div className="privacy-block">
          <h2>7. Destinataires des données</h2>

          <p>
            Les données personnelles peuvent être transmises uniquement aux
            prestataires nécessaires au traitement de la commande, notamment :
          </p>

          <ul>
            <li>Prestataire de paiement</li>
            <li>Transporteur</li>
            <li>Prestataire d’hébergement du site</li>
            <li>Outils de gestion ou d’envoi d’emails si utilisés</li>
          </ul>

          <p>
            Les données personnelles ne sont pas revendues à des tiers.
          </p>
        </div>

        <div className="privacy-block">
          <h2>8. Droits des utilisateurs</h2>

          <p>
            Conformément à la réglementation applicable, l’utilisateur dispose
            notamment des droits suivants :
          </p>

          <ul>
            <li>Droit d’accès à ses données</li>
            <li>Droit de rectification</li>
            <li>Droit de suppression</li>
            <li>Droit d’opposition</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>

          <p>
            Pour exercer ces droits, l’utilisateur peut contacter L&F RAZA à
            l’adresse suivante :
            <strong> lnf.raza.vanille@gmail.com</strong>.
          </p>
        </div>

        <div className="privacy-block">
          <h2>9. Newsletter</h2>

          <p>
            Si l’utilisateur accepte de recevoir les nouveautés et offres de
            L&F RAZA, son adresse email pourra être utilisée pour l’envoi de
            communications commerciales.
          </p>

          <p>
            L’utilisateur peut se désinscrire à tout moment en contactant
            L&F RAZA ou via le lien de désinscription présent dans les emails,
            lorsqu’un tel système est mis en place.
          </p>
        </div>

        <div className="privacy-block">
          <h2>10. Cookies</h2>

          <p>
            Le site peut utiliser des cookies nécessaires à son bon
            fonctionnement, notamment pour la gestion du panier et l’amélioration
            de l’expérience utilisateur.
          </p>

          <p>
            Si des cookies de mesure d’audience, publicitaires ou non essentiels
            sont utilisés, l’utilisateur en sera informé et pourra exprimer son
            choix.
          </p>
        </div>

        <div className="privacy-block">
          <h2>11. Sécurité</h2>

          <p>
            L&F RAZA met en œuvre des mesures raisonnables pour protéger les
            données personnelles contre la perte, l’accès non autorisé, la
            divulgation ou la modification.
          </p>
        </div>

        <div className="privacy-block">
          <h2>12. Modification de la politique de confidentialité</h2>

          <p>
            L&F RAZA se réserve le droit de modifier la présente politique de
            confidentialité à tout moment afin de l’adapter aux évolutions du
            site, de son activité ou de la réglementation.
          </p>
        </div>

        <div className="privacy-block">
          <h2>13. Contact</h2>

          <p>
            Pour toute question concernant la présente politique de
            confidentialité ou l’utilisation des données personnelles, vous pouvez
            nous contacter à l’adresse suivante :
          </p>

          <p>
            <strong>lnf.raza.vanille@gmail.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}