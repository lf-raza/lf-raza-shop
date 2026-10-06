import { supabase } from "./supabaseClient.js";

export const checkPromoCode = async ({code, cartTotal}) => {

    if (!code) {
        return {
            isValid: false,
            discountAmount:  0,
            message: "Aucun code promo renseigné.",
        }
    }

    const cleanCode = code.trim().tuUpperCase();

    const {data : promo, error} = await supabase 
        .from("promo_codes")
        .select("*")
        .eq("code",cleanCode)
        .single();

    if (error || !promo) {
        return {
            isValid: false,
            discountAmount: 0,
            message: "Code promo invalide.",
        };
    }

    if (!promo.is_active) {
        return {
            isValid: false,
            discountAmount: 0,
            message: "Ce code promo n'est plus actif"
        }
    }

    const now = new Date();

    if (promo.starts_at && new Date(promo.starts_at) > now) {
        return {
            isValid: false,
            discountAmount: 0,
            message: "Ce code promo n'est pas encore actif"
        }
    }

    if (promo.ends_at && new Date(promo.ends_at) < now) {
        return {
            isValid: false,
            discountAmount: 0,
            message: "Ce code promo a expiré"
        }
    }

    if (promo.usage_limit && promo.used_count >= promo.usage_limit) {
        return {
            isValid : false,
            discountAmount: 0,
            message: "Ce code promo a atteint sa limite d'utilisation"
        }
    }

    if (promo.minimum_order_amount && cartTotal < Number(promo.minimum_order_amount)) {
        return {
            isValid: false,
            discountAmount: 0,
            message: `Ce code est valable à partir de ${promo.minimum_order_amount} €.`,
        };
    }

    let discountAmount = 0;

    if (promo.discount_type === "percentage") {
        discountAmount = cartTotal * (Number(promo.discount_value) / 100);
    }

    if (promo.discount_type === "fixed") {
        discountAmount = Number(promo.discount_value);
    }

    discountAmount = Math.min(discountAmount, cartTotal);

    return {
        isValid: true,
        promo,
        discountAmount,
        message: "Code promo appliqué.",
    };

};