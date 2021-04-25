import React from 'react';
import Course from '../course/Course';

function SingleBootcampDetails() {
	const arr = [1, 2, 3];
	return (
		<React.Fragment>
			<h3 className='center mt-0'>Devworks Bootcamp</h3>
			<p>
				Devworks is a full stack JavaScript Bootcamp located in the heart of
				Boston that focuses on the technologies you need to get a high
				paying job as a web developer
			</p>

			<div style={{ margin: '2rem 0' }}>
				{arr.map((element) => (
					<Course element={element} key={element} />
				))}
			</div>

			<p className='flow-text'>
				Average Cost:{' '}
				<span className='light-blue custom-badge'>$12000</span>
			</p>
		</React.Fragment>
	);
}

export default SingleBootcampDetails;
