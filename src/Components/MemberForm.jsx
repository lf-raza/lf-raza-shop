import '../styles/MemberForm.css';

function MemberForm() {
  return (
    <div className="MemberForm">
        <form>
            <div className="MemberForm_group">
                <label htmlFor="forname">Prénom</label>
                <input type="text" id="forname" name="forname" />
            </div>
            <div className="MemberForm_group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" />
            </div>
            <div className="MemberForm_group">
                <label htmlFor="birthdate">Date de naissance</label>
                <input type="date" id="birthdate" name="birthdate" />
            </div>
            <div className="MemberForm_group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
            </div>
            <div className="MemberForm_group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" />
                <p className="MemberForm_passwordTerms">
                    Les mots de passe doivent contenir au moins 8 caractères.
                </p>
            </div>
            <div className="MemberForm_newsletter">
                <label className="newsletter">
                    <input type="checkbox" name="newsletter" />
                    <span>Recevoir les nouveautés et offres de L&F RAZA, je peux me désinscrire à tout moment</span>
                </label>
            </div>
            <div className="MemberForm_submit">
                <p className="MemberForm_terms">
                    En créant un compte, j'accepte les conditions d'utilisations.
                </p>
                <button type="submit" className="MemberForm_submitBtn">
                    Créer un compte
                </button>
            </div>
        </form>
    </div>
  );
}

export default MemberForm;