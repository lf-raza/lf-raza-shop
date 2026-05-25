import express from "express";
import stripe from "stripe";

const router = express.Router();
stripe = new Stripe (process.env(STRIPE_SECRET_KEY));

router.post(
    "/",
    express.raw({type : "application/json"}),
    (req, res) => {
    
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent (
                sig,
                req.body,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch(error) {
            console.error("erreur webhook stripe :", error.message);
            return res.status(400).send(`Webhook Error : ${error.message}`);
        };

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log("paiement réussi :", session.id)
        }

        res.json({received : true })
    }
);

export default router;