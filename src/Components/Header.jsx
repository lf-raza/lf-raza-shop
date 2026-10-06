import { useState } from "react";
import '../styles/Header.css';
import Cart from "../Pages/Cart";
import { Link, useNavigate } from "react-router-dom";
import logo_img from "../assets/logo/logo.png";
import cart_img from "../assets/cart.png";
import {supabase} from "../lib/supabaseClient";




function Header({addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cart, user, profile, setUser, setProfile, checkUserIdentity, session}) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erreur déconnexion :", error);
      return;
    }

    navigate("/", { replace: true });

    setSession(null)
    setUser(null);
    setProfile(null);    
  };

  return (
    <header className="Header">
      <div className="Header_top">
        <div>
          <Link to="/"
            className="Header_logo" 
          >
            <img src={logo_img} alt="L&F RAZA Logo" className="Header_logo-img" />
          </Link>
        </div>
        <nav className="Header_main-liste">
          <ul>                 
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/Boutique">Boutique</Link>
            </li>
            <li>
              <div
                className="Header_menu-deroulant"
                onMouseEnter={()=> setIsOpenMenu (true)}
                onMouseLeave={()=> setIsOpenMenu (false)}
              >
                <button 
                  className="Header_btn-menu-deroulant"
                  onClick={()=> setIsOpenMenu (!isOpenMenu)}
                >
                  Informations
                </button>
                {isOpenMenu && (
                  <nav>
                    <ul className = "Header_menu-liste">              
                      <li>
                        <Link to="/AboutUs">A propos de nous</Link>
                      </li>
                      <li>
                        <Link to="/ContactForm">Contact</Link>
                      </li>
                      <li>
                        <Link to="/FAQ">FAQ</Link>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </li>
            <li>
              <Link to="/LoginPage">Mon compte</Link>
            </li>
          </ul>
        </nav>

        {!user && (
          <Link to="/LoginPage" className="Header_no-user">Connexion</Link>
        )}

        {user && profile?.role === "admin" && (
          <div>
            <div className="Header_admin">Bienvenue le meilleur du monde</div>
            <button 
            className="Header_deconnexion"
            onClick ={handleLogout}
            >
              Se déconnecter
            </button>
          </div>
        )}


        {user && profile?.role === "client" && (
          <div>
            <div className="Header_client">Bienvenue {profile?.full_name || user.email}</div>
            <button 
            className="Header_deconnexion"
            onClick ={handleLogout}
            >
              Se déconnecter
            </button>
          </div>
        )}

        <Link to="/Cart" className="Header_cart">
          <img src={cart_img} alt="cart" className="Header_cart-img" />
          Mon panier
        </Link>
        <span className="Header_cart-count">
          {totalItems}
        </span>
      </div>
      {/*<div className="Header_bandeau-promo">
        Livraison offerte à partir de 30€ d'achat
      </div>*/}
    </header>
  );
}

export default Header;