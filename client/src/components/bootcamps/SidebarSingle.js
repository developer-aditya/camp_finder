import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const SidebarSingle = ({ auth, current }) => {
	useEffect(() => {
		var elems = document.querySelectorAll('.materialboxed');
		M.Materialbox.init(elems, {});
	}, []);

	return (
		<React.Fragment>
			<img
				width='100%'
				src={`/uploads/${current.photo}`}
				className='materialboxed hoverable'
				alt='bootcamp-img'
				style={{
					border: '1px solid rgb(220, 220, 220)',
					marginBottom: '1.5rem',
				}}
			/>
			<div className='card blue-grey darken-3 white-text center-align'>
				<div className='card-content'>
					<p className='flow-text'>
						Average Rating
						<span className='light-blue right white-text valign-wrapper rating'>
							{current.averageRating === null
								? 'UR'
								: current.averageRating}
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
							Accepts Periodic Payments{' '}
							<span className='secondary-content'>
								{current.periodicPayment ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</span>
						</li>
					</ul>
				</div>
			</div>
			<div className='center hide-on-med-and-down'>
				<small className='grey-text'>
					Scan Below Code to View Location on Map
				</small>
			</div>
			<div className='center hide-on-med-and-down'>
				<img
					src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query=${current.address}`}
					alt='qrcode'
				/>
			</div>
			<div className='center' style={{ marginBottom: '2rem' }}>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${current.address}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					<i className='fas fa-map-marker-alt'></i> View Location on Map
				</a>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(SidebarSingle);
