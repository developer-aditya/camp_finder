import React from 'react';

const SignIn = () => {
	return (
		<div
			id='signin-modal'
			className='modal modal-fixed-footer'
			style={modalStyle}
		>
			<div
				className='modal-content center-align'
				style={{ padding: '2.5rem' }}
			>
				<i className=' fas fa-times modal-close' style={closeBtn}></i>
				<h3>Sign In</h3>
				<div style={{ paddingTop: '2rem' }}>
					<div className='input-field'>
						<i className='fas fa-paper-plane prefix'></i>
						<input
							id='email'
							type='text'
							className='validate'
							placeholder='Email'
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-key prefix'></i>
						<input
							id='password'
							type='tel'
							className='validate'
							placeholder='Password'
						/>
					</div>

					<div className='input-feild'>
						<button
							className='btn waves-effect waves-light cyan modal-close'
							type='submit'
							name='action'
							style={signInBtn}
						>
							Sign In
						</button>
					</div>
					<a
						href='#forgot-password'
						className='center cyan-text'
						style={{
							fontSize: '1.15rem',
						}}
					>
						Forgot Password?
					</a>
				</div>
			</div>
			<div className='modal-footer valign-wrapper'>
				<p style={{ margin: 'auto' }}>
					Don't have a account?{' '}
					<a
						href='#signup-modal'
						className='modal-trigger cyan-text modal-close'
					>
						Create One
					</a>
				</p>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '450px',
	color: '#555',
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
	height: '3.25rem',
	borderRadius: '5px',
	boxShadow: 'none',
	marginBottom: '2rem',
};

export default SignIn;
