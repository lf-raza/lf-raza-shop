import express from "express";
import stripe from "stripe";

const router = express.Router();
stripe = new Stripe (process.env(STRIPE_SECRET_KEY));

router.post("/create-checkout-session", async (req, res) => {
    try {
        const {cart} = req.body;

        const lineItems = cart.map((item) => ({
            price_data: {
                currency : "eur",
                product_data : {
                    name : item.name
                },
                unit_amount : Math.round(item.price*100)
            },
            quantity : item.quantity
        }));

        const session = await stripe.checkout.sessions.create ({
            mode : "payment",
            line_items : lineItems,
            success_url : "http://localhost:5173/Success",
            cancel_url :  "http://localhost:5173/Cart"
        }); 

        res.json({ url : session.url});
       
    } catch(error) {
        console.error("erreur backend strip", error);
        res.status(500).json({error : "Erreur création session stripe"});
    };

});

export default router;