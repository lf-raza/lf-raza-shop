import '../styles/Reviews.css';
import { useEffect, useState} from "react";
import {supabase} from "../lib/supabaseClient";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(()=> {
        const getReviews = async () => {
            const {data, error} = await supabase
                .from("reviews")
                .select("*")
                .eq("status", "approved");

            if (error) {
                console.error(error);
                return
            }
            setReviews(data);           
        }
        getReviews();       
    } ,[]);

    return (
        <section className="Reviews">
            <h2>Avis Clients</h2>

            <div className="list_reviews">
                {reviews.map((review) => (
                    <div key={review.id} className="review_item">
                        <p>{review.rating} ⭐</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Reviews;
