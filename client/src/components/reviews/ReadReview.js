import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getReviewOfBootcamp } from '../../actions/reviewAction';

import NotFound from '../reponse/NotFound';

const ReadReview = ({
	id,
	getReviewOfBootcamp,
	review: { loading, reviews },
}) => {
	useEffect(() => {
		getReviewOfBootcamp(id);
		// eslint-disable-next-line
	}, []);

	if (loading)
		return (
			<div className='progress' style={{ backgroundColor: '#c0e7fa' }}>
				<div
					className='indeterminate'
					style={{ backgroundColor: '#1c9fe0' }}
				></div>
			</div>
		);

	if (reviews === null) {
		return (
			<NotFound
				heading='Oops! Unable to Get Reviews of This Bootcamp Try Again...'
				msg='Go back To Bootcamp List And Select This Bootcamp Again'
				link='Go To Bootcamp List'
				route='/bootcamps'
			/>
		);
	}
	if (reviews.length === 0) {
		return (
			<NotFound
				heading='This Bootcamp Is Not Reviewed Yet...'
				msg='Please Wait For Someone To Review This Bootcamp.Go to Bootcamp List And Find Some Other Bootcamp'
				link='Go To Bootcamp List'
				route='/bootcamps'
			/>
		);
	}

	const jsx = reviews.map((review, index) => {
		let ratingColor = review.rating < 5 ? 'red-text' : 'green-text';
		return (
			<div className='card' key={index}>
				<p
					className='flow-text blue-grey darken-3 white-text'
					style={{ padding: '0.5rem 1.5rem' }}
				>
					{review.title}
				</p>
				<div className='card-content'>
					<p className='flow-text blue-grey-text'>
						Rating: <span className={ratingColor}>{review.rating}</span>
					</p>
					<p>{review.text}</p>
					<blockquote style={{ marginBottom: '0' }}>
						Written by {review.user.name}
					</blockquote>
				</div>
			</div>
		);
	});

	return jsx;
};

const mapStateToProps = (state) => ({ review: state.review });

export default connect(mapStateToProps, { getReviewOfBootcamp })(ReadReview);
