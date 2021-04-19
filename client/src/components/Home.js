import React from 'react';

const Home = () => {
	return (
		<div className='showcase valign-wrapper'>
			<div className='showcase-inner center-align white-text'>
				<h2>Find a Coding Bootcamp</h2>
				<p className='flow-text' style={{ marginBottom: '1rem' }}>
					Find, rate and read reviews on coding bootcamps
				</p>
				<form>
					<div className='row'>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='distance'
									placeholder='Distance From'
									className='white-text'
								/>
							</div>
						</div>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='pincode'
									placeholder='Enter Pincode'
									className='white-text'
								/>
							</div>
						</div>
					</div>
					<button
						type='submit'
						className='btn waves-effect cyan submit-btn'
					>
						<i class='fas fa-search'></i> Find Bootcamps
					</button>
				</form>
			</div>
		</div>
	);
};

export default Home;
