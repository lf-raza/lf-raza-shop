import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import stripeRoute from "./Routes/stripeRoute.js";
import webhookRoute from "./Routes/webhookRoute.js";
import contactFormRoute from "./Routes/contactFormRoute.js";
import signUpFormRoute from "./Routes/signUpFormRoute.js";
import sendReviewRoute from "./Routes/sendReviewRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import promoRoute from "./Routes/promoRoute.js";



dotenv.config({ path: "./.env" });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());

app.use("/api/stripe/webhook", express.raw({ type: "application/json" }), webhookRoute);

app.use(express.json());

app.use("/api/stripe", stripeRoute);

app.use("/api/contactForm", contactFormRoute);

app.use("/api/signUpForm", signUpFormRoute);

app.use("/api/sendReview", sendReviewRoute);
app.use("/api/reviewRoute", reviewRoute);

app.use("/api/promo", promoRoute);

app.listen(4242, () => {
     console.log("serveur stripe lancé sur http://localhost:4242");
});