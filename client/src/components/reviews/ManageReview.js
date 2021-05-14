import React, { useEffect, useState } from 'react';
import WriteReview from './WriteReview';

import { connect } from 'react-redux';
import {
	getUserReview,
	deleteReview,
	setCurrentReview,
	clearCurrentReview,
} from '../../actions/reviewAction';

import NotFound from '../reponse/NotFound';
import ServerError from '../reponse/ServerError';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const ManageReview = ({
	getUserReview,
	setCurrentReview,
	clearCurrentReview,
	review: { reviews, loading },
	deleteReview,
}) => {
	const [statusCode, setStatusCode] = useState(200);

	useEffect(() => {
		getUserReview()
			.then((res) => setStatusCode(200))
			.catch((error) => setStatusCode(error.response.status));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		return () => {
			clearCurrentReview();
		};
		// eslint-disable-next-line
	}, []);

	const deleteReviewFunc = (id) => {
		deleteReview(id)
			.then((res) => {
				M.toast({
					html: "You've Successfully Deleted Your Review ",
				});
			})
			.catch((error) => {
				M.toast({
					html: `${error.response.status} Error! ${
						error.response.data.error || 'Internal Server Error'
					}`,
				});
			});
	};

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

	if (statusCode === 500) {
		return <ServerError />;
	} else if (statusCode === 404 && reviews.length === 0) {
		return (
			<NotFound
				heading='Oh No! You Have Not Reviewed Any Bootcamps Yet...'
				msg='You Have Not Reviewed Any Bootcamp.Go And Start Reviewing, Help Other Find Useful Bootcamp'
				link='Go To Bootcamp List'
				route='/bootcamps'
			/>
		);
	} else {
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
														onClick={(e) =>
															setCurrentReview(review)
														}
													>
														<i className='fas fa-pen'></i>
													</button>
													<button
														className='btn-floating btn-large waves-effect red darken-3 '
														onClick={(e) =>
															deleteReviewFunc(review._id)
														}
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
	}
};

const mapStateToProps = (state) => ({ review: state.review });

export default connect(mapStateToProps, {
	getUserReview,
	deleteReview,
	setCurrentReview,
	clearCurrentReview,
})(ManageReview);
