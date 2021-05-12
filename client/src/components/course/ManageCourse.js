import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCourses, deleteCourse } from '../../actions/courseAction';

const ManageCourse = ({
	id,
	getCourses,
	deleteCourse,
	course: { loading, courses },
}) => {
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

	return (
		<div className='card '>
			<div className='card-content'>
				<h4 className='blue-grey-text center mt-0'>Courses</h4>
				<ul className='collection'>
					{courses.length === 0 ? (
						<li className='collection-item'>No Courses Added Yet...</li>
					) : (
						courses.map((course, index) => (
							<li className='collection-item' key={index}>
								{course.title}
								<div className='secondary-content'>
									<Link
										to={{
											pathname: '/manageBootcamp/courseForm',
											state: {
												operation: 'edit',
												course: course,
											},
										}}
										className='blue-grey-text'
									>
										<i className='fas fa-pen'></i>
									</Link>
									<a
										href='#d'
										className='red-text'
										style={{ marginLeft: '0.5rem' }}
										onClick={(e) => deleteCourse(course._id)}
									>
										<i className='fas fa-trash'></i>
									</a>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
			<div className='card-action'>
				<Link
					to={{
						pathname: '/manageBootcamp/courseForm',
						state: {
							operation: 'add',
							bootcampId: id,
						},
					}}
					className='btn light-blue'
				>
					<i className='fas fa-plus-circle'></i> Add New Course
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourses, deleteCourse })(
	ManageCourse,
);
