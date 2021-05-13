import React, { useEffect } from 'react';
import WriteReview from './WriteReview';

import { connect } from 'react-redux';
import {
	getReviewOfUser,
	deleteReview,
	setCurrentReview,
	clearCurrentReview,
} from '../../actions/reviewAction';

import NotFound from '../reponse/NotFound';

const ManageReview = ({
	getReviewOfUser,
	setCurrentReview,
	clearCurrentReview,
	review: { reviews, loading },
	deleteReview,
}) => {
	useEffect(() => {
		getReviewOfUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		return () => {
			clearCurrentReview();
		};
		// eslint-disable-next-line
	}, []);

	if (loading === true)
		return (
			<div
				className='progress'
				style={{
					position: 'absolute',
					top: '50%',
					left: '25%',
					width: '50%',
					backgroundColor: '#c0e7fa',
				}}
			>
				<div
					className='indeterminate'
					style={{ backgroundColor: '#1c9fe0' }}
				></div>
			</div>
		);

	if (reviews === null) {
		return (
			<NotFound
				heading='Oops! Unable to Get Your Reviews Try Again...'
				msg='Please Refresh The Page Or Click On Below Link'
				link='Manage Your Reviews'
				route='/manageReview'
			/>
		);
	}

	if (reviews.length === 0) {
		return (
			<NotFound
				heading='Oh No! You Have Not Reviewed Any Bootcamps Yet...'
				msg='You Have Not Reviewed Any Bootcamp.Go And Start Reviewing, Help Other Find Useful Bootcamp'
				link='Go To Bootcamp List'
				route='/bootcamps'
			/>
		);
	}

	return (
		<div className='grey lighten-4 page-layout'>
			<div className='row'>
				<div className='col s12 l4'>
					{reviews.map((review, index) => {
						let ratingColor =
							review.rating < 5 ? 'red-text' : 'green-text';
						return (
							<div className='card' key={index}>
								<p
									className='flow-text blue-grey darken-3 white-text'
									style={{ padding: '0.5rem 1.5rem' }}
								>
									{review.title}
								</p>
								<div className='card-content'>
									<div>
										<p className='flow-text blue-grey-text'>
											Rating:{' '}
											<span className={ratingColor}>
												{review.rating}
											</span>
											<span className='secondary-content'>
												<button
													className='btn-floating btn-large waves-effect light-blue darken-2'
													style={{
														marginRight: '0.25rem',
													}}
													onClick={(e) => setCurrentReview(review)}
												>
													<i className='fas fa-pen'></i>
												</button>
												<button
													className='btn-floating btn-large waves-effect red darken-3 '
													onClick={(e) => deleteReview(review._id)}
												>
													<i className='fas fa-trash-alt'></i>
												</button>
											</span>
										</p>
									</div>

									<blockquote style={{ marginBottom: '0' }}>
										Written On {review.bootcamp.name}
									</blockquote>
								</div>
							</div>
						);
					})}
				</div>

				<div className='col s12 l8'>
					<div className='container'>
						<WriteReview operation='edit' data={null} />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({ review: state.review });

export default connect(mapStateToProps, {
	getReviewOfUser,
	deleteReview,
	setCurrentReview,
	clearCurrentReview,
})(ManageReview);
