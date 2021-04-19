import React from 'react';
import ManageBootcampDetail from './ManageBootcampDetail';
import ManageCourse from '../course/ManageCourse';

function ManageBootcamp() {
	return (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m7'>
						<ManageBootcampDetail />
					</div>
					<div className='col s12 m5'>
						<ManageCourse />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageBootcamp;
