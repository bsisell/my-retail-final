import React from 'react';
import Reflux from 'reflux';

import ProductControls from './Component/ProductControls'
import ProductImages from './Component/ProductImages'
import ProductHighlights from './Component/ProductHighlights'
import ProductReviews from './Component/ProductReviews'

import styled from 'styled-components';
//import { mediaQuery } from 'styled-media-queries'; I had to abondon the use of this module as it was causing build errors

import './CSS/product.css';

let createReactClass = require('create-react-class');


let ProductApp = function(application_obj){

	//Here I was using the mediaQuery feature from styled-media-queries to dynamically stlye some components
	//This module was causing all tests to fail and the build to fail, so I refactored this to simply use a static
	//styling. Boring I know. The thought counts right?

	// const media = {
	// 	desktop: mediaQuery`(min-width: ${(application_obj.window_mode_breakpoint - 1) / 16}em)`,
	// 	mobile: mediaQuery`(max-width: ${application_obj.window_mode_breakpoint / 16}em)`,
	// };

	// const ProductAppBody = styled.div`
	// 	${media.desktop`
	// 		padding: 30px
	// 	`}
	// 	${media.mobile`
	// 		padding: 15px
	// 	`}
	// `

	// const PrimaryComponentContainer = styled.div`
	// 	${media.desktop`
	// 		padding: 15px
	// 	`}
	// 	${media.mobile`
	// 		padding: 5px
	// 	`}
	//`

	const ProductAppBody = styled.div`
		padding: 30px;
	`

	const ProductAppSingleColumn = styled.div`
		
	`
	const ProductAppDoubleColumn = styled.div`
		width: 50%;
		float: left;
	`

	const PrimaryComponentContainer = styled.div`
		padding: 15px
	`


	//The primary Product App component
	//This componant is primarily responsible for the entire app's layout and the passing of state

	let ProductAppContainer = createReactClass({

		//Here we are setting up our store listener

		mixins: [
				Reflux.listenTo(application_obj.applicationStore, 'onStateChange')
				],

		getInitialState: function(){
			return  {
				app_state : application_obj.applicationStore.getDefaultAppState(),
			};
		},

		onStateChange: function(app_state) {
			this.setState({
				app_state: app_state
			});
		},

		componentDidMount: function(){

			//When our application mounts, go get our product data async

			application_obj.applicationActions.loadProductData();      

		},

		render: function() {

			if(this.state.app_state.view_state.waiting === true){
				return (<div></div>); //A loading message would normally handle this, quick and easy
			}

			let window_mode = this.state.app_state.view_state.window_mode;
			
			let product_components;

			//Set up our main app components, within a styled component

			let image_component = (
				<PrimaryComponentContainer>
					<ProductImages applicationActions={application_obj.applicationActions} app_state={this.state.app_state} />
				</PrimaryComponentContainer>
			);

			let controls_component = (
				<PrimaryComponentContainer>
					<ProductControls applicationActions={application_obj.applicationActions} app_state={this.state.app_state} />
				</PrimaryComponentContainer>
			);

			let highlights_component = (
				<PrimaryComponentContainer>
					<ProductHighlights applicationActions={application_obj.applicationActions} app_state={this.state.app_state} />
				</PrimaryComponentContainer>
			);

			let reviews_component = (
				<PrimaryComponentContainer>
					<ProductReviews applicationActions={application_obj.applicationActions} app_state={this.state.app_state} />
				</PrimaryComponentContainer>
			);

			//Here we want to change the layout based on the current window mode

			switch (window_mode) {

				case 'mobile':

					//Single Column for Mobile

					product_components = (
						<ProductAppBody>

							<ProductAppSingleColumn>
						
								{image_component}

								{controls_component}

								{highlights_component}

								{reviews_component}

							</ProductAppSingleColumn>

						</ProductAppBody>

					);

				break;

				default:

					//Double Column for Desktop

					product_components = (
						<ProductAppBody>

							<ProductAppDoubleColumn>
								
								{image_component}

								{reviews_component}

							</ProductAppDoubleColumn>

							<ProductAppDoubleColumn>
								
								{controls_component}

								{highlights_component}

							</ProductAppDoubleColumn>

						</ProductAppBody>
					);

				break;

			}	

			return (
				<div id="ProductApp">
		
				 	{product_components}
					
				</div>
			);
	
		}

	});

	return ProductAppContainer;

}


export default ProductApp;