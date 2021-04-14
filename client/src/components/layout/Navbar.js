import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
	return (
		<nav className='blue-grey darken-4'>
			<div className='nav-wrapper container'>
				<Link to='/' className='brand-logo'>
					<i className={icon} style={{ fontSize: '2rem' }} />
					{title}
				</Link>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
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
					<li>
						<Link to='/bootcamps'>
							<i className='fas fa-search-location left'></i>Bootcamp
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Navbar;
