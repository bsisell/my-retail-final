import React from 'react';
import styled from 'styled-components';

let createReactClass = require('create-react-class');

//Testing out some styled components based on props

const ProductImageSmall = styled.div`
	display: inline-block;
	overflow: hidden;
	height: 100%;
	transition: width 500ms, margin 500ms;
	border-radius: 3px;
	margin: ${props => props.active ? '0 10px' : '0'};
	width: ${props => props.active ? '80px' : '0'};
	border: ${props => props.selected ? '1px solid #b1b1b1' : '1px solid transparent'};
`

//ProductImages handles the primary image and secondary image slider

let ProductImages = createReactClass({

	render() {

		let applicationActions = this.props.applicationActions;

		let selected_image_index = this.props.app_state.view_state.selected_image_index;
		let image_slider_index_min = this.props.app_state.view_state.image_slider_index_min;
		let image_slider_index_max = this.props.app_state.view_state.image_slider_index_max;

		let title = this.props.app_state.data_state.app_data.title;
		let primary_image = this.props.app_state.data_state.app_data.Images[0].PrimaryImage;
		let alternate_images = this.props.app_state.data_state.app_data.Images[0].AlternateImages;

		//Combine the primary and alternate images into one array

		let image_arr = primary_image.concat(alternate_images);

		//Loop through all images, determine if each is active or selected, builds an array of ProductImagesSmall components

		let small_image_arr = image_arr.map(function(image_obj, i){

			let image_index = i;
			let image_src = image_obj.image;
			let active = false;
			let selected = false;

			if(image_index >= image_slider_index_min && image_index <= image_slider_index_max){
				active = true;
			}

			if(image_index === selected_image_index){
				selected = true;
			}

			return <ProductImagesSmall 
				key={image_index}
				image_index={image_index}
				image_src={image_src}
				alt={image_src}
				applicationActions={applicationActions}
				active={active}
				selected={selected}
			/>
		
		});

		//Get the Primary selected image

		let selected_image;

		if(image_arr && image_arr[selected_image_index]){
			selected_image = image_arr[selected_image_index].image;
		}

		return (
			<div id="ProductImages">

				<div id="ProductImagesTitle">
					{title}
				</div>

				<div id="ProductImagesPrimaryImage">
					<img src={selected_image} alt={this.props.image}  />
				</div>

				<div id="ProductImagesViewLargerContainer">
					<div id="ProductImagesViewLargerControl">
						<i className="fa fa-search-plus view_larger_icon"></i> view larger
					</div>

				</div>

				<div id="ProductImagesSliderContainer">

					<div className="product_images_sider_side_control" onClick={this.props.applicationActions.decrementSelectedImage}>
						<i className="fa fa-chevron-left product_images_chevron"></i>
					</div>

					<div id="ProductImagesSlider">
						{small_image_arr}
					</div>

					<div className="product_images_sider_side_control" onClick={this.props.applicationActions.incrementSelectedImage}>
						<i className="fa fa-chevron-right product_images_chevron"></i>
					</div>

				</div>

			</div>
		);

	}
	
});


let ProductImagesSmall = createReactClass({

	handleImageSelection: function(){

		//Here we are selected an secondary image to be displayed as the primary

		//Call the correct action, passing in the INDEX of the image
		
		this.props.applicationActions.selectProductImage(this.props.image_index);

	},

	render() {

		return (
			<ProductImageSmall active={this.props.active} selected={this.props.selected}>
				<img className="product_images_alternate_image" src={this.props.image_src} alt={this.props.image} onClick={this.handleImageSelection} />
			</ProductImageSmall>
		);

	}
	
});

export default ProductImages;
