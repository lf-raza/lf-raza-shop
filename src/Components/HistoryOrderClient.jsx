import OrderItemsCard from "./OrderItemsCard";
import { useState} from "react";

function HistoryOrderClient({orders, orderItems}) {

    const [openOrderId, setOpenOrderId] = useState(null);

    const openOrderItems = (orderId) => {
        setOpenOrderId((currentOrderId) => currentOrderId === orderId ?
        (
           null
        ) : orderId
        )
    }

    if (orders.length === 0) {
        return (
            <h1>Il n'y a pas d'historique de commandes</h1>
        )
    }

    return (
        <div className="HistoryOrderClient">
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
                                    <OrderItemsCard
                                        orderItems = {orderItems}
                                    />
                                )}
                            </td>
                        </tr>
                        ))      
                    }
                </tbody>                
            </table>
        </div>
    )
}

export default HistoryOrderClient;