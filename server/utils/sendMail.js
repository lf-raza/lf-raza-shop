import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOrderEmail = async (session) => {
  await transporter.sendMail({
    from: `"L&F RAZA" <${process.env.MAIL_USER}>`,
    to: session.customer_details?.email,
    subject: "Confirmation de votre commande L&F RAZA",
    html: `
      <h1>Merci pour votre commande !</h1>
      <p>Votre paiement a bien été confirmé.</p>
      <p>Montant payé : ${session.amount_total / 100} ${session.currency.toUpperCase()}</p>
      <p>Référence Stripe : ${session.id}</p>
      <p>Nous préparons votre commande avec soin.</p>
    `,
  });
};

export const sendAdminOrderEmail = async (session) => {
  await transporter.sendMail({
    from: `"L&F RAZA" <${process.env.MAIL_USER}>`,
    to: "lnf.raza.vanille@gmail.com",
    subject: `"Nouvelle commande reçue : " ${session.id}`,
    html: `
      <h1>Nouvelle commande L&F RAZA</h1>

      <p>Une nouvelle commande vient d'être payée sur le site.</p>

      <h2>Informations Stripe</h2>
      <p><strong>Session Stripe :</strong> ${session.id}</p>
      <p><strong>Statut paiement :</strong> ${session.payment_status}</p>
      <p><strong>Montant payé :</strong> ${(session.amount_total / 100).toFixed(2)} €</p>
      <p><strong>Devise :</strong> ${session.currency?.toUpperCase()}</p>

      <h2>Client</h2>
      <p><strong>Email :</strong> ${session.customer_details?.email || "Non renseigné"}</p>
      <p><strong>Nom :</strong> ${session.customer_details?.name || "Non renseigné"}</p>

      <p>Connecte-toi à Stripe pour voir le détail complet de la commande.</p>
    `,
  });
};

export const contactFormEmail = async (session) => {
  await transporter.sendMail({
    from: `"L&F RAZA" <${process.env.MAIL_USER}>`,
    to: "lnf.raza.vanille@gmail.com",
    subject: `"Nouveau formulaire reçu`,
    html: `
      <h1>Nouveau formulaire de contact reçu</h1>  
    `,
  });
};

export const SignUpFormEmail = async (session) => {
  await transporter.sendMail({
    from: `"L&F RAZA" <${process.env.MAIL_USER}>`,
    to: "lnf.raza.vanille@gmail.com",
    subject: `"Bienvenue nouveau Membre L&F RAZA`,
    html: `
      <h1>
        Votre compte a bien été créé
        Bienvenue à vous nouveau membre L&F RAZA
      </h1> 
    `,
  });
};

export const sendReviewEmail = async (order) => {
  await transporter.sendMail({
    from: `"L&F RAZA" <${process.env.MAIL_USER}>`,
    to: order.email,
    subject: `"Laissez nous un avis sur votre commande`,
    html: `
      <h2>Merci pour votre commande !</h2>

      <p>Nous espérons que vous êtes satisfait de votre achat.</p>

      <p>
        <a href="https://ton-site.fr/review/${review.review_token}">
          Donner mon avis
        </a>
      </p>
    `,
  });
};