import '../styles/ContactForm.css';

function ContactForm() {
  return (
    <div className="ContactForm">
        <form>
            <label htmlFor="forname">Prénom</label>
            <input type="text" id="forname" name="forname" />

            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <button type="submit">Envoyer</button>
        </form>
    </div>
  );
}

export default ContactForm;