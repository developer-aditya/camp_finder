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
				style={{ padding: '2rem 2.5rem 1rem 2.5rem' }}
			>
				<i className=' fas fa-times modal-close close-btn'></i>
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
							className='btn waves-effect light-blue modal-close sign-btn'
							type='submit'
							name='action'
						>
							Sign In
						</button>
					</div>
					Forgot Password?{' '}
					<a
						href='#forgot-modal'
						className='modal-trigger center light-blue-text modal-close'
					>
						Reset Here
					</a>
				</div>
			</div>
			<div className='modal-footer valign-wrapper'>
				<p className='center w-100'>
					Don't have a account?{' '}
					<a
						href='#signup-modal'
						className='modal-trigger light-blue-text modal-close'
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

export default SignIn;
