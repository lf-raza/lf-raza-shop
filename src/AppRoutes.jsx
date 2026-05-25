import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Boutique from "./Pages/Boutique";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import ContactForm from "./Pages/ContactForm";
import MyAccount from "./Pages/MyAccount";
import CGV from "./Pages/Legal/CGV";
import Livraison from "./Pages/Legal/Livraison";
import MentionsLegales from "./Pages/Legal/MentionsLegales";
import Privacy from "./Pages/Legal/Privacy";
import FAQ from "./Pages/Legal/FAQ";
import Success from "./Pages/Success";
import { useState } from "react";


function AppRoutes({addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cart}) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                <Home
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
                }
            />
            <Route
                path="/AboutUs"
                element={
                <AboutUs
                    
                />
                }
            />
            <Route
                path="/Boutique"
                element={
                <Boutique
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
                }
            />
            <Route
                path="/Boutique/:id"
                element={
                <ProductPage
                    addToCart={addToCart}
                />
                }
            />
            <Route
                path="/Cart"
                element={
                <Cart
                    addToCart={addToCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeFromCart={removeFromCart}
                    cart={cart}
                />
                }
            />
            <Route
                path="/ContactForm"
                element={
                <ContactForm
                    
                />
                }
            />
            <Route
                path="/MyAccount"
                element={
                <MyAccount
                    
                />
                }
            />  
            <Route
                path="/CGV"
                element={
                <CGV
                    
                />
                }
            />   
            <Route
                path="/Privacy"
                element={
                <Privacy
                    
                />
                }
            />   
            <Route
                path="/FAQ"
                element={
                <FAQ
                    
                />
                }
            />   
            <Route
                path="/Livraison"
                element={
                <Livraison
                    
                />
                }
            />   
            <Route
                path="/MentionsLegales"
                element={
                <MentionsLegales
                    
                />
                }
            /> 
            <Route
                path="/Success"
                element={
                <Success
                    
                />
                }
            />       
        </Routes>
    );
}

export default AppRoutes;