import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import OrderEntry from './components/OrderEntry.js';

const NEW_ORDERS_DATABASE_REF = '/customerRequests';

class App extends Component {

  constructor() {
    super();
    this.state = { orders: [] };
    console.log("Initial orders array initialized");
  }

  assignDriver(order) {
    console.log('assign Driver');
  }

  finishOrder(order) {
    console.log('Finish');
  }

  cancelOrder(order) {
    console.log('Cancel');
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
          id: order,
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

  render() {
    console.log("Rendering");
    return (
      <div className="App">
        <h1>WellPower Orders</h1>
        <div className="order-list">
          {this.state.orders.map(order => (
            <OrderEntry
              key={this.order.id}
              order={this.order}
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
export default App;
