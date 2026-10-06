import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { sendOrderEmail, sendAdminOrderEmail } from "../utils/sendMail.js";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();
const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);

router.post(
    "/",
    async (req, res) => {
    
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent (
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch(error) {
            console.error("erreur webhook stripe :", error.message);
            return res.status(400).send(`Webhook Error : ${error.message}`);
        };

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
           

            try {
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
                    expand: ["data.price.product"],
                });

                const userId = session.metadata?.user_id ?? null;
                const promoCode = session.metadata?.promo_code || null;
                const discountAmount = Number(session.metadata?.discount_amount || 0);
                const deliveryMethod = session.metadata?.delivery_method || null;
                const deliveryPrice = Number(session.metadata?.delivery_price || 0);
                const subtotalAmount = Number(session.metadata?.subtotal_amount || 0);

                const {data : order, error : orderError} = await supabase
                    .from("orders")
                    .insert({
                        customer_email: session.customer_details.email,
                        customer_name: session.customer_details.name,
                        customer_phone: session.customer_details.phone,
                        total_amount: session.amount_total / 100,
                        status: session.payment_status,
                        stripe_session_id: session.id,
                        stripe_payment_id: session.payment_intent,
                        user_id: userId,
                        subtotal_amount: subtotalAmount,
                        discount_amount: discountAmount,
                        promo_code: promoCode,
                        delivery_method: deliveryMethod,
                        delivery_price: deliveryPrice,
                    })
                    .select()
                    .single()
                    
                if (orderError) {
                    console.log("Erreur Supabase order :", orderError)
                    return res.status(500).json({message : "Erreur lors de l'enregistrement dans la table orders"})
                }


                const orderItems = lineItems.data.map((item) => ({
                    order_id : order.id,
                    product_id : item.price.product.metadata.product_id,
                    quantity : item.quantity,
                    unit_price : item.price.unit_amount /100,
                    total_price : item.amount_total / 100, 
                }))

                const {error : orderItemsError} = await supabase
                    .from("order_items")
                    .insert(orderItems)
                                  
                if (orderItemsError) {
                    console.log("Erreur Supabase order items :", orderItemsError)
                    return res.status(500).json({message : "Erreur lors de l'enregistrement dans la table orderItems"})
                }



                for (const item of lineItems.data) {

                    const productId = Number(item.price.product.metadata.product_id);
                    const {data: product, error: selectError} = await supabase
                        .from("products")
                        .select("stock")
                        .eq("id", productId)
                        .single()

                    if (selectError) {
                        console.log("Erreur Supabase select products :", selectError)
                        return res.status(500).json({message : "Produit introuvable"})
                    }

                    const newStock = product.stock - item.quantity;

                    const {error: updateError} = await supabase
                        .from("products")
                        .update({
                            stock : newStock
                        })
                        .eq("id", productId)

                    if (updateError) {
                        console.log("Erreur Supabase update stock de products:", updateError)
                        return res.status(500).json({message : "Erreur lors de l'enregistrement dans la base de données"})
                    }
                }

                await sendOrderEmail(session);

                console.log("Email envoyé au client");

                await sendAdminOrderEmail(session);

                console.log("Email envoyé Admin");


            } catch (error) {
                console.log("erreur envoi depuis le serveur Webhook", error)
            }

                       
        }

        res.json({received : true })
    }
);

export default router;