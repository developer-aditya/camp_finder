import React from 'react';
import Course from '../course/Course';

const SingleBootcampDetails = ({ current }) => {
	return (
		<React.Fragment>
			<h3 className='center mt-0'>{current.name}</h3>

			<p>{current.description}</p>

			<div style={{ margin: '2rem 0' }}>
				<Course id={current.id} />
			</div>

			<p className='flow-text'>
				Average Cost:{' '}
				<span className='light-blue custom-badge'>
					$ {current.averageCost}
				</span>
			</p>
		</React.Fragment>
	);
};

export default SingleBootcampDetails;
