import '../styles/Footer.css';
import MemberForm from "../Components/MemberForm";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
        <div className="Footer_content">
            {/*
            <div className="Footer_MemberForm">
                <MemberForm />
            </div>
            */}
            <div className="Footer_informations">
                <h3>L&F RAZA</h3>
                <p>Vanille Bourbon de Madagascar et produits sélectionnés avec soin.</p>
            </div>
            <div className="Footer_informations">
                <h4>Informations</h4>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Livraison">Livraison</Link>
                        </li>
                        <li>
                            <Link to="/MentionsLegales">Mentions légales</Link>   
                        </li>
                        <li>
                            <Link to="/Privacy">Politique de confidentialité</Link>                       
                        </li>
                        <li>
                            <Link to="/CGV">Conditions générales de ventes</Link>                     
                        </li>
                        <li>
                            <Link to="/FAQ">FAQ</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="Footer_informations">
                <h4>Contact</h4>
                <p>Email : lnf.raza.vanille@gmail.com</p>
                <p>Téléphone : 06 10 27 43 93</p>
                <p>Instagram - Facebook</p>
            </div>
        </div>
        <div className="Footer_bottom">
            <p> © 2026 L&F RAZA - Tous droits réservés.</p>
        </div>
    </div>
  );
}

export default Footer;