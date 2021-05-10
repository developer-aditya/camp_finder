import React, { useState } from 'react';

import { userLogin } from '../../actions/authAction';
import { connect } from 'react-redux';

const SignIn = ({ userLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => {
		if (email === '' || password === '') {
			console.log('Please Enter User Credentials');
		} else {
			if (/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(email) === true) {
				userLogin({ email, password });
				setEmail('');
				setPassword('');
			} else {
				console.log('Wrong email');
			}
		}
	};

	return (
		<div id='signin-modal' className='modal modal-fixed-footer'>
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
							type='email'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-key prefix'></i>
						<input
							id='password'
							type='password'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className='input-feild'>
						<button
							className='btn waves-effect light-blue sign-btn'
							type='submit'
							name='action'
							onClick={submit}
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

export default connect(null, { userLogin })(SignIn);
