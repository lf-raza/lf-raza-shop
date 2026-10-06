import express from "express";
import { sendReviewEmail } from "../utils/sendMail.js";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        try {
            
            const fiveDaysAgo = new Date();

            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

            const {data: orders, error} = await supabase
                .from("orders")
                .select("*")
                .eq("review_email_sent", false)
                .lte("delivered_at", fiveDaysAgo.toISOString())

            if (error) {
                console.error(error);

                return res.status(500).json({error: "Erreur lors de la récupération des commandes"})
            }

            //Envoi du mail review pour chaque commande trouvée
            for (const order of orders) {

                const { data: review, error: reviewError } = await supabase
                    .from("reviews")
                    .insert({
                    order_id: order.id,
                    })
                    .select("review_token")
                    .single();

                if (reviewError) {
                    console.error("Erreur création review :", reviewError);
                    continue;
                }

                await sendReviewEmail(order, review.review_token)  
                
                const { error: updateError } = await supabase
                    .from("orders")
                    .update({
                    review_email_sent: true,
                    review_email_sent_at: new Date().toISOString(),
                    })
                    .eq("id", order.id);

                if (updateError) {
                    console.error(
                    "Erreur mise à jour review_email_sent :",
                    updateError
                    );
                }
            }

            return res.status(200).json({message : "Mail avis client review envoyé au client"})
          

        } catch(error) {
            console.log("Erreur supabase", error)

            return res.status(500).json({message : "Erreur serveur"})          
        };

        
    }
);

export default router;