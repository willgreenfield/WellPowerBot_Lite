//layout for each order entry component
import React from 'react';
import './OrderEntry.css';

console.log("Creating OrderEntry");
//!!bug, OrderEntry never runs
const OrderEntry = ({ order, assignDriver, onCancel, onFinished }) => {
    return(
      <div className="order-entry">
      <div className="order-details">
        <h4>
        Order <b>#{order.orderNumber}</b> - Status: <b>{order.status}</b>
        </h4>
        <p>Phone Number: <b>{order.phone}</b></p>
        <p><b>{order.waterOrdered}</b> Jerry Can(s)</p>
        <p>Deliver to: <b>{order.location}</b></p>
      </div>
      <div className="order-options">
        <button onClick={() => assignDriver(order)}>Assign Driver</button>
        <button onClick={() => onFinished(order)}>Finish Order</button>
        <button className="button-clear" onClick={() => onCancel(order)}>
        Cancel Order
        </button>
      </div>
    </div>
  );
};

console.log("Exporting OrderEntry")
export default OrderEntry;
