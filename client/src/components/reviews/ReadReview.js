import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getReviews } from '../../actions/reviewAction';

const ReadReview = ({ id, getReviews, review: { loading, reviews } }) => {
	useEffect(() => {
		getReviews(id);
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

	const jsx =
		reviews.length === 0 ? (
			<h5 style={{ marginTop: '2rem' }}>
				No Reviews On This Bootcamp Yet...
			</h5>
		) : (
			reviews.map((review, index) => (
				<div className='card' key={index}>
					<p
						className='flow-text blue-grey darken-3 white-text'
						style={{ padding: '0.5rem 1.5rem' }}
					>
						{review.title}
					</p>
					<div className='card-content'>
						<p className='flow-text blue-grey-text'>
							Rating: <span className='green-text'>{review.rating}</span>
						</p>
						<p>{review.text}</p>
						<blockquote style={{ marginBottom: '0' }}>
							Written by {review.user.name}
						</blockquote>
					</div>
				</div>
			))
		);

	return jsx;
};

const mapStateToProps = (state) => ({ review: state.review });

export default connect(mapStateToProps, { getReviews })(ReadReview);
