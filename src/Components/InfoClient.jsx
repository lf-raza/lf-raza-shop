import {useState, useEffect} from "react";
import { supabase } from "../lib/supabaseClient";

function InfoClient({profile, setProfile}) {

    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        birthdate: "",
        newsletterAccepted: false,
    })

    useEffect(()=> {
        if (profile) {
            setProfileForm({
                firstname: profile.firstname,
                lastname: profile.lastname,
                email: profile.email,
                phone: profile.phone,
                birthdate: profile.birthdate,
                newsletterAccepted: profile.newsletterAccepted,
            })
        }   
    },[profile])

    const handleChange = (e) => {
        const {name, value, checked, type} = e.target;
        setProfileForm((currentProfileForm) => ({
        ...currentProfileForm, [name] : type === "checkbox" ? checked : value,
        }))
    }

    

    const handleSaveChanges = async () => {
        try {
            const {data: updatedProfile, error:errorProfile} = await supabase
                .from("profiles")
                .update({
                    firstname: profileForm.firstname,
                    lastname: profileForm.lastname,
                    email: profileForm.email,
                    phone: profileForm.phone || "",
                    birthdate: profileForm.birthdate || null,
                    newsletter_accepted: profileForm.newsletterAccepted,
                })
                .eq("user_id", profile.user_id)
                .select()
                .single()

            if(errorProfile) {
                console.log("Erreur Envoi Supabase update de la table profiles:", errorProfile);
                return;
            }

            setProfile(updatedProfile);

            setProfileForm({
                firstname: updatedProfile.firstname || "",
                lastname: updatedProfile.lastname || "",
                email: updatedProfile.email || "",
                phone: updatedProfile.phone || "",
                birthdate: updatedProfile.birthdate || null,
                newsletterAccepted: updatedProfile.newsletter_accepted || false,
            });


            setIsEditing(false);

        } catch (error) {
            console.log("Erreur retour Supabase update de la table profiles:", error);
        }
    }


    return (

        <div className="InfoClient">

            {!isEditing && (    
                <button onClick={() => setIsEditing(true)}>Modifier les informations</button>             
            )}

            <h1>Informations client</h1>
      
            {!isEditing ? (
                <div className="InfoClient_affichage">
                    <p>
                        <strong>Prénom : </strong>
                        {profile?.firstname}
                    </p>

                    <p>
                        <strong>Nom : </strong>
                        {profile?.lastname}
                    </p>

                    <p>
                        <strong>Email : </strong>
                        {profile?.email}
                    </p>

                    <p>
                        <strong>Numéro de téléphone : </strong>
                        {profile?.phone}
                    </p>

                    <p>
                        <strong>Date de naissance : </strong>
                        {profile?.birthdate}
                    </p>

                    <p>
                        <strong>Newsletter : </strong>
                        {profile?.newsletterAccepted ? "Acceptée" : "refusée"}
                    </p>
                    
                </div>
            ) : (
                <div className="InfoClient_update">
                    <label htmlFor="firstname">Prénom</label>
                    <input 
                        id="firstname"
                        type="text" 
                        name="firstname"
                        value={profileForm.firstname}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        required 
                    />

                    <label htmlFor="lastname">Nom</label>
                    <input 
                        id="lastname"
                        type="text"             
                        name="lastname" 
                        value={profileForm.lastname}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email" 
                        type="email" 
                        name="email"
                        value={profileForm.email}
                        onChange={handleChange}
                        placeholder="Votre mail"
                        required
                    />

                    <label htmlFor="phone">Téléphone</label>
                    <input 
                        id="phone"
                        type="tel" 
                        name="phone" 
                        value={profileForm.phone}
                        onChange={handleChange}
                        placeholder="Votre numéro de téléphone"
                    />

                    <label htmlFor="birthdate">Date de naissance</label>
                    <input 
                        id="birthdate"
                        type="date" 
                        name="birthdate"
                        value={profileForm.birthdate}
                        onChange={handleChange}
                        placeholder="DD/MM/AAAA"
                    />

                    <label>
                        <input 
                        type="checkbox" 
                        name="newsletterAccepted"
                        checked={profileForm.newsletterAccepted}
                        onChange={handleChange}
                        />
                        J’accepte de recevoir les offres et nouveautés L&F RAZA.
                    </label>

                    <div className="saveButton">
                        <button onClick={handleSaveChanges}>Enregistrer les modifications</button>

                        <button onClick={()=> setIsEditing(false)}>Annuler les modifications</button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default InfoClient;