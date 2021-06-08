import React, { useState } from 'react';

import { resetPasswordLinkRequest } from '../../actions/authAction';
import { connect } from 'react-redux';
import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const ForgotPassword = ({ resetPasswordLinkRequest }) => {
	const [email, setEmail] = useState('');

	const submit = (e) => {
		e.preventDefault();
		const formBtn = document.getElementById('forgotForm-btn');
		formBtn.classList.add('button--loading');
		let error = '';

		if (email === '') error = 'Please Enter User Email';
		else if (/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(email) === false)
			error = 'Please Enter Proper Email Id';

		if (error === '') {
			resetPasswordLinkRequest({ email })
				.then((res) => {
					M.toast({
						html: 'Reset Link Sent To Email...',
					});
					setTimeout(() => {
						setEmail('');
						formBtn.classList.remove('button--loading');
						M.Modal.getInstance(
							document.getElementById('forgot-modal'),
						).close();
					}, 500);
				})
				.catch((err) => {
					M.toast({
						html: `${err.response.status}! ${
							err.response.data.error || 'Internal Server Error'
						}`,
					});
					formBtn.classList.remove('button--loading');
				});
		} else {
			M.toast({
				html: `${error}`,
			});
			formBtn.classList.remove('button--loading');
		}
	};

	return (
		<div id='forgot-modal' className='modal'>
			<div className='card' style={{ margin: '0' }}>
				<i className=' fas fa-times modal-close white-text close-btn'></i>
				<div
					className='card-title blue-grey darken-3 white-text'
					style={{ padding: '0.75rem 1.5rem' }}
				>
					Reset Password
				</div>
				<div className='card-content forgot-padding'>
					<span className='grey-text' style={{ textAlign: 'justify' }}>
						*Use this form to reset your password using the registered
						email address.
					</span>
					<form id='reset'>
						<div className='input-field' style={{ margin: '2rem' }}>
							<input
								id='reset_email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor='reset_email'>Enter Registered Email</label>
						</div>

						<div className='row center'>
							<button
								id='forgotForm-btn'
								className='btn waves-effect light-blue w-50'
								form='reset'
								onClick={submit}
							>
								Send Reset Link
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { resetPasswordLinkRequest })(ForgotPassword);
