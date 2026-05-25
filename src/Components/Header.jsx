import { useState } from "react";
import '../styles/Header.css';
import Cart from "../Pages/Cart";
import { Link } from "react-router-dom";



function Header({addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cart}) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)

  return (
    <header className="Header">
      <div className="Header_top">
        <div
          className="Header_menu-deroulant"
          onMouseEnter={()=> setIsOpenMenu (true)}
          onMouseLeave={()=> setIsOpenMenu (false)}
        >
          <button 
            className="Header_btn-menu-deroulant"
            onClick={()=> setIsOpenMenu (!isOpenMenu)}
          >
            ☰
          </button>
          {isOpenMenu && (
            <nav>
              <ul className = "Header_menu-liste">              
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/Boutique">Boutique</Link>
                </li>
                <li>
                  <Link to="/AboutUs">A propos de nous</Link>
                </li>
                <li>
                  <Link to="/MyAccount">Mon compte</Link>
                </li>
                <li>
                  <Link to="/ContactForm">Contact</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <span>
          <Link to="/"
            className="Header_logo" 
          >
            {/*<img src={logo} alt="L&F RAZA Logo" className="Header_logo-img" />*/}
            logo
          </Link>
        </span>
        <Link to="/Cart">
          <button 
            className="Header_cart"
          >
            🛒
          </button>
        </Link>
        <span className="Header_cart-count">
          {totalItems}
        </span>
      </div>
      <div className="Header_bandeau-promo">
        Livraison offerte à partir de 30€ d'achat
      </div>
    </header>
  );
}

export default Header;