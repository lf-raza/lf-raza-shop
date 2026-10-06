import '../styles/ContactForm.css';
import { useState } from "react";

function ContactForm() {

  const [formData, setFormData] = useState ({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev, [name] : value 
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault
    console.log("Données Formulaire :", formData)

    try{
      const response = await fetch("http://localhost:4242/api/contactForm",{
        method: "post",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json();

      if (!response.ok) {
        console.log("Erreur serveur : ", data.message)
        return
      }

       console.log("Message envoyé :", data.message);

       setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
       })
      
    } catch(error) {
      console.error("Erreur lors de l'envoi du formulaire au serveur :", error);
    }
  };
  

  return (
    <main className="ContactForm">

      <h1>Contactez-nous</h1>

      <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Prénom</label>
          <input 
            id="firstname"
            type="text" 
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Votre prénom"
            required 
          />

          <label htmlFor="lastname">Nom</label>
          <input 
            id="lastname"
            type="text"             
            name="lastname" 
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre mail"
            required
          />

          <label htmlFor="phone">Téléphone</label>
          <input 
            id="phone"
            type="tel" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
          />

          <label htmlFor="message">Message</label>
          <input 
            id="message"
            type="text" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            required
          />

          <button type="submit" >Envoyer</button>
      </form>
    </main>
  );
}

export default ContactForm;