import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import stripeRoute from "./Routes/stripeRoute.js";


dotenv.config();

const app = express();
const stripe = new Stripe(process.env(STRIPE_SECRET_KEY));

app.use(cors());

app.use("/api/stripe/webhook", webhookRoute);

app.use(application.json());

app.use("/api/stripe", stripeRoute);

app.listen(4242, () => {
     console.log("serveur stripe lancé sur http://localhost:4242");
});