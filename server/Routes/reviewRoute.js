import express from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        try {
            const {token, comment, rating} = req.body

            if (!rating) {
                return res.status(400).json({message: "les champs obligatoires ne sont pas remplis"})
            }

            const {error} = await supabase
                .from("reviews")
                .update({
                    comment: comment,
                    rating: rating,
                    updated_at: new Date().toISOString(),
                })
                .eq("review_token", token)

            if (error) {
                console.log("Erreur Supabase :", error)
                return res.status(500).json({message : "Erreur lors de l'enregistrement dans la base de données"})
            }

            return res.status(200).json({message : "Avis enregistré dans la table reviews"})
           

        } catch(error) {
            console.log("Erreur envoi vers supabase", error)

            return res.status(500).json({message : "Erreur serveur"})          
        };

        
    }
);

export default router;