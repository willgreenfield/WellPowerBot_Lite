import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import OrderEntry from './components/OrderEntry';

const NEW_ORDERS_DATABASE_REF = '/requestQueue';

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


      //Convert firebase object to array
      var count = 0;
      for (let order in ordersObj) {
        count++;
        ordersArr.push({
          key: count,
          phoneNumber: ordersObj[order].phoneNumber,
          location: ordersObj[order].location,
          latitude: ordersObj[order].latitude,
          longitude: ordersObj[order].longitude,
          price: ordersObj[order].price,
          waterOrdered: ordersObj[order].waterOrdered,
          status: ordersObj[order].orderStatus,
          orderedTime: ordersObj[order].orderedTime,
          accepted: ordersObj[order].accepted
        });
        //console.log(ordersArr);
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
    console.log('Finish button for order '+ this.order.phone);
  }

  cancelOrder(order) {
    console.log('Cancel button');
    var updates = {};
  //  updates['/requestQueue/' + ]
    return firebase.database().ref().update(updates);
  }

  render() {
    console.log("Rendering");
    return (
      <div role="main">
        <h1>WellPower Orders</h1>
        <div className="order-list">
          {this.state.ordersArr.map(entry => (
            <OrderEntry
              key={entry.key}
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
