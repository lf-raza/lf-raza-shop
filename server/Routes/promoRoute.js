import express from "express";

const router = express.Router();

router.post("/check", async (req, res) => {
    try {
        const {codePromo, totalCartPrice,} = req.body;

        const result = await checkPromoCode({
            codePromo, 
            totalCartPrice: Number(totalCartPrice),
        })

        if (!result.isValid) {
            return res.status(400).json(result)
        }

        res.json(result);

    } catch (error) {
        console.error("erreur promo check", error);
        res.status(500).json({error : "Erreur serveur code promo"});
    }
});

export default router;

