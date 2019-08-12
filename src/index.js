import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCpZNMprYY96jPRURVkk_SMvcNFMNtuZa8",
  authDomain: "wellpower-h2o.firebaseapp.com",
  databaseURL: "https://wellpower-h2o.firebaseio.com",
  storageBucket: "wellpower-h2o.appspot.com",
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
