import '../styles/ReviewPage.css';
import { useState } from "react";
import { useParams } from "react-router-dom";

function ReviewPage() {

  const {token} = useParams();

  const [formData, setFormData] = useState ({
    comment: "",
    rating: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev, [name] : value 
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault

    const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("review_token", token)
    .single();

    if (error || !review) {
        console.error("Token invalide");
        return;
    }


    try{
      const response = await fetch("http://localhost:4242/api/reviewRoute",{
        method: "post",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            comment: formData.comment,
            rating: formData.rating,
            token
        })
      })

      const data = await response.json();

      if (!response.ok) {
        console.log("Erreur serveur : ", data.message)
        return
      }

       console.log("avis envoyé :", data.message);

       setFormData({
        comment: "",
        rating: "",
       })
      
    } catch(error) {
      console.error("Erreur lors de l'envoi du formulaire au serveur :", error);
    }
  };
  

  return (
    <main className="ReviewPage">

      <h1>Laissez-nous votre avis</h1>

      <form onSubmit={handleSubmit}>
          <label htmlFor="rating">Note</label>
          <input 
            id="rating"
            type="number" 
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Votre note"
            required 
          />

          <label htmlFor="comment">Commentaire</label>
          <textarea 
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Votre Commentaire sur la commande"
          />

          <button type="submit" >Envoyer</button>
      </form>
    </main>
  );
}

export default ReviewPage;