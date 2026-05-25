import "../../styles/MentionsLegales.css";

export default function MentionsLegales() {
  return (
    <section className="mentions-page">
      <div className="mentions-container">
        <h1>Mentions légales</h1>

        <p className="mentions-intro">
          Conformément aux dispositions légales en vigueur, vous trouverez
          ci-dessous les informations relatives à l’éditeur du site L&F RAZA.
        </p>

        <div className="mentions-block">
          <h2>1. Éditeur du site</h2>

          <p>
            Le présent site est édité par :
          </p>

          <ul>
            <li><strong>L&F RAZA</strong></li>
            <li>Statut juridique : [micro-entreprise / entreprise individuelle / société]</li>
            <li>SIRET : [numéro SIRET]</li>
            <li>Siège social : [adresse complète]</li>
            <li>Email : lnf.raza.vanille@gmail.com</li>
            <li>Téléphone : [numéro de téléphone]</li>
          </ul>
        </div>

        <div className="mentions-block">
          <h2>2. Directeur de la publication</h2>

          <p>
            Le directeur de la publication est : [Nom et prénom du responsable].
          </p>
        </div>

        <div className="mentions-block">
          <h2>3. Hébergement du site</h2>

          <p>
            Le site est hébergé par :
          </p>

          <ul>
            <li>Hébergeur : [Vercel / Netlify / autre]</li>
            <li>Adresse : [adresse de l’hébergeur]</li>
            <li>Site internet : [site de l’hébergeur]</li>
          </ul>
        </div>

        <div className="mentions-block">
          <h2>4. Activité</h2>

          <p>
            L&F RAZA propose à la vente des produits alimentaires et/ou produits
            d’origine malgache, notamment de la vanille Bourbon de Madagascar.
          </p>
        </div>

        <div className="mentions-block">
          <h2>5. Propriété intellectuelle</h2>

          <p>
            L’ensemble du contenu présent sur le site L&F RAZA, notamment les
            textes, images, photographies, logos, éléments graphiques, structure
            et design, est protégé par le droit de la propriété intellectuelle.
          </p>

          <p>
            Toute reproduction, représentation, modification, publication ou
            adaptation, totale ou partielle, des éléments du site est interdite
            sans autorisation écrite préalable de L&F RAZA.
          </p>
        </div>

        <div className="mentions-block">
          <h2>6. Données personnelles</h2>

          <p>
            Les informations collectées via le site sont utilisées uniquement
            pour le traitement des commandes, la relation client, la livraison
            et, le cas échéant, l’envoi d’informations commerciales si le client
            y a consenti.
          </p>

          <p>
            Le client peut demander l’accès, la rectification ou la suppression
            de ses données personnelles en contactant :
            <strong> lnf.raza.vanille@gmail.com</strong>.
          </p>
        </div>

        <div className="mentions-block">
          <h2>7. Cookies</h2>

          <p>
            Le site peut utiliser des cookies nécessaires à son bon
            fonctionnement, notamment pour la gestion du panier et l’amélioration
            de l’expérience utilisateur.
          </p>

          <p>
            Si des cookies de mesure d’audience ou publicitaires sont utilisés,
            une information spécifique et un choix seront proposés à
            l’utilisateur.
          </p>
        </div>

        <div className="mentions-block">
          <h2>8. Responsabilité</h2>

          <p>
            L&F RAZA s’efforce d’assurer l’exactitude des informations diffusées
            sur le site. Toutefois, des erreurs ou omissions peuvent survenir.
          </p>

          <p>
            L&F RAZA ne pourra être tenue responsable d'une mauvaise utilisation
            du site, d'une interruption temporaire du service ou d’un dommage
            résultant de l’utilisation du site.
          </p>
        </div>

        <div className="mentions-block">
          <h2>9. Contact</h2>

          <p>
            Pour toute question concernant le site ou les présentes mentions
            légales, vous pouvez nous contacter à l’adresse suivante :
          </p>

          <p>
            <strong>lnf.raza.vanille@gmail.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}