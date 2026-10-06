

function OrderItemsCard({orderItems}) {
    return (
        <div className="OrderItemsCard">
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
        </div>
    )
}

export default OrderItemsCard;