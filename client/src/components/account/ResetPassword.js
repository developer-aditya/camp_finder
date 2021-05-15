import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';

import { resetPassword } from '../../actions/authAction';
import { connect } from 'react-redux';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const ResetPassword = ({ resetPassword }) => {
	const [password, setPassword] = useState('');
	const [cnf, setCnf] = useState('');

	const { resetToken } = useParams();
	const history = useHistory();

	const submit = (e) => {
		e.preventDefault();
		const formBtn = document.getElementById('resetPasswordForm-btn');
		formBtn.classList.add('button--loading');
		let error = '';

		if (password === '') error = 'Please Enter Password';
		else if (/^\S{5,}\S$/.test(password) === false)
			error = 'Password must be atleast 6 character Long without spaces';
		else if (password !== cnf) {
			error = 'Entered Passwords does not Match';
			setCnf('');
		}

		if (error === '') {
			resetPassword({ password }, resetToken)
				.then((res) => {
					M.toast({
						html: 'Reset Password Successful...',
					});
					setTimeout(() => {
						setPassword('');
						setCnf('');
						formBtn.classList.remove('button--loading');
						history.push('/');
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
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m2 l3'></div>
					<div className='col s12 m8 l6'>
						<div className='card'>
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
								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input
										id='new_password'
										type='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<label htmlFor='new_password'>New Password</label>
								</div>
								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input
										id='confirm_password'
										type='password'
										value={cnf}
										onChange={comparePassword}
									/>
									<label htmlFor='confirm_password'>
										Confirm Password
									</label>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col s3'></div>
							<div className='col s6'>
								{/* eslint-disable-next-line */}
								<a
									id='resetPasswordForm-btn'
									href=''
									className='btn light-blue waves-effect w-100'
									onClick={submit}
								>
									Reset Password
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { resetPassword })(ResetPassword);
