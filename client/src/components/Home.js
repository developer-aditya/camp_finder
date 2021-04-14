import React from 'react';
import image from '../public/image/background.jpg';

const Home = () => {
	console.log(image);
	return (
		<div style={showcase} className='valign-wrapper'>
			<div
				className='showcase-inner center-align white-text'
				style={showcaseInner}
			>
				<h2>Find a Coding Bootcamp</h2>
				<p className='flow-text'>
					Find, rate and read reviews on coding bootcamps
				</p>
				<form>
					<div className='row'>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='miles'
									placeholder='Miles From'
								/>
							</div>
						</div>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='zipcode'
									placeholder='Enter Zipcode'
								/>
							</div>
						</div>
					</div>
					<input
						type='submit'
						value='Find Bootcamps'
						className='btn cyan darken-2'
						style={submitBtn}
					/>
				</form>
			</div>
		</div>
	);
};
const showcase = {
	position: 'relative',
	width: '100%',
	minHeight: '91.5vh',
	background: `url('${image}') no-repeat center top/cover`,
};

const showcaseInner = {
	zIndex: '2',
	padding: '2rem',
	margin: 'auto',
	borderRadius: '5px',
	background: 'rgba(0, 0, 0, 0.4)',
};

const submitBtn = {
	width: '100%',
	textTransform: 'capitalize',
	fontSize: '1.5rem',
	height: '4rem',
	borderRadius: '5px',
};

export default Home;
