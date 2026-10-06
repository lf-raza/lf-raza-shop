import { useState, useEffect } from "react";
import {supabase} from "../lib/supabaseClient";
import '../styles/AdminPage.css';
import ReviewValidation from "../Components/ReviewValidation"; 

function AdminPage() {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [orderItems, setOrderItems] = useState([]);
    const [loadingOrderItems, setLoadingOrderItems] = useState(true);

    const [openOrderId, setOpenOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("id", { ascending: true });
    
          if (error) {
            console.error(`Erreur Supabase Orders :`, error);
            return;
          }
    
          console.log(`orders Supabase :`, data);
          setOrders(data);
        } catch (error) {
          console.error(`Erreur inattendue orders :`, error);
        } finally {
          setLoadingOrders(false);
        }
    };

    const fetchOrderItems = async () => {
        try {
          const { data, error } = await supabase
            .from("order_items")
            .select(
                `*,
                products(
                    id,
                    name
                )`
            )
            .order("id", { ascending: true });
    
          if (error) {
            console.error(`Erreur Supabase orderItems :`, error);
            return;
          }
    
          setOrderItems(data);
        } catch (error) {
          console.error(`Erreur inattendue orderItems :`, error);
        } finally {
          setLoadingOrderItems(false);
        }
    };
    
    useEffect(() => {
    fetchOrders();
    fetchOrderItems();
    }, []);



    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            
          const updateData = {
            status: newStatus,
          };
          
          // Si la commande passe en "livré"
          if (newStatus === "delivered") {
            updateData.delivered_at = new Date().toISOString();
          }

          const { data, error: errorStatus } = await supabase
            .from("orders")
            .update(updateData)
            .eq("id",orderId)
            .select()
    
          if (errorStatus) {
            console.error(`Erreur Supabase orders_status :`, errorStatus);
            return;
          }


          setOrders((currentOrders) => currentOrders.map((order) => 
            order.id === orderId ?
                {...order, status: newStatus}
            :    order       
          )          
          )
    
        } catch (error) {
          console.error(`Erreur inattendue orders_status :`, error);
        }
    }

    const openOrderItems = (orderId) => {
        setOpenOrderId((currentOrderId) => currentOrderId === orderId ?
        (
           null
        ) : orderId
        )
    }

    const totalNewOrders = orders.filter((order) => order.status === "paid").length;
    const totalCurrentOrders = orders.filter((order) => !["paid", "delivered", "cancelled"].includes(order.status)).length;
    const totalOldOrders = orders.filter((order) => ["delivered", "cancelled"].includes(order.status)).length

    if (loadingOrders || loadingOrderItems) {
        return (
            <div>Chargement de la page en cours...</div>
        )
    }

    return(
        <div className="AdminPage">

            <h1>Nouvelles Commandes ({totalNewOrders})</h1>

            {totalNewOrders > 0 && (
                <div className="admin-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>créée le</th>
                                <th>user id</th>
                                <th>email</th>
                                <th>Nom</th>
                                <th>téléphone</th>
                                <th>Montant</th>
                                <th>statut</th>
                                <th>détails</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders
                                .filter((order) => order.status === "paid" )
                                .map((order) => (
                                <tr key = {order.id} className="orders">
                                    <td>{order.id}</td>
                                    <td>
                                        {new Date(order.created_at).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{order.user_id}</td>
                                    <td>{order.customer_email}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.customer_phone}</td>
                                    <td>{order.total_amount} €</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        >
                                            <option value="paid">Nouvelle Commande</option>
                                            <option value="processing">En préparation</option>
                                            <option value="shipped">Expédiée</option>
                                            <option value="delivered">Livrée</option>
                                            <option value="cancelled">Annulée</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="orderItems_open"
                                            onClick={()=> openOrderItems(order.id)}
                                        >
                                            {openOrderId === order.id ? "-" : "+"}
                                        </button>

                                        {openOrderId === order.id && (
                                            <table className="orderItems">
                                                <thead>
                                                    <tr>
                                                        <th>Nom item</th>
                                                        <th>quantité</th>
                                                        <th>Prix</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItems
                                                        .filter((item) => order.id === item.order_id )
                                                        .map((item) => (
                                                        <tr key = {item.id} className="orderItemsUnit">
                                                            <td>{item.products?.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unit_price} €</td>
                                                        </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        )}
                                    </td>
                                </tr>
                                ))      
                            }
                        </tbody>                
                    </table>
                </div>
            )}

            
            <h1>Commandes en cours ({totalCurrentOrders})</h1>

             {totalCurrentOrders > 0 && (
                <div className="admin-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>créée le</th>
                                <th>user id</th>
                                <th>email</th>
                                <th>Nom</th>
                                <th>téléphone</th>
                                <th>Montant</th>
                                <th>statut</th>
                                <th>détails</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders
                                .filter((order) => !["paid", "delivered", "cancelled"].includes(order.status) )
                                .map((order) => (
                                <tr key = {order.id} className="orders">
                                    <td>{order.id}</td>
                                    <td>
                                        {new Date(order.created_at).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{order.user_id}</td>
                                    <td>{order.customer_email}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.customer_phone}</td>
                                    <td>{order.total_amount} €</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        >
                                            <option value="paid">Nouvelle Commande</option>
                                            <option value="processing">En préparation</option>
                                            <option value="shipped">Expédiée</option>
                                            <option value="delivered">Livrée</option>
                                            <option value="cancelled">Annulée</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="orderItems_open"
                                            onClick={()=> openOrderItems(order.id)}
                                        >
                                            {openOrderId === order.id ? "-" : "+"}
                                        </button>

                                        {openOrderId === order.id && (
                                            <table className="orderItems">
                                                <thead>
                                                    <tr>
                                                        <th>Nom item</th>
                                                        <th>quantité</th>
                                                        <th>Prix</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItems
                                                        .filter((item) => order.id === item.order_id )
                                                        .map((item) => (
                                                        <tr key = {item.id} className="orderItemsUnit">
                                                            <td>{item.products?.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unit_price} €</td>
                                                        </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        )}
                                    </td>
                                </tr>
                                ))      
                            }
                        </tbody>                
                    </table>
                </div>
            )}

            
            <h1>Historique des commandes ({totalOldOrders})</h1>
             {totalOldOrders > 0 && (
                <div className="admin-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>créée le</th>
                                <th>user id</th>
                                <th>email</th>
                                <th>Nom</th>
                                <th>téléphone</th>
                                <th>Montant</th>
                                <th>statut</th>
                                <th>détails</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders
                                .filter((order) => ["delivered", "cancelled"].includes(order.status) )
                                .map((order) => (
                                <tr key = {order.id} className="orders">
                                    <td>{order.id}</td>
                                    <td>
                                        {new Date(order.created_at).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{order.user_id}</td>
                                    <td>{order.customer_email}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.customer_phone}</td>
                                    <td>{order.total_amount} €</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        >
                                            <option value="paid">Nouvelle Commande</option>
                                            <option value="processing">En préparation</option>
                                            <option value="shipped">Expédiée</option>
                                            <option value="delivered">Livrée</option>
                                            <option value="cancelled">Annulée</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="orderItems_open"
                                            onClick={()=> openOrderItems(order.id)}
                                        >
                                            {openOrderId === order.id ? "-" : "+"}
                                        </button>

                                        {openOrderId === order.id && (
                                            <table className="orderItems">
                                                <thead>
                                                    <tr>
                                                        <th>Nom item</th>
                                                        <th>quantité</th>
                                                        <th>Prix</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItems
                                                        .filter((item) => order.id === item.order_id )
                                                        .map((item) => (
                                                        <tr key = {item.id} className="orderItemsUnit">
                                                            <td>{item.products?.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unit_price} €</td>
                                                        </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        )}
                                    </td>
                                </tr>
                                ))      
                            }
                        </tbody>                
                    </table>
                </div>
            )}

            <section className="ReviewValidation">
                <ReviewValidation />
            </section>

            
        </div>
    )
}


export default AdminPage;