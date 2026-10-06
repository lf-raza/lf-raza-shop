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
import AdminPage from "./Pages/AdminPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import ProtectedMyAccountRoute from "./Components/ProtectedMyAccountRoute";
import { useState } from "react";


function AppRoutes({ addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cart, setCart, products, loadingProducts, productCategory, loadingProductCategory, user, profile, setProfile, checkUserIdentity, loadingUser, loadingProfile, session }) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                <Home
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    products={products}
                    loadingProducts={loadingProducts}
                    productCategory={productCategory}
                    loadingProductCategory={loadingProductCategory}
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
                    products={products}
                    loadingProducts={loadingProducts}
                    productCategory={productCategory}
                    loadingProductCategory={loadingProductCategory}
                />
                }
            />
            <Route
                path="/Boutique/:id"
                element={
                <ProductPage
                    addToCart={addToCart}
                    products={products}
                    loadingProducts={loadingProducts}
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
                    products={products}
                    loadingProducts={loadingProducts}
                    session={session}
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
                    <ProtectedMyAccountRoute 
                        user={user} 
                        profile={profile}
                        loadingUser={loadingUser}
                        loadingProfile={loadingProfile}
                    >
                        <MyAccount 
                            user={user} 
                            profile={profile}
                            setProfile={setProfile}
                        />
                    </ProtectedMyAccountRoute>
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
                    setCart={setCart}
                    
                />
                }
            />
            <Route
                path="/AdminPage"
                element={
                    <ProtectedAdminRoute
                        user={user} 
                        profile={profile}
                        loadingUser={loadingUser}
                        loadingProfile={loadingProfile}
                    >
                        <AdminPage
                        
                        />
                    </ProtectedAdminRoute>             
                }
            /> 
            <Route
                path="/LoginPage"
                element={
                <LoginPage
                    user={user}
                    profile={profile}
                    checkUserIdentity={checkUserIdentity}
                    loadingUser={loadingUser}
                    loadingProfile={loadingProfile}                  
                />
                }
            />        
        </Routes>
    );
}

export default AppRoutes;