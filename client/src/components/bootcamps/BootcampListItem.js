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
						<h5 className='card-title'>
							<Link to='/singleBootcamp'>Devworks Bootcamp</Link>
							<span
								className='cyan circle right white-text'
								style={{ padding: '0.75rem', marginLeft: '1rem' }}
							>
								8.8
							</span>
						</h5>
						<p className='blue-grey-text'>Boston, MA</p>
						<ul>
							<li>Web Development</li>
							<li>UI/UX</li>
							<li>Mobile Development</li>
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default BootcampListItem;
