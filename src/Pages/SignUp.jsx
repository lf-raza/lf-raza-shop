import { supabase } from '../lib/supabaseClient';
import '../styles/SignUp.css';
import { useState } from "react";

function SignUp() {

  const [formData, setFormData] = useState ({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    newsletterAccepted: false,
    termsAccepted: false,
  })

  const [errorSignUp, setErrorSignUp] = useState("")

  const handleChange = (e) => {
    const {name, value, checked, type} = e.target
    setFormData((prev) => ({
      ...prev, [name] : type === "checkbox" ? checked : value,
    }))
  }

 
  const handleSignUp = async (e) => {
    e.preventDefault
    
    if(!formData.firstname || !formData.lastname || !formData.email) {
      setErrorSignUp("Tous les champs avec un * doivent être rempls")
      return
    }

    const emailRegex = /^[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setErrorSignUp("le format de l'adresse email n'est pas valide")
    }

    if(!formData.termsAccepted) {
      setErrorSignUp("Les CGV sont obligatoires")
      return
    }

    if(formData.password !== formData.confirmPassword) {
      setErrorSignUp("Les mots de passes ne sont pas identiques")
      return
    }

    if(formData.password.length < 8) {
      setErrorSignUp("Le mot de passe doit comporter plus de 8 caractères")
      return
    }

    const {data: existingProfile, error: errorExistingProfile} = await supabase 
    .from("profiles")
    .select("email")
    .eq("email", formData.email)
    .maybeSingle();

  if (errorExistingProfile) {
    console.error("Erreur vérification email en doublon :", errorExistingProfile);
    setErrorSignUp("Une erreur est survenue. Veuillez réessayer")
    return;
  }

  if (existingProfile) {
     setErrorSignUp("Un compte existe déjà avec cette adresse email")
    return
  }


    try{

      //création de l'user dans supaBase
      const {data:signUp, error: signUpError} = await supabase.auth.signUp ({
        email: formData.email,
        password: formData.password,
      })
  
      if (signUpError) {
        console.log("Erreur Supabase authentification signUp:", signUpError);
        return;
      }

      //insertion du client dans la table profiles
      const {data:profile, error:profileError} = await supabase
        .from("profiles")
        .insert({
          user_id: signUp.user.id,
          email: formData.email,
          full_name: `${formData.firstname} ${formData.lastname}`,
          role: "client",
          newsletter_accepted: formData.newsletterAccepted,
          newsletter_accepted_at:
          formData.newsletterAccepted 
          ? new Date().toISOString()
          : NULL,
          terms_accepted: formData.termsAccepted,
          terms_accepted_at:
          formData.termsAccepted 
          ? new Date().toISOString()
          : NULL,
        })

      if (profileError) {
        console.log("Erreur Supabase insertion dans la table profiles:", profileError);
        return;
      }


      //Envoi mail de bienvenue au nouveau membre
      const response = await fetch("http://localhost:4242/api/signUpForm",{
        method: "post",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
      })

      const mailData = await response.json();

      if (!response.ok) {
        console.log("Erreur serveur : ", mailData.message)
        return
      }

      console.log("Message envoyé :", mailData.message);

     
    } catch(error) {
      console.error("Erreur lors de l'envoi du formulaire au serveur :", error);
    }
  };
  

  return (
    <main className="ContactForm">

      <h1>Créer mon compte</h1>

      <form onSubmit={handleSignUp}>
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

          <label htmlFor="password">Mot de passe</label>
          <input 
            id="password"
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            required
          />

          <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
          <input 
            id="confirmPassword"
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez votre mot de passe"
            required
          />

          <label htmlFor="birthdate">Date d'anniversaire</label>
          <input 
            id="birthdate"
            type="date" 
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            placeholder="DD/MM/AAAA"
          />

          <label>
            <input 
              type="checkbox" 
              name="newsletterAccepted"
              checked={formData.newsletterAccepted}
              onChange={handleChange}
            />
            J’accepte de recevoir les offres et nouveautés L&F RAZA.
          </label>

          <label>
            <input 
              type="checkbox" 
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            En cochant cette case, j'accepte les CGV du site L&F RAZA.
          </label>

          {errorSignUp && (
            <p className="SignUp_error">
              {errorSignUp}
            </p>
          )}

          
          <button type="submit" >Envoyer</button>
      </form>
    </main>
  );
}

export default SignUp;