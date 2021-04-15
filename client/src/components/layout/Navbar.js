import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
	return (
		<React.Fragment>
			<ul id='account' className='dropdown-content'>
				{/* Manage Bootcamp for publisher user */}
				<li>
					<a href='#!'>Manage Bootcamp</a>
				</li>
				{/* Manage Review for normal user */}
				<li>
					<a href='#!'>Manage Reviews</a>
				</li>
				{/* For all users */}
				<li>
					<a href='#!'>Manage Account</a>
				</li>
				<li>
					<a href='#!'>
						<i class='fas fa-sign-out-alt'></i>Logout
					</a>
				</li>
			</ul>
			<nav className='blue-grey darken-4'>
				<div className='nav-wrapper container'>
					<Link to='/' className='brand-logo'>
						<i className={icon} style={{ fontSize: '2rem' }} />
						{title}
					</Link>
					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{/* If user not logged In show */}
						<li>
							<a href='#signin-modal' className='modal-trigger'>
								<i className='fas fa-sign-in-alt left'></i>
								Sign In
							</a>
						</li>
						<li>
							<a href='#signup-modal' className='modal-trigger'>
								<i className='fas fa-user-plus left' />
								Sign Up
							</a>
						</li>
						{/* If user Logged In Show */}
						<li>
							<a
								className='dropdown-trigger valign-wrapper'
								href='#!'
								data-target='account'
							>
								My Account
								<i
									className='fas fa-caret-down'
									style={{ marginLeft: '0.5rem' }}
								></i>
							</a>
						</li>
						{/* Always show */}
						<li>
							<Link to='/bootcamps'>
								<i className='fas fa-search-location left'></i>Bootcamp
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
};

Navbar.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Navbar;
