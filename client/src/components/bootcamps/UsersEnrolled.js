import React, { useEffect } from 'react';

import { getEnrolledUsers } from '../../actions/bootcampAction';
import { connect } from 'react-redux';

import M from 'materialize-css/dist/js/materialize.min';

const UsersEnrolled = ({
	getEnrolledUsers,
	users: { enrolledUsers, loading },
}) => {
	useEffect(() => {
		getEnrolledUsers().catch((err) => {
			M.toast({
				html: `${err.response.status}! ${
					err.response.data.error || 'Internal Server Error'
				}`,
			});
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 l1'></div>
					<div className='col s12 l9'>
						<ul
							className='collection with-header'
							style={{ borderRadius: '8px' }}
						>
							<li className='collection-header center white-text blue-grey darken-4'>
								<h4>Enrolled Users</h4>
							</li>
							{loading ? (
								<li
									className='collection-item'
									style={{ padding: '2rem 0' }}
								>
									<div
										className='progress'
										style={{
											margin: 'auto',
											width: '75%',
											backgroundColor: '#c0e7fa',
										}}
									>
										<div
											className='indeterminate'
											style={{ backgroundColor: '#1c9fe0' }}
										></div>
									</div>
								</li>
							) : enrolledUsers.length === 0 ? (
								<li
									className='collection-item center grey-text'
									style={{ padding: '2rem 0' }}
								>
									Oops! Enrolled Users Not Found...
								</li>
							) : (
								enrolledUsers.map((element, index) => (
									<li key={index} className='collection-item'>
										<div style={{ margin: '1rem 0' }}>
											<h5 style={{ marginBottom: '0rem' }}>
												{element.user.name}
												<span
													className='secondary-content'
													style={{ fontSize: '2.25rem' }}
												>
													<i className='fas fa-clipboard-check green-text'></i>
												</span>
											</h5>
											<p className='light-blue-text'>
												{element.user.email}
											</p>
										</div>
										<p className='grey-text'>
											Course Enrolled : {element.course.title}
											<br /> Enrolled On :{' '}
											{new Date(element.createdAt).toDateString()}
											<br />
											Razorpay Order Id : {element.orderId}
											<br />
											Razorpay Payment Id : {element.paymentId}
										</p>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	users: state.bootcamp,
});

export default connect(mapStateToProps, {
	getEnrolledUsers,
})(UsersEnrolled);
