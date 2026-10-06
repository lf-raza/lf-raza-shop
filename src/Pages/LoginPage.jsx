import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import {supabase} from "../lib/supabaseClient";


function LoginPage({user, profile, loadingUser, loadingProfile, checkUserIdentity}) {

  const navigate = useNavigate();
  const [formLoginData, setFormLoginData] = useState ({
      email: "",
      password: "",
  })
  const [loginError, setLoginError] = useState("");

  console.log("user :", user);
  console.log("profile :", profile);
  console.log("role :", profile?.role);

  if (loadingUser || loadingProfile) {
    return <p>Chargement...</p>;
  }

  if (user && profile?.role === "admin") {
    return <Navigate to="/AdminPage" replace />;
  }

  if (user && profile?.role === "client") {
    return <Navigate to="/MyAccount" replace />;
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormLoginData((prev) => ({
      ...prev, [name] : value 
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = formLoginData.email.trim().toLowerCase();
    const password = formLoginData.password;

    console.log("email envoyé", email);
    console.log("mdp rempli", password.length >0);
    

    const {data, error: signInError} = await supabase.auth.signInWithPassword ({
      email: email,
      password: password,
    })

    if (signInError) {
      setLoginError("Email ou mot de passe incorrect.");
      console.log("Erreur Supabase authentification user:", signInError);
      return;
    }


    console.log("User connecté :", data.user);
    console.log("ID user connecté :", data.user.id);

    const {data: profileData, error: profileError} = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single()

    if (profileError || !profileData) {
      setLoginError("Aucun profil n'est associé à ce compte.");
      console.log("Erreur Supabase récupération table profiles:", profileError)
      return;
    }

    await checkUserIdentity();

    if (profileData.role === "admin") {
      navigate("/AdminPage")
    } else {
      navigate("/MyAccount")
    }
   
  }

  return (
    <main className="LoginForm">

      <h1>Connectez-vous à votre compte</h1>

      <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="text" 
            name="email"
            value={formLoginData.email}
            onChange={handleChange}
            placeholder="Votre mail"
            required 
          />

          <label htmlFor="password">Mot de passe</label>
          <input 
            id="password"
            type="password"             
            name="password" 
            value={formLoginData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            required
          />

          {loginError && <p className="error-message">{loginError}</p>}

          <button type="submit" >Se connecter</button>

      </form>
    </main>
  );

}

export default LoginPage;