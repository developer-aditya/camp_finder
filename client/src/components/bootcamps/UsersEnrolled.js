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
					<div className='col s12 l2'></div>
					<div className='col s12 l8'>
						<ul className='collection with-header'>
							<li className='collection-header center'>
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
								<li className='collection-item center grey-text'>
									Oops! Enrolled Users Not Found...
								</li>
							) : (
								enrolledUsers.map((element, index) => (
									<li key={index} className='collection-item'>
										<span>
											<h5>{element.user.name}</h5>
										</span>
										<p className='grey-text'>
											<span className='secondary-content'>
												<i className='fas fa-clipboard-check fa-2x green-text'></i>
											</span>
											Course Enrolled : {element.course.title}
											<br /> Enrolled On :{' '}
											{new Date(element.createdAt).toDateString()}
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
