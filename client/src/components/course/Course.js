import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getCourses } from '../../actions/courseAction';

const Course = ({ id, getCourses, course: { loading, courses } }) => {
	useEffect(() => {
		getCourses(id);
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
								Cost: $ {course.tuition} USD
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
					</div>
				</div>
			))
		);

	return jsx;
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourses })(Course);
