//layout for each order entry component
import React from 'react';
import './OrderEntry.css';

const OrderEntry = ({key, order, onCancel, onFinished, assignDriver}) => {
    return(
    <div className="order-entry">
      <div className="order-details">
        <h4>
        Order <b>{order.key}</b>
        </h4>
        <p>Status: <b>{order.orderStatus}</b></p>
        <p>Water Ordered: <b>{order.waterOrdered}</b></p>
        <p>Deliver to: <b>{order.location}</b></p>
        <p>Latitude: <b>{order.latitude}</b></p>
        <p>Longitude: <b>{order.longitude}</b></p>
        <p>Phone Number: <b>{order.phoneNumber}</b></p>

      </div>

    </div>
  );
};

export default OrderEntry;

/*
<div className="order-options">
 <button onClick={() => assignDriver(order)}>Assign Driver</button>
 <button onClick={() => onFinished(order)}>Finish Order</button>
 <button className="button-clear" onClick={() => onCancel(order)}>
   Cancel Order
 </button>
</div>
*/
