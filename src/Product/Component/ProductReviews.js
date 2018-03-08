import React from 'react';

var dateFormat = require('dateformat');

let createReactClass = require('create-react-class');


let ProductReviews = createReactClass({

	render() {

		let review_data = this.props.app_state.data_state.app_data.CustomerReview[0];

		let pro_review_obj = review_data.Pro[0];
		let con_review_obj = review_data.Con[0];

		let number_of_reviews = review_data.totalReviews; //this would need to be commafied
		let overall_rating_integer = review_data.consolidatedOverallRating; //Im going to assume integers only for simplicity

		return (
			<div id="ProductReviews">
				
				<div id="ProductReviewsHeader">


					<div id="ProductReviewsHeaderLeft">

						<StarRatingVisual rating_integer={overall_rating_integer} /> 

						<span id="ProductReviewsHeaderLeftText">overall</span>


					</div>

					<div id="ProductReviewsHeaderRight">

						<div id="ProductReviewsViewAllControl">
							view all {number_of_reviews} reviews
						</div>

					</div>

				</div>

				<div id="ProductReviewsBody">

					<div id="ProductReviewsBodyHeader">

						<div className="product_reviews_body_header_column">
							<div className="product_reviews_body_header_column_inner_left">
								<div className="product_reviews_body_header_column_large">
									PRO
								</div>
								<div className="product_reviews_body_header_column_small">
									most helpful 4-5 star review
								</div>
							</div>

							

						</div>

						<div className="product_reviews_body_header_column">
							<div className="product_reviews_body_header_column_inner_right">
								<div className="product_reviews_body_header_column_large">
									CON
								</div>
								<div className="product_reviews_body_header_column_small">
									most helpful 1-2 star review
								</div>
							</div>
						</div>

					</div>
		
					<div>
						<div className="product_review_body_review_column">
							<div className="product_review_body_review_column_inner_left">
								<ReviewBlock review_obj={pro_review_obj} />
							</div>
						</div>


						<div className="product_review_body_review_column">
							<div className="product_review_body_review_column_inner_right">
								<ReviewBlock review_obj={con_review_obj} />
							</div>
						</div>

					</div>

					<div className="clear_both"></div>

				</div>

			</div>
		);
	}
	
});



let StarRatingVisual = createReactClass({

	render() {

		//this.props.rating_integer;

		let highlight_stars = this.props.rating_integer;

		var stars = [];

		for(let i = 0; i < 5; i++){

			let star_class;

			if(i < highlight_stars){

				star_class = 'product_review_highlight_star';

			} else {

				star_class = 'product_review_dark_star';

			}
			
			stars.push(<i key={i} className={"fa fa-star "+star_class}></i>);

		}

		return (
			<span className="star_rating_visual">
				{stars}
			</span>
		);
	}
	
});


let ReviewBlock = createReactClass({

	render() {

		let rating_integer = this.props.review_obj.overallRating;
		let title = this.props.review_obj.title;
		let review = this.props.review_obj.review;
		let screenName = this.props.review_obj.screenName;
		let datePosted = this.props.review_obj.datePosted;

		let date_posted_obj = new Date(datePosted);
		let pretty_date = dateFormat(date_posted_obj, "mmmm dd, yyyy");

		return (
			<div className="product_reviews_review_block">

				<StarRatingVisual rating_integer={rating_integer} />

				<div className="product_reviews_review_block_title">
					{title}
				</div>

				<div className="product_reviews_review_block_body">
					{review}

				</div>

				<div className="product_reviews_review_block_demo">
					{screenName} - {pretty_date}
				</div>
	
			</div>
		);
	}
	
});

export default ProductReviews;
