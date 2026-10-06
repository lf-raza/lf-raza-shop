import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

dotenv.config({ path: "./.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



router.post("/create-checkout-session", async (req, res) => {
    try {
        const {cart, deliveryMethod, promoCode} = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Panier vide ou invalide" });
        }

        for (const item of cart) {
            const {data : product, error : stockError} = await supabase
                .from("products")
                .select("stock, name")
                .eq("id", item.id)
                .single()

            if (stockError) {
                    console.log("Erreur Supabase :", stockError)
                    return res.status(500).json({message : "Erreur lors de l'appel à la table products depuis Supabase"})
                }


            if (item.quantity > product.stock) {
                console.log(`pas d'envoi possible vers stripe car stock insuffisant pour le produit suivant : {$product.name}`)
                return res.status(400).json({error : `stock insuffisant pour le produit suivant: {$product.name}`})
            }
        }

        const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        //promo
        let discountAmount = 0;
        let appliedPromoCode = "";

        if (promoCode) {
            const promoResult = await checkPromoCode({
                code : promoCode,
                cartTotal,
            });

            if (promoResult.isValid) {
                discountAmount = promoResult.discountAmount;
                appliedPromoCode = promoResult.promo.code
            }
        }

        let discounts = [];

        if (discountAmount > 0) {
            const coupon = await stripe.coupons.create({
                amount_off: Math.round(discountAmount * 100),
                currency: "eur",
                duration: "once",
                name: appliedPromoCode || "Code promo",
            });

            discounts = [{coupon: coupon.id}];
        }

        //Livraison avec lineItems.push()
        const {data: deliveryData, error: deliveryError} = await supabase 
            .from("delivery_methods")
            .select("*")
            .eq("code", deliveryMethod)
            .eq("is_active", true)
            .single();

        if (deliveryError || !deliveryData) {
            return res.status(400).json({message: "Mode de livraison invalide.",});
        }

        const deliveryPrice = Number(deliveryData.deliveryPrice);


        const lineItems = cart.map((item) => ({
            price_data: {
                currency : "eur",
                product_data : {
                    name : item.name,
                    metadata: {
                        product_id: item.id,
                    },
                },
                unit_amount : Math.round(item.price*100)
            },
            quantity : item.quantity
        }));

        //Ajout livraison
        lineItems.push({
            price_data: {
                currency : "eur",
                product_data : {
                    name : deliveryData.name || "Livraison",
                },
                unit_amount : Math.round(deliveryPrice * 100),
            },
            quantity : 1,
        });

        let userId = null;

        const authorizationHeader = req.headers.authorization;

        if(authorizationHeader?.startsWith("Bearer ")) {
            const token = authorizationHeader.replace("Bearer ","");
        
            const {data: {user}, error:userError} = await supabase.auth.getUser(token);

            
            if (userError || !user) {
                return res.status(401).json({error: "Votre session est expirée",});
            }

            userId = user.id;
        } 
        
        const metadata = {
            promo_code: appliedPromoCode || "",
            discount_amount: discountAmount.toString(),
            delivery_method: deliveryMethod || "",
            delivery_price: deliveryPrice.toString(),
            subtotal_amount: cartTotal.toString(),
        };

        if (userId) {
            metadata.user_id = userId;
        }

        const session = await stripe.checkout.sessions.create ({
            mode : "payment",
            line_items : lineItems,
            discounts: discounts,
            metadata: metadata,
            success_url : "http://localhost:5173/Success",
            cancel_url :  "http://localhost:5173/Cart",
        }); 

        res.json({ url : session.url});
       
    } catch(error) {
        console.error("erreur backend strip", error);
        res.status(500).json({error : "Erreur création session stripe"});
    };

});

export default router;