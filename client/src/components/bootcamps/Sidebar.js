import React from 'react';

const Sidebar = () => {
	return (
		<React.Fragment>
			<div className='card'>
				<div className='card-content'>
					<h5 style={{ marginTop: '0' }}>By Location...</h5>
					<form>
						<div className='row'>
							<div className='col s6'>
								<div className='input-group'>
									<input
										type='text'
										name='distance'
										placeholder='Distance From'
									/>
								</div>
							</div>
							<div className='col s6'>
								<div className='input-group'>
									<input
										type='text'
										className='form-control'
										name='pincode'
										placeholder='Enter Pincode'
									/>
								</div>
							</div>
						</div>
						<button
							type='submit'
							className='btn waves-effect cyan darken-1'
							style={findBootcampBtn}
						>
							Find Bootcamps
						</button>
					</form>
				</div>
			</div>

			<div className='card'>
				<div className='card-content'>
					<h5 style={{ marginTop: '0' }}>Filter...</h5>
					<form>
						<div className='row'>
							<div className='col s12'>
								<div className='input-group'>
									<select
										name='rating'
										id='rating'
										defaultValue={'0'}
										className='browser-default'
									>
										<option value='0' disabled>
											Rating
										</option>
										<option value='1'>2</option>
										<option value='2'>1</option>
									</select>
								</div>
							</div>

							<div className='col s12'>
								<div className='input-group'>
									<select
										name='budget'
										id='budget'
										defaultValue={'0'}
										className='browser-default'
									>
										<option value='0' disabled>
											Budget
										</option>
										<option value='1'>2</option>
										<option value='2'>1</option>
									</select>
								</div>
							</div>
						</div>
						<button
							type='submit'
							className='btn waves-effect cyan darken-1'
							style={findBootcampBtn}
						>
							Find Bootcamps
						</button>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

const findBootcampBtn = {
	width: '100%',
	textTransform: 'capitalize',
	height: '3rem',
	borderRadius: '5px',
};

export default Sidebar;
