import { useState, useEffect } from "react";
import {supabase} from "../lib/supabaseClient";
import InfoClient from "../Components/InfoClient";
import CurrentOrderClient from "../Components/CurrentOrderClient";
import HistoryOrderClient from "../Components/HistoryOrderClient";
import "../styles/MyAccount.css";

function MyAccount({user, profile, setProfile}) {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [isSelected, setIsSelected] = useState("currentOrder");


    const fetchOrders = async () => {
        try {
          const { data : ordersData, error: ordersError } = await supabase
            .from("orders")
            .select(`
                *,
                order_items (
                    *,
                    products(
                        id,
                        name
                    )
                )              
            `)
            .eq("user_id", user.id)
            .order("id", { ascending: true });
    
          if (ordersError) {
            console.error(`Erreur Supabase Orders :`, ordersError);
            return;
          }
    
          console.log(`orders Supabase :`, ordersData);
          setOrders(ordersData);


        } catch (error) {
          console.error(`Erreur inattendue orders :`, error);
        } finally {
          setLoadingOrders(false);
        }
    };

  
    
    useEffect(() => {
    fetchOrders();
    }, []);

    const currentOrders = orders.filter((order) => !["paid", "delivered", "cancelled"].includes(order.status) )

    const historyOrders = orders.filter((order) => ["delivered", "cancelled"].includes(order.status) )

    const orderItems = orders.flatMap((order)=> order.order_items);
    

    if (loadingOrders) {
        return (
            <div>Chargement de la page en cours...</div>
        )
    }

    return(
        <div className="MyAccount">

            <nav className="MyAccount_liste">
                <ul>                 
                    <li>
                        <button
                            className={`MyAccountButton ${isSelected === "currentOrder"? "active" : ""}`}
                            onClick={()=>setIsSelected("currentOrder")}                    
                        >
                            Commande(s) en cours
                        </button>
                    </li>
                    <li>
                        <button
                            className={`MyAccountButton ${isSelected === "infoClient"? "active" : ""}`}
                            onClick={()=>setIsSelected("infoClient")}   
                        >
                            Informations Client
                        </button>
                    </li>
                     <li>
                        <button
                            className={`MyAccountButton ${isSelected === "historyOrder"? "active" : ""}`}
                            onClick={()=>setIsSelected("historyOrder")}                        
                        >
                            Historique des commandes
                        </button>
                    </li>
                </ul>
            </nav>
        
            {isSelected === "currentOrder" && (
                <div>
                    <h1>Commande(s) en cours</h1>
                    <CurrentOrderClient
                        orders={currentOrders}
                        orderItems={orderItems}
                    />
                </div>
            )}

            {isSelected === "infoClient" && (
                <div>
                    <InfoClient
                        profile={profile}
                        setProfile={setProfile}
                    />
                </div>
            )}

            {isSelected === "historyOrder" && (
                <div>
                    <h1>Historique des commandes</h1>
                    <HistoryOrderClient
                        orders={historyOrders}
                        orderItems={orderItems}
                    />
                </div>
            )}

        </div>
    )
}


export default MyAccount;