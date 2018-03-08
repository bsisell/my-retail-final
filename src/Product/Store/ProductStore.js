import Reflux from 'reflux';

//Here is our Store
//The store defines our default view state, implements our actions

let ProductStore = function(application_obj) {
	
	let init_view_state = {

		waiting: true,

		window_mode: "desktop",

		purchase_quantity: 1, 

		image_index_range: 4, //This controls how many images are to be shown in the carousel selector
		image_slider_index_min: 0, //default min max indexes for the carousel
		image_slider_index_max: 3,
		selected_image_index: 0, //default selectd image
		
	};

	let init_data_state = {

		app_data: {},      

	};

	application_obj.applicationStore = Reflux.createStore({

		//Here we are initilizing our store 

		init: function() {

			this.app_state = {
				view_state: init_view_state,
				data_state: init_data_state
			};

			this.listenToMany(application_obj.applicationActions);

			this.setWindowMode();

			//This is a quick and easy way to change our state based on window resizes

			window.addEventListener("resize", application_obj.applicationActions.windowResize);
		},

		onLoadProductData: function(){

			//Get our JSON item data 

			let payload = require('../Data/item-data');

			this.app_state.data_state.app_data = payload.CatalogEntryView[0];

			this.app_state.view_state.waiting = false;

			this.trigger(this.app_state);

		},

		onIncrementPurchaseQuantity: function(){

			//Incrementing the purchase quantity

			//Limit the quantity to 100
			if(this.app_state.view_state.purchase_quantity >= 100){
				return;
			}

			this.app_state.view_state.purchase_quantity++;

			this.trigger(this.app_state);
		},

		onDecrementPurchaseQuantity: function(){

			//Decrementing the purchase quantity

			//Minimum quantity should be 1
			if(this.app_state.view_state.purchase_quantity <= 1){
				return;
			}

			this.app_state.view_state.purchase_quantity--;

			this.trigger(this.app_state);

		},

		onSelectProductImage: function(selected_image_index){

			//Here we are selecting a new image to be shown as the primary

			this.app_state.view_state.selected_image_index = selected_image_index;

			this.updateImageIndexRange(); //this will update the carousel slider indexes

			this.trigger(this.app_state);

		},

		onDecrementSelectedImage: function(){

			//Decrement the carousel slider images - min is 0

			if(this.app_state.view_state.selected_image_index === 0){
				return;
			}
			this.app_state.view_state.selected_image_index--;

			this.updateImageIndexRange(); //this will update the carousel slider indexes

			this.trigger(this.app_state);

		},

		onIncrementSelectedImage: function(){

			//Increment the carousel slider images - max is the number of images - 1

			if(this.app_state.view_state.selected_image_index === this.app_state.data_state.app_data.Images[0].imageCount - 1){
				return;
			}

			this.app_state.view_state.selected_image_index++;

			this.updateImageIndexRange(); //this will update the carousel slider indexes

			this.trigger(this.app_state);

		},

		updateImageIndexRange: function(){

			//Here we are going to adjust the carousel image slider indexes, based on the selected primary image

			//This function is a bit complicated because I wanted it to be able to handle changes to how many
			//images were to be shown in the carousel slider.

			let selected_image_index = this.app_state.view_state.selected_image_index;
			let selected_image_number = selected_image_index + 1;
			let range = this.app_state.view_state.image_index_range;
			let number_of_images = this.app_state.data_state.app_data.Images[0].imageCount;

			let range_incrementer = Math.floor(range / 2);
			let range_decrementer = Math.floor(range / 2);
			if (range %2 === 0){
				range_decrementer--;
			}
			
			let min;
			let max;
			
			if(selected_image_number >= number_of_images - range_incrementer){

 				max = number_of_images - 1;
 				min = number_of_images - range;

			} else if(selected_image_number > range_decrementer){

				min = selected_image_index - range_decrementer;
				max = selected_image_index + range_incrementer;

			} else {
				min = 0;
 				max = range - 1;
			}

			this.app_state.view_state.image_slider_index_min = min;
			this.app_state.view_state.image_slider_index_max = max;

			//we don't want to trigger an update since this is a private function called by other actions

		},

		windowResize: function(){

			//Window has been resized, call the setWindowMode function and trigger an update

			this.setWindowMode();

			window.requestAnimationFrame(() => {
				this.trigger(this.app_state);
			});

		},

		setWindowMode: function(){

			//Quick and easy way to set the window mode based on the window size

			let window_width = Math.max(
				document.documentElement.clientWidth,
				window.innerWidth || 0
			);

			if(application_obj.window_mode_breakpoint <= window_width){
				this.app_state.view_state.window_mode = 'desktop';
			} else {
				this.app_state.view_state.window_mode = 'mobile';
			}

		},

		
		getDefaultAppState: function() {
			
			//Provides the default state of our store
			
			return this.app_state;

		}

	});

}

export default ProductStore;
