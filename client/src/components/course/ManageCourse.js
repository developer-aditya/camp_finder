import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCourses } from '../../actions/courseAction';

const ManageCourse = ({ id, getCourses, course: { loading, courses } }) => {
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
					{courses.map((course, index) => (
						<li className='collection-item' key={index}>
							{course.title}
							<div className='secondary-content'>
								<Link
									to='/manageBootcamp/editCourse'
									className='blue-grey-text'
								>
									<i className='fas fa-pen'></i>
								</Link>
								<a
									href='#d'
									className='red-text'
									style={{ marginLeft: '0.5rem' }}
								>
									<i className='fas fa-trash'></i>
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='card-action'>
				<Link to='/manageBootcamp/editCourse' className='btn light-blue'>
					<i className='fas fa-plus-circle'></i> Add New Course
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourses })(ManageCourse);
