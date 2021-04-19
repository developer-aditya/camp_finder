import React from 'react';
import { Link } from 'react-router-dom';

function ChangePassword() {
	return (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m2'></div>
					<div className='col s12 m8'>
						<Link
							to='/manageAccount'
							className='btn blue-grey darken-3 '
							style={{ marginTop: '0' }}
						>
							<i className='fas fa-arrow-circle-left'></i> Manage Account
						</Link>
						<div className='card'>
							<div
								className='card-title blue-grey darken-3 white-text'
								style={{ padding: '0.75rem 1.5rem' }}
							>
								Update Password
							</div>
							<div
								className='card-content'
								style={{ padding: '2rem 3rem 1rem 3rem' }}
							>
								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='current_password' type='text' />
									<label htmlFor='current_password'>
										Current Password
									</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='new_password' type='text' />
									<label htmlFor='new_password'>New Password</label>
								</div>
								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='confirm_password' type='text' />
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
									className='btn cyan waves-effect'
									style={{ width: '100%' }}
								>
									Update Password
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;
