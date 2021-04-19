import React from 'react';
import { Link } from 'react-router-dom';

function ManageCourse() {
	return (
		<div className='card '>
			<div className='card-content'>
				<h4 className='blue-grey-text center' style={{ marginTop: '0' }}>
					Courses
				</h4>
				<ul className='collection'>
					<li
						className='collection-item'
						style={{
							fontSize: '1.5rem',
						}}
					>
						Alvin
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
				</ul>
			</div>
			<div className='card-action'>
				<Link to='/manageBootcamp/editCourse' className='btn cyan'>
					<i className='fas fa-plus-circle'></i> Add New Course
				</Link>
			</div>
		</div>
	);
}

export default ManageCourse;
