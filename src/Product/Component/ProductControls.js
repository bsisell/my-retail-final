import React from 'react';

let createReactClass = require('create-react-class');

//Product Controls handles the primary actions that are taken by the user

let ProductControls = createReactClass({

	render() {

		//I don't have the necessary understanding of the offers data do anything but pop off whats available.

		let display_price = this.props.app_state.data_state.app_data.Offers[0].OfferPrice[0].formattedPriceValue;
		let display_price_qualifier = this.props.app_state.data_state.app_data.Offers[0].OfferPrice[0].priceQualifier;

		return (

			<div id="ProductControls">
				
				<div id="ProductControlsPriceContainer">	
					<span id="ProductControlsPrice">{display_price}</span>
					<span id="ProductControlsPriceQualifier">{display_price_qualifier}</span>
				</div>

				<ProductPromotionList applicationActions={this.props.applicationActions} app_state={this.props.app_state} />

				<ProductPurchaseQuantityControl applicationActions={this.props.applicationActions} app_state={this.props.app_state} />

				<ProductPurchaseControl applicationActions={this.props.applicationActions} app_state={this.props.app_state} />

				<div id="ProductControlsReturnsContainer">

					<div id="ProductControlsReturnsContainerLeft">
						returns
					</div>

					<div id="ProductControlsReturnsContainerRight">
						<div>
							This item must be returned within 30 days of the ship date. See return policy for details. 
						</div>
						<div>
							Prices, promotions, styles and availability may vary by store and online.
						</div>
					</div>

					<div className="clear_both"></div>
				</div>

				<div id="ProductControlsSecondaryActionContainer">

					<div className="product_controls_secondary_action_container">
						<button className="product_controls_secondary_action_button">ADD TO REGISTRY</button>
					</div>

					<div className="product_controls_secondary_action_container">
						<button className="product_controls_secondary_action_button">ADD TO LIST</button>
					</div>

					<div className="product_controls_secondary_action_container">
						<button className="product_controls_secondary_action_button">SHARE</button>
					</div>

				</div>


			</div>
		);
	}

});


let ProductPromotionList = createReactClass({

	render() {

		let promotion_arr = this.props.app_state.data_state.app_data.Promotions;

		let listItems = promotion_arr.map((item, i) =>
			<ProductPromotionListItem key={i} promotion_obj={item} />
		);

		return (

			<div id="ProductPromotions">
				
				{listItems}

			</div>
		);
	}

});


let ProductPromotionListItem = createReactClass({

	render() {

		let display_text = this.props.promotion_obj.Description[0].shortDescription;

		return (

			<div className="product_promotion_list_item">
				<i className="fa fa-tag"></i>
				<span className="product_promotion_list_item_text">{display_text}</span>
			</div>
		);
	}

});


let ProductPurchaseQuantityControl = createReactClass({

	render() {

		let purchase_quantity = this.props.app_state.view_state.purchase_quantity;

		return (

			<div id="ProductPurchaseQuantityControl">

				<div id="ProductPurchaseQuantityControlBody">

					<div id="ProductPurchaseQuantityControlBodyLeft">
						quantity:
					</div>

					<div id="ProductPurchaseQuantityControlBodyRight">

						<div onClick={this.props.applicationActions.decrementPurchaseQuantity}>
							<i className="fa fa-minus-circle product_purchase_control_icon"></i>
						</div>

						<div id="ProductPurchaseQuantityCurrent">{purchase_quantity}</div>
						
						<div onClick={this.props.applicationActions.incrementPurchaseQuantity}>
							<i className="fa fa-plus-circle product_purchase_control_icon"></i>
						</div>
					</div>

				</div>

			</div>
		);
	}

});



let ProductPurchaseControl = createReactClass({

	render() {

		let purchasing_channel_code = this.props.app_state.data_state.app_data.purchasingChannelCode * 1;

		//Show the add to cart button only if the item is available online, purchasingChannelCode equal 0 or 1.
		//Show the pick up in store only if the item is available instore, purchasingChannelCode equals 0 or 2.
		
		let add_cart_button;
		let pickup_button;		

		if(purchasing_channel_code === 0 || purchasing_channel_code === 1){
			add_cart_button = (
				<div className="product_control_button_container">
					<div id="ProductControlCartButton">
						<button className="product_control_button">ADD TO CART</button>
					</div>
				</div>
			);
		}

		if(purchasing_channel_code === 0 || purchasing_channel_code === 2){
			pickup_button = (
				<div className="product_control_button_container">
					<div id="ProductControlPickupButton">
						<button className="product_control_button">PICK UP IN STORE</button>
						<div id="ProductControlPickupButtonFinePrint">find in store</div>
					</div>
				</div>
			);
		}

		return (

			<div id="ProductPurchaseControl">

				{pickup_button}

				{add_cart_button}

				<div className="clear_both"></div>
				
			</div>
		);
	}

});




export default ProductControls;
