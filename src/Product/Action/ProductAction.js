import Reflux from 'reflux';

//Here are the Actions
//These are used by our app components, implemented by our store

let ProductAction = function(application_obj){

	application_obj.applicationActions = Reflux.createActions([

		"loadProductData",

		"incrementPurchaseQuantity",
		"decrementPurchaseQuantity",

		"selectProductImage",
		"decrementSelectedImage",
		"incrementSelectedImage",

		"windowResize"

	]);

}

export default ProductAction;