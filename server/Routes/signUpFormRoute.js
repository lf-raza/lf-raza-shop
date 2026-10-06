import express from "express";
import { signUpFormEmail } from "../utils/sendMail.js";


const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        try {
            const {firstname, lastname, email, phone, birthdate, termsAccepted} = req.body


            if (!firstname || !lastname || !email) {
                return res.status(400).json({message: "les champs obligatoires ne sont pas remplis"})
            }

            const emailRegex = /^[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({message: "le format de l'adresse email n'est pas valide"})
            }

            if (!termsAccepted) {
                return res.status(400).json({message: "les CGV sont obligatoires pour créer un compte"})
            }


            await signUpFormEmail({
                firstname,
                lastname,
                email,
                phone,
                birthdate,
            })

            return res.status(201).json({message : "Compte client créé et email envoyé"})
           

        } catch(error) {
            console.log("Erreur envoi vers supabase", error)

            return res.status(500).json({message : "Erreur serveur"})          
        };

        
    }
);

export default router;