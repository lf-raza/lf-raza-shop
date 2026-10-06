import express from "express";
import dotenv from "dotenv";
import { contactFormEmail } from "../utils/sendMail.js";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        try {
            const {firstname, lastname, email, phone, message} = req.body

            if (!firstname || !lastname || !email || !message) {
                return res.status(400).json({message: "les champs obligatoires ne sont pas remplis"})
            }

            const {error} = await supabase
                .from("contact_form")
                .insert({
                    firstname,
                    lastname,
                    email,
                    phone,
                    message
                })

            if (error) {
                console.log("Erreur Supabase :", error)
                return res.status(500).json({message : "Erreur lors de l'enregistrement dans la base de données"})
            }

            await contactFormEmail({
                firstname,
                lastname,
                email,
                phone,
                message
            })

            return res.status(201).json({message : "Message enregistré dans supabase et email envoyé"})
           

        } catch(error) {
            console.log("Erreur envoi vers supabase", error)

            return res.status(500).json({message : "Erreur serveur"})          
        };

        
    }
);

export default router;