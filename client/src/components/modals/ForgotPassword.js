import React from 'react';

const ForgotPassword = () => {
	return (
		<div id='forgot-modal' className='modal' style={modalStyle}>
			<div className='card' style={{ margin: '0' }}>
				<i className=' fas fa-times modal-close white-text close-btn'></i>
				<div
					className='card-title blue-grey darken-3 white-text'
					style={{ padding: '0.75rem 1.5rem' }}
				>
					Reset Password
				</div>
				<div
					className='card-content'
					style={{ padding: '2rem 3rem 1rem 3rem' }}
				>
					<span className='grey-text'>
						*Use this form to reset your password using the registered
						email address.
					</span>

					<div className='input-field' style={{ margin: '2rem' }}>
						<input id='reset_email' type='email' />
						<label htmlFor='reset_email'>Enter Registered Email</label>
					</div>

					<div className='row center'>
						<button className='btn waves-effect light-blue w-50'>
							Send Reset Link
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '500px',
	color: '#555',
};

export default ForgotPassword;
