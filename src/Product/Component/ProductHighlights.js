import React from 'react';
import Parser from 'html-react-parser';

let createReactClass = require('create-react-class');


let ProductHighlights = createReactClass({

	render() {

		let item_description_features = this.props.app_state.data_state.app_data.ItemDescription[0].features

		let listItems = item_description_features.map((item, i) =>
			<li key={i}>{Parser(item)}</li>
		);


		return (
			<div id="ProductHighlights">
				<div id="ProductHighlightsTitle">
					product highlights
				</div>

				<ul id="ProductHighlightsList">
					{listItems}
				</ul>
			</div>
		);
	}
	
});

export default ProductHighlights;
