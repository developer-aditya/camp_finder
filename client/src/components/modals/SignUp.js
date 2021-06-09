import React, { useState } from 'react';

import { userRegister } from '../../actions/authAction';
import { connect } from 'react-redux';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const SignUp = ({ userRegister }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cnf, setCnf] = useState('');
	const [type, setType] = useState('none');

	const submit = (e) => {
		e.preventDefault();
		const formBtn = document.getElementById('registerForm-btn');
		formBtn.classList.add('button--loading');
		let error = '';

		if (name === '' || email === '' || password === '' || type === 'none') {
			error = 'Please Enter All Details';
		} else if (/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(email) === false) {
			error = 'Please Enter Proper Email Id';
		} else if (/^\S{5,}\S$/.test(password) === false) {
			error = 'Password must be atleast 6 character Long without spaces';
		} else if (password !== cnf) {
			error = 'Password and Confirm Password do not match';
			setCnf('');
		}

		if (error === '') {
			userRegister({ name, email, password, role: type })
				.then((res) => {
					M.toast({
						html: 'User Registered Successfully...',
					});
					setTimeout(() => {
						setName('');
						setEmail('');
						setPassword('');
						setCnf('');
						setType('none');
						formBtn.classList.remove('button--loading');
						M.Modal.getInstance(
							document.getElementById('signup-modal'),
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

	const comparePassword = (e) => {
		setCnf(e.target.value);
		if (e.target.value !== password) {
			e.target.style.color = 'red';
		} else {
			e.target.style.color = 'green';
		}
	};

	return (
		<div id='signup-modal' className='modal'>
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
							id='register_name'
							type='text'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-paper-plane prefix'></i>
						<input
							id='register_email'
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className='input-field'>
						<i className='fas fa-key prefix'></i>
						<input
							id='register_password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='input-field'>
						<i className='fas fa-check-double prefix'></i>
						<input
							id='password_confirm'
							type='password'
							placeholder='Confirm Password'
							value={cnf}
							onChange={comparePassword}
						/>
					</div>

					<div className='input-field'>
						<select
							id='user_type'
							className='browser-default'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value='none' disabled>
								Select User Type
							</option>
							<option value='user'>Student</option>
							<option value='publisher'>Publisher</option>
						</select>
					</div>

					<div className='input-feild'>
						<button
							id='registerForm-btn'
							className='btn waves-effect light-blue sign-btn'
							type='submit'
							name='action'
							onClick={submit}
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<p className='center-align'>
					You must be affiliated with the bootcamp to add it to Camp Finder
				</p>
			</div>
		</div>
	);
};

export default connect(null, { userRegister })(SignUp);
