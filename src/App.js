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
    this.state = { ordersArr: [] };
    console.log("Initial orders array initialized");
  }

  componentDidMount() {
    console.log("Running componentDidMount()");
    const ordersRef = firebase.database().ref(NEW_ORDERS_DATABASE_REF);
    ordersRef.on('value', snap => {
      let ordersObj = snap.val();
      console.log(ordersObj);
      let ordersArr = [];
      var count = 0; //number of orders in database

      //Convert firebase object to array
      for (let order in ordersObj) {
        count++;
        ordersArr.push({
          orderNumber: count,
          phone: ordersObj[order].phone,
          location: ordersObj[order].location,
          price: ordersObj[order].price,
          waterOrdered: ordersObj[order].waterOrdered,
          status: ordersObj[order].orderStatus
        });
        console.log(ordersArr);
        console.log("order entry added to newState");
      }
      this.setState({ ordersArr });
      console.log("New state set");
    });
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
          {this.state.ordersArr.map(entry => (
            <OrderEntry
              key={entry.orderNumber}
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
