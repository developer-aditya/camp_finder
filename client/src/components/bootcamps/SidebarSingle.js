import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const SidebarSingle = ({ auth, current }) => {
	return (
		<React.Fragment>
			<img
				width='100%'
				src={`/uploads/${current.photo}`}
				className='materialboxed'
				alt='bootcamp-img'
				style={{
					boxShadow:
						'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
				}}
			/>
			<div className='card blue-grey darken-3 white-text center-align'>
				<div className='card-content'>
					<p className='flow-text'>
						Average Rating
						<span className='light-blue right white-text valign-wrapper rating'>
							{current.averageRating}
						</span>
					</p>

					<div style={{ padding: '2rem 1rem' }}>
						<Link
							to='/singleBootcamp/readReview'
							className='btn waves-effect blue-grey lighten-1 white-text side-btn'
						>
							<i className='far fa-comments'></i> Read Reviews
						</Link>

						{auth.isAuthenticated && auth.user.role === 'user' && (
							<Link
								to='/singleBootcamp/writeReview'
								className='btn waves-effect blue-grey lighten-5 blue-grey-text modal-trigger side-btn'
							>
								<i className='fas fa-pen'></i> Write A Review
							</Link>
						)}

						<a
							href={current.website}
							target='_blank'
							rel='noreferrer noopener'
							className='btn waves-effect light-blue white-text  side-btn'
						>
							<i className='fas fa-globe'></i> Visit Website
						</a>
					</div>
				</div>
			</div>
			<div className='card '>
				<div className='card-content'>
					<ul className='collection with-header'>
						<li className='collection-header center blue-grey-text'>
							<p className='flow-text'>Features</p>
						</li>
						<li className='collection-item'>
							Housing{' '}
							<span className='secondary-content'>
								{current.housing ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</span>
						</li>
						<li className='collection-item'>
							Job Assistance{' '}
							<span className='secondary-content'>
								{current.jobAssistance ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</span>
						</li>
						<li className='collection-item'>
							Job Guarantee{' '}
							<span className='secondary-content'>
								{current.jobGuarantee ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</span>
						</li>
						<li className='collection-item'>
							Accepts GI Bill{' '}
							<span className='secondary-content'>
								{current.acceptGi ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(SidebarSingle);
