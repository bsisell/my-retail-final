import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ProductAction from './Product/Action/ProductAction';
import ProductStore from './Product/Store/ProductStore';
import ProductApp from './Product/ProductApp';

const div = document.createElement('div');

let ProductAppComponent;
let app_state;

// Initial Set Up Tests

let application_object = {
	window_mode_breakpoint: 980 //in pixels
};

it('creates product actions', () => {

	ProductAction(application_object);

});

it('creates product store', () => {

	ProductStore(application_object);

	app_state = application_object.applicationStore.app_state;

});

it('creates product app', () => {

	ProductAppComponent = ProductApp(application_object);

});


//Primary Render Test

it('renders product app crashing', () => {
  	
	ReactDOM.render(<ProductAppComponent />, div);

});


//Purchasing Channel Code - Product Action Options Tests

it('product add to cart button valid', () => {

  	let purchasing_channel_code = app_state.data_state.app_data.purchasingChannelCode * 1;
  	
	let cart_button = div.querySelector('#ProductControlCartButton');

	if(purchasing_channel_code === 0 || purchasing_channel_code === 1){
		expect(cart_button).toBeDefined();
	} else {
		expect(cart_button).toBeNull();
	}

});


it('product pickup button valid', () => {

  	let purchasing_channel_code = app_state.data_state.app_data.purchasingChannelCode * 1;
  	
	let cart_button = div.querySelector('#ProductControlPickupButton');

	if(purchasing_channel_code === 0 || purchasing_channel_code === 2){
		expect(cart_button).toBeDefined();
	} else {
		expect(cart_button).toBeNull();
	}

});






//Static Action Tests

it('action increment purchase quantity passes', () => {
	
	application_object.applicationActions.incrementPurchaseQuantity();

});

it('action decrement purchase quantity passes', () => {
	
	application_object.applicationActions.decrementPurchaseQuantity();

});

it('action window resize passes', () => {
	
	application_object.applicationActions.windowResize();

});

it('action decrement selected image passes', () => {
	
	application_object.applicationActions.decrementSelectedImage();

});

it('action increment selected image passes', () => {
	
	application_object.applicationActions.incrementSelectedImage();

});