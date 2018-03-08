import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//Import the Product Action, Store and App

import ProductAction from './Product/Action/ProductAction';
import ProductStore from './Product/Store/ProductStore';
import ProductApp from './Product/ProductApp';

//Initialize our application object

let application_object = {
	window_mode_breakpoint: 980 //Quick and easy - to be used to determine desktop vs mobile - in pixels
};

ProductAction(application_object); //Initialize the Actions
	
ProductStore(application_object); //Initialize the Store

const ProductAppComponent = ProductApp(application_object); //Create the App component

ReactDOM.render(<ProductAppComponent />, document.getElementById('root')); //Render the App

registerServiceWorker();
