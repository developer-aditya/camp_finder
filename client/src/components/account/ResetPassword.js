import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';

import { resetPassword } from '../../actions/authActions';
import { connect } from 'react-redux';

const ResetPassword = ({ resetPassword }) => {
	const [password, setPassword] = useState('');
	const [cnf, setCnf] = useState('');

	const { resetToken } = useParams();
	const history = useHistory();

	const submit = () => {
		if (password === '') {
			console.log('Please Enter Password');
		} else if (/^\S{5,}\S$/.test(password) === false) {
			console.log(
				'Password must be atleast 6 character Long without spaces',
			);
		} else if (password !== cnf) {
			setCnf('');
			console.log('Entered Passwords does not Match');
		} else {
			// call reset password
			resetPassword({ password }, resetToken);
			setPassword('');
			setCnf('');
			history.push('/');
		}
	};

	return (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m3'></div>
					<div className='col s12 m6'>
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
										onChange={(e) => setCnf(e.target.value)}
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
								<a
									href='#submit'
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
