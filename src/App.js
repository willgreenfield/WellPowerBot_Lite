import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import OrderEntry from './components/OrderEntry';

class App extends Component {

  constructor() {
    super();
    this.state = { orders: [] };
  }

  componentDidMount() {
    const ordersRef = firebase.database().ref('/BotOrders');
    ordersRef.on('value', snap => {
      let orders = snap.val();
      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          phone: orders[order].phone,
          location: orders[order].location,
          price: orders[order].price,
          waterOrdered: orders[order].waterOrdered
        });
      }
      this.setState({ newState });
    });
  }

  // snapshotToArray(snap) {
  //   var returnArray = [];
  //   snapshot.forEach(function(childSnapshot) {
  //     var item =childSnapshot.val();
  //     item.key = childSnapshot.key;
  //     returnArr.push(item);
  //   });
  //   return returnArray;
  // };

  render() {
    return (
      <div className="App">
        <h1>WellPower Orders</h1>
        <div className="order-list">
          {this.state.orders.map(order => (
            <OrderEntry
              key={order.number}
              order={order}
              onCancel={this.cancelOrder}
              onFinished={this.finishOrder}
            />
        ))}
        </div>
      </div>
    );
  } //end of render()
} //end of class App() extends component
export default App;
