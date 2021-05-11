import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { updateAccount } from '../../actions/authAction';
import { connect } from 'react-redux';

const ManageAccount = ({ updateAccount, user }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (user !== null) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const submit = () => {
		let update = {};
		if (name !== '') {
			update['name'] = name;
		}
		if (email !== '') {
			if (/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(email) === true) {
				update['email'] = email;
			} else {
				update = {};
			}
		}
		if (JSON.stringify(update) === '{}') {
			console.log('Please Enter One of the Details properly');
		} else {
			updateAccount(update);
			setName('');
			setEmail('');
		}
	};

	return (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m2'></div>
					<div className='col s12 m8'>
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
							<div className='col s6'>
								<a
									href='#submit'
									className='btn light-blue waves-effect'
									style={{ width: '100%' }}
									onClick={submit}
								>
									Update Account
								</a>
							</div>
							<div className='col s6'>
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
