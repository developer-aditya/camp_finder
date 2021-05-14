import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeParams } from '../../actions/bootcampAction';
import { userLogout } from '../../actions/authAction';
import { connect } from 'react-redux';

const Navbar = ({ icon, title, removeParams, auth, userLogout }) => {
	const history = useHistory();

	const allBootcamp = (e) => {
		e.preventDefault();
		removeParams();
		history.push('/bootcamps');
	};

	const logout = (e) => {
		e.preventDefault();
		userLogout();
		history.push('/');
	};

	return (
		<React.Fragment>
			<ul id='account' className='dropdown-content'>
				{auth.isAuthenticated && auth.user.role === 'publisher' && (
					<li>
						<Link to='/manageBootcamp'>Manage Bootcamp</Link>
					</li>
				)}

				{auth.isAuthenticated && auth.user.role === 'user' && (
					<li>
						<Link to='/manageReview'>Manage Reviews</Link>
					</li>
				)}

				<li>
					<Link to='/manageAccount'>Manage Account</Link>
				</li>
				<li>
					{/* eslint-disable-next-line */}
					<a href='' onClick={logout}>
						<i className='fas fa-sign-out-alt'></i>Logout
					</a>
				</li>
			</ul>

			<nav className='blue-grey darken-4'>
				<div className='nav-wrapper container'>
					<Link to='/' className='brand-logo'>
						{title}
					</Link>
					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{auth.isAuthenticated ? (
							''
						) : (
							<li>
								<a href='#signin-modal' className='modal-trigger'>
									<i className='fas fa-sign-in-alt left'></i>
									Sign In
								</a>
							</li>
						)}

						{auth.isAuthenticated ? (
							''
						) : (
							<li>
								<a href='#signup-modal' className='modal-trigger'>
									<i className='fas fa-user-plus left' />
									Sign Up
								</a>
							</li>
						)}

						<li className='dropdown-trigger' data-target='account'>
							{auth.isAuthenticated ? (
								// eslint-disable-next-line
								<a
									href=''
									onClick={(e) => e.preventDefault()}
									className='valign-wrapper'
								>
									My Account
									<i
										className='fas fa-caret-down'
										style={{ marginLeft: '0.5rem' }}
									></i>
								</a>
							) : (
								''
							)}
						</li>

						<li>
							{/* eslint-disable-next-line */}
							<a href='' onClick={allBootcamp}>
								<i className='fas fa-search-location left'></i> All
								Bootcamp
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { removeParams, userLogout })(Navbar);
