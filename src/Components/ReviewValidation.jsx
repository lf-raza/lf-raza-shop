import '../styles/ReviewValidation.css';
import {supabase} from "../lib/supabaseClient";
import { useState } from "react";

function ReviewValidation() {

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [openOrderId, setOpenOrderId] = useState(null);

    const fetchReviews = async () => {
        try {
            const {data, error} = await supabase
                .from("reviews")
                .select(`
                    *,
                    orders (
                        customer_name,
                        id,
                        order_items (
                            id,
                            quantity,
                            unit_price,
                            products(
                                id,
                                name
                            )
                        )
                    )               
                `)
                .eq("status", "pending")

            if (error) {
            console.error(`Erreur Supabase reviews :`, error);
            return;
            }

            setReviews(data);

        } catch (error) { 
         console.error(`Erreur inattendue reviews :`, error);
        } finally {
          setLoadingReviews(false);
        }   
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    const openOrderItems = (orderId) => {
        setOpenOrderId((currentOrderId) => currentOrderId === orderId ?
        (
           null
        ) : orderId
        )
    }

    const updateReviewStatus = async (reviewId, newStatus) => {
        try {
            
          const updateData = {
            status: newStatus,
            updated_at: new Date().toISOString()
          };

          const { data, error: errorStatus } = await supabase
            .from("reviews")
            .update(updateData)
            .eq("id",reviewId)
            .select()
    
          if (errorStatus) {
            console.error(`Erreur Supabase orders_status :`, errorStatus);
            return;
          }


          setReviews((currentReviews) => currentReviews.map((review) => 
            review.id === reviewId ?
                {...review, ...updateData}
            :    review       
          )          
          )
    
        } catch (error) {
          console.error(`Erreur inattendue updateReview :`, error);
        }
    }

    if (loadingReviews) {
        return (
            <div>Chargement de la page en cours...</div>
        )
    }

    return (
        <div className="ReviewValidation">
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Commande/Produit</th>
                        <th>Note</th>
                        <th>Commentaire</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {reviews
                        .map((review) => (
                        <tr key = {review.id} className="reviews_list">
                            <td>{review.orders?.customer_name}</td>
                            <td>
                                <button 
                                    className="orderItems_open"
                                    onClick={()=> openOrderItems(review.orders?.id)}
                                >
                                    {openOrderId === review.orders?.id ? "-" : "+"}
                                </button>

                                {openOrderId === review.orders?.id && (
                                    <table className="orderItems">
                                        <thead>
                                            <tr>
                                                <th>Nom item</th>
                                                <th>quantité</th>
                                                <th>Prix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {review.orders?.order_items?.map((orderItem                                               
                                            ) => (
                                                <tr key = {orderItem.id} className="orderItemsUnit">
                                                    <td>{orderItem.products?.name}</td>
                                                    <td>{orderItem.quantity}</td>
                                                    <td>{orderItem.unit_price} €</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>{review.created_at}</td>
                            <td>{review.status}</td>
                            <td>
                                <select
                                    value={review.status}
                                    onChange={(e) => updateReviewStatus(review.id, e.target.value)}
                                >
                                    <option value="approved">Validé</option>
                                    <option value="rejected">Refuser</option>
                                </select>
                            </td>
                        </tr>
                        ))      
                    }
                </tbody>                
            </table>
        </div>
    )

}

export default ReviewValidation;