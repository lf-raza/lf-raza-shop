import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Boutique from "./pages/Boutique";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ContactForm from "./pages/ContactForm";
import MyAccount from "./pages/MyAccount";
import CGV from "./pages/Legal/CGV";
import Livraison from "./pages/Legal/Livraison";
import MentionsLegales from "./pages/Legal/MentionsLegales";
import Privacy from "./Pages/Legal/Privacy";
import FAQ from "./pages/Legal/FAQ";
import Success from "./pages/Success";
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