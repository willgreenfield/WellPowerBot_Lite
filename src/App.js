import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import OrderEntry from './components/OrderEntry';
import DriverEntry from './components/DriverEntry';

const NEW_ORDERS_DATABASE_REF = '/requestQueue';
const AVAILABLE_DRIVERS_REF = '/DriversAvailable';

class App extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.finishOrder = this.finishOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
   //  this.orderService.on('updated', this.updateOrders);
    this.state = { driversArr: [] , ordersArr: [] };
  }

  componentDidMount() {
    const ordersRef = firebase.database().ref(NEW_ORDERS_DATABASE_REF);
    const driversRef = firebase.database().ref(AVAILABLE_DRIVERS_REF);

    //event: update to available drivers database
    driversRef.on('value', snap => {
      let driversObj = snap.val();
      let driversArr = [];

      //convert drivers object to array
      for (let driver in driversObj){
        driversArr.push({
          ID: driversObj[driver].g
        });
      }
      this.setState({ driversArr });
    });

    //event: update to current orders database
    ordersRef.on('value', snap => {
      let ordersObj = snap.val();
      //console.log(ordersObj);
      let ordersArr = [];
      var count = 0;

      //Convert orders object to array
      for (let order in ordersObj) {
        count++;
        ordersArr.push({
          key: ordersObj[order].orderedTime,
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
      }
      this.setState({ ordersArr });
    });
  }

  assignDriver(order) {
    console.log('assign Driver button');
  }

  finishOrder(order) {
    console.log('Finish button for order ');
  }

  cancelOrder(order) {
    console.log('Cancel button');
    var updates = {};
    return firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div role="main">
        <h1>WellPower Order Console</h1>

        <div className="driver-list">
        <h3> Drivers Online:  </h3>
          {this.state.driversArr.map(entry => (
            <DriverEntry
              key={entry.key}
              driver={entry}
            />
          ))}
        </div>
        <h3> Orders:  </h3>
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

export default App;
