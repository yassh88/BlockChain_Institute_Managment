import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import MyDrizzleApp from './MyDrizzleApp';
import * as serviceWorker from './serviceWorker';
//import drizzle dependencies
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";

import { Provider } from "react-redux";
import store from "./store";


import SuperAdmin from './abis/SuperAdmin.json'
import Institute from './abis/Institute.json'

//define drizzle options. Include contracts here.
const options = { contracts: [SuperAdmin, Institute] };
//initialise drizzle store with options
const drizzleStore = generateStore(options);
//initialise drizzle object, passing options and store
const drizzle = new Drizzle(options, drizzleStore);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
  <Provider store={store}>
    <BrowserRouter>
      <MyDrizzleApp/>
    </BrowserRouter>
  </Provider>
  </DrizzleContext.Provider>
  ,rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();