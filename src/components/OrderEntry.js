//layout for each order entry component
import React from 'react';
import './OrderEntry.css';

const OrderEntry = ({ order, assignDriver, onCancel, onFinished }) => {
    return(
      <div className="order-entry">
      <div className="order-details">
        <h4>
        Order <b>#{order.orderID}</b> - Status: <b>{order.status}</b>
        </h4>
        <p>Phone Number: <b>{order.phoneNumber}</b></p>
        <p><b>{order.quantity}</b> Jerry Can(s)</p>
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

export default OrderEntry;
