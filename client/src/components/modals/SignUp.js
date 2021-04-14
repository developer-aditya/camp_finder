import React from 'react';

const SignIn = () => {
	return (
		<div id='signup-modal' className='modal' style={modalStyle}>
			<div
				className='modal-content center-align'
				style={{ padding: '2.5rem', paddingBottom: '1rem' }}
			>
				<i className=' fas fa-times modal-close' style={closeBtn}></i>
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
							className='btn waves-effect waves-light cyan modal-close'
							type='submit'
							name='action'
							style={signInBtn}
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
	height: '80%',
	color: '#555',
	maxHeight: '80%',
};
const closeBtn = {
	position: 'absolute',
	top: '0',
	right: '0',
	margin: '0.75rem',
};
const signInBtn = {
	width: '100%',
	textTransform: 'capitalize',
	fontSize: '1.5rem',
	height: '3rem',
	borderRadius: '5px',
	boxShadow: 'none',
	margin: 'auto',
};

export default SignIn;