import React from 'react';

const Course = (props) => {
	return (
		<React.Fragment>
			<div className='card'>
				<div
					className='card-title blue-grey darken-3 white-text'
					style={{ padding: '0.75rem 1.5rem' }}
				>
					Full Stack web Development
				</div>
				<div className='card-content'>
					<p className='flow-text blue-grey-text'>Duration: 8 Week</p>
					<p>
						This course will provide you with all of the essentials to
						become a successful frontend web developer. You will learn to
						master HTML, CSS and front end JavaScript, along with tools
						like Git, VSCode and front end frameworks like Vue
					</p>
					<ul
						className='collection blue-grey-text'
						style={{ margin: '1rem 0' }}
					>
						<li className='collection-item'>Cost: $8,000 USD</li>
						<li className='collection-item'>Skill Required: Beginner</li>
						<li className='collection-item'>
							Scholarship Available:{' '}
							<i className='fas fa-check green-text'></i>
						</li>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Course;
