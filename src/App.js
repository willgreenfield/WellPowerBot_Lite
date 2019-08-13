import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import OrderEntry from './components/OrderEntry';

const NEW_ORDERS_DATABASE_REF = '/customerRequests';

class App extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.finishOrder = this.finishOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
   //  this.orderService.on('updated', this.updateOrders);
    this.state = { orders: [] };
    console.log("Initial orders array initialized");
  }

  componentDidMount() {
    console.log("Running componentDidMount()");
    const ordersRef = firebase.database().ref(NEW_ORDERS_DATABASE_REF);
    ordersRef.on('value', snap => {
      let orders = snap.val();
      let newState = [];
      var count = 0; //number of orders in database

      //Convert firebase object to array
      for (let order in orders) {
        count++;
        newState.push({
          orderNumber: count,
          phone: orders[order].phone,
          location: orders[order].location,
          price: orders[order].price,
          waterOrdered: orders[order].waterOrdered,
          status: orders[order].orderStatus
        });

        console.log("order entry added to newState");
      }
      this.setState({ newState });
      console.log("New state set");
    });
  }

  updateOrders({ orders }) {
    this.setState({ orders});
  }

  assignDriver(order) {
    console.log('assign Driver button');
  }

  finishOrder(order) {
    console.log('Finish button');
  }

  cancelOrder(order) {
    console.log('Cancel button');
  }

  render() {
    console.log("Rendering");
    return (
      <div role="main">
        <h1>WellPower Orders</h1>
        <div className="order-list">
          {this.state.orders.map(entry => (
            <OrderEntry
              key={entry.number}
              order={entry}
              onCancel={this.cancelOrder}
              onFinished={this.finishOrder}
              assignDriver={this.assignDriver}

            />
        ))}
        </div>
      </div>
    );
  } //end of render()
} //end of class App() extends component

console.log("Exporting app");
export default App;
