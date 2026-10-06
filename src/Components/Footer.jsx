import '../styles/Footer.css';
import MemberForm from "../Components/MemberForm";
import { Link } from "react-router-dom";
import logo_img from "../assets/logo/logo.png";

function Footer() {
  return (
    <div className="Footer">
        <div className="Footer_line"></div>
        <section className="Footer_top">
            <div className="Footer_top-left">
                <h1>Contact :</h1>
                <p>lnf.raza.vanille@gmail.com</p>
                <p>06 10 27 43 93</p>
            </div>
            <div className="Footer_top-right">
                <img src={logo_img} alt="L&F RAZA Logo" className="Footer_logo-img" />
            </div>
            
        </section>
        <section className="Footer_bottom">
            <div className="Footer_bottom-left"> 
                 © 2026 L&F RAZA - Tous droits réservés.
            </div>
            <nav className="Footer_bottom-right"> 
                <ul>
                    <li>
                        <Link to="/">Mentions légales</Link>
                    </li>
                    <li>
                        <Link to="/CGV">CGU/CGV</Link>
                    </li>
                    <li>
                        <Link to="/Privacy">Politique de confidentialité</Link>
                    </li>
                    <li>
                        <Link to="/Livraison">Livraison</Link>
                    </li>
                    <li>
                        <Link to="/">Cookies</Link>
                    </li>
                    <li>
                        <Link to="/FAQ">FAQ</Link>
                    </li>
                </ul>                
            </nav>          
        </section>
    </div>
  );
}

export default Footer;