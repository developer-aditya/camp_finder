import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getCourses } from '../../actions/courseAction';
import { setOrder, confirmOrder } from '../../actions/paymentAction';

import M from 'materialize-css/dist/js/materialize.min';

const Course = ({
	id,
	getCourses,
	setOrder,
	confirmOrder,
	course: { loading, courses },
	auth,
	bootcamp,
}) => {
	useEffect(() => {
		getCourses(id);
		// eslint-disable-next-line
	}, []);

	const displayRazorPay = async (e, fees, course) => {
		e.preventDefault();
		setOrder({ fees, course })
			.then((order) => {
				let options = {
					key: 'rzp_test_PzjUHHTtxSkDUz', // Enter the Key ID generated from the Dashboard
					amount: order.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
					currency: order.currency,
					name: bootcamp.name,
					description: 'Course Enrollment',
					order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
					handler: (response) => {
						const {
							razorpay_payment_id,
							razorpay_order_id,
							razorpay_signature,
						} = response;
						confirmOrder({
							razorpay_payment_id,
							razorpay_order_id,
							razorpay_signature,
							course,
							bootcamp: bootcamp._id,
						})
							.then((confirmCheck) =>
								M.toast({
									html: `${confirmCheck.msg}`,
								}),
							)
							.catch((err) =>
								M.toast({
									html: `${err.response.status}! ${err.response.data.error}`,
								}),
							);
					},
					prefill: {
						name: auth.user.name,
						email: auth.user.email,
						contact: '',
					},
					theme: {
						color: '#263238',
					},
				};
				var rzp1 = new window.Razorpay(options);
				rzp1.open();
			})
			.catch((err) =>
				M.toast({
					html: `${err.response.status}! ${err.response.data.error}`,
				}),
			);
	};

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
		courses.length === 0 ? (
			<p>No Courses Available Yet...</p>
		) : (
			courses.map((course, index) => (
				<div className='card' key={index}>
					<div
						className='card-title blue-grey darken-3 white-text'
						style={{ padding: '0.75rem 1.5rem' }}
					>
						{course.title}
					</div>
					<div className='card-content'>
						<p className='flow-text blue-grey-text'>
							Duration: {course.weeks} Week
						</p>
						<p>{course.description}</p>
						<ul
							className='collection blue-grey-text'
							style={{ margin: '1rem 0' }}
						>
							<li className='collection-item'>
								Cost: <i className='fas fa-rupee-sign'></i>{' '}
								{course.tuition} INR
							</li>
							<li className='collection-item'>
								Skill Required: {course.minimumSkill}
							</li>
							<li className='collection-item'>
								Scholarship Available:{' '}
								{course.scholarshipsAvailable ? (
									<i className='fas fa-check green-text'></i>
								) : (
									<i className='fas fa-times red-text'></i>
								)}
							</li>
						</ul>
						{auth.isAuthenticated && auth.user.role === 'user' && (
							// eslint-disable-next-line
							<a
								target='_blank'
								rel='noreferrer noopener'
								onClick={(e) =>
									displayRazorPay(e, course.tuition, course._id)
								}
								className='btn waves-effect light-blue white-text'
							>
								Buy This Course
							</a>
						)}
					</div>
				</div>
			))
		);

	return jsx;
};

const mapStateToProps = (state) => ({
	course: state.course,
	auth: state.auth,
	bootcamp: state.bootcamp.currentBootcamp,
});

export default connect(mapStateToProps, { getCourses, setOrder, confirmOrder })(
	Course,
);
