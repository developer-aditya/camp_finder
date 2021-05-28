import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { updateAccount } from '../../actions/authAction';
import { connect } from 'react-redux';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const ManageAccount = ({ updateAccount, user }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (user !== null) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const submit = (e) => {
		e.preventDefault();
		const formBtn = document.getElementById('accountForm-btn');
		formBtn.classList.add('button--loading');
		let error = '';

		if (name === '' || email === '') error = 'Please Enter Your Details';
		else if (/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(email) === false)
			error = 'Please Enter Proper Email Id';

		if (error === '') {
			updateAccount({ name, email })
				.then((res) => {
					M.toast({
						html: 'Account Updated Successfully...',
					});
					setTimeout(() => {
						formBtn.classList.remove('button--loading');
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
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 l2'></div>
					<div className='col s12 l8'>
						<div className='card'>
							<div
								className='card-title blue-grey darken-3 white-text'
								style={{ padding: '0.75rem 1.5rem' }}
							>
								Manage Account
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
										id='user_name'
										type='text'
										value={name}
										placeholder='Enter name...'
										onChange={(e) => setName(e.target.value)}
									/>
									<label htmlFor='user_name' className='active'>
										User Name
									</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input
										id='user_email'
										type='email'
										value={email}
										placeholder='Enter email...'
										onChange={(e) => setEmail(e.target.value)}
									/>
									<label htmlFor='user_email' className='active'>
										Email
									</label>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col s12 m6' style={{ marginTop: '1rem' }}>
								{/* eslint-disable-next-line */}
								<a
									id='accountForm-btn'
									href=''
									className='btn light-blue waves-effect'
									style={{ width: '100%' }}
									onClick={submit}
								>
									Update Account
								</a>
							</div>
							<div className='col s12 m6' style={{ marginTop: '1rem' }}>
								<Link
									to='/manageAccount/changePassword'
									className='btn blue-grey darken-3 waves-effect'
									style={{ width: '100%' }}
								>
									Update Password
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps, { updateAccount })(ManageAccount);
