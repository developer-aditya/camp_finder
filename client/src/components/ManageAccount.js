import React from 'react';
import { Link } from 'react-router-dom';

function ManageAccount() {
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
									<input id='user_name' type='text' />
									<label htmlFor='user_name'>User Name</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='user_email' type='email' />
									<label htmlFor='user_email'>Email</label>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col s6'>
								<a
									href='#submit'
									className='btn light-blue waves-effect'
									style={{ width: '100%' }}
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
}

export default ManageAccount;
