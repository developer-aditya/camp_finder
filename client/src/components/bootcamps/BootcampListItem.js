import React from 'react';
import { Link } from 'react-router-dom';

const BootcampListItem = (props) => {
	return (
		<React.Fragment>
			<div className='card horizontal' style={{ marginBottom: '2rem' }}>
				<div className='card-image'>
					<img
						src='https://source.unsplash.com/user/erondu/1600x900'
						alt='camp-img'
					/>
				</div>
				<div className='card-stacked'>
					<div className='card-content'>
						<Link to='/singleBootcamp'>Devcamper Bootcamp</Link>
						<p>
							I am a very simple card. I am good at containing small bits
							of information.
						</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default BootcampListItem;
