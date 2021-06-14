import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getEnrolledCourses } from '../../actions/courseAction';
import { setCurrentBootcamp } from '../../actions/bootcampAction';
import { connect } from 'react-redux';

const CourseEnrolled = ({
	setCurrentBootcamp,
	getEnrolledCourses,
	courses: { enrolledCourses, loading },
}) => {
	useEffect(() => {
		getEnrolledCourses();
		// eslint-disable-next-line
	}, []);

	const history = useHistory();

	const setCurrent = (id) => {
		setCurrentBootcamp(id);
		history.push('/singleBootcamp');
	};

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
								<h4>Enrolled Courses</h4>
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
							) : enrolledCourses.length === 0 ? (
								<li
									className='collection-item center grey-text'
									style={{ padding: '2rem 0' }}
								>
									Oops! Enrolled Courses Not Found...
								</li>
							) : (
								enrolledCourses.map((element, index) => (
									<li key={index} className='collection-item'>
										{/* eslint-disable-next-line */}
										<a
											href=''
											onClick={(e) => {
												e.preventDefault();
												setCurrent(element.bootcamp);
											}}
										>
											<h5>{element.course.title}</h5>
										</a>
										<p className='grey-text'>
											<span
												className='secondary-content'
												style={{ fontSize: '2.25rem' }}
											>
												<i className='fas fa-clipboard-check green-text'></i>
											</span>
											Tuition Fee : {element.course.tuition}
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
	courses: state.course,
});

export default connect(mapStateToProps, {
	getEnrolledCourses,
	setCurrentBootcamp,
})(CourseEnrolled);
