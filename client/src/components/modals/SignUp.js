import React from 'react';

const SignIn = () => {
	return (
		<div id='signup-modal' className='modal' style={modalStyle}>
			<div
				className='modal-content center-align'
				style={{ padding: '2rem 2.5rem 1rem 2.5rem' }}
			>
				<i className=' fas fa-times modal-close close-btn'></i>
				<h3>Create Account</h3>
				<p className='grey-text'>It's a free and fast process</p>
				<div>
					<div className='input-field'>
						<i className='fas fa-user prefix'></i>
						<input
							id='name'
							type='text'
							className='validate'
							placeholder='Name'
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-paper-plane prefix'></i>
						<input
							id='register_email'
							type='tel'
							className='validate'
							placeholder='Email'
						/>
					</div>

					<div className='input-field'>
						<i className='fas fa-key prefix'></i>
						<input
							id='register_password'
							type='tel'
							className='validate'
							placeholder='Password'
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-check-double prefix'></i>
						<input
							id='password_confirm'
							type='tel'
							className='validate'
							placeholder='Confirm Password'
						/>
					</div>

					<div className='input-field'>
						<select id='user_type' defaultValue={'0'}>
							<option value='0' disabled>
								Select User Type
							</option>
							<option value='defaultUser'>Default User</option>
							<option value='bootcampPublisher'>
								Bootcamp Publisher
							</option>
						</select>
						{/* <label>Materialize Select</label> */}
					</div>

					<div className='input-feild'>
						<button
							className='btn waves-effect cyan modal-close sign-btn'
							type='submit'
							name='action'
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<p className='center-align'>
					You must be affiliated with the bootcamp to add it to DevCamper
				</p>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '500px',
	minHeight: '83%',
	color: '#555',
};

export default SignIn;
