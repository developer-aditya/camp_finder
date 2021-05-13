import React from 'react';
import { Link } from 'react-router-dom';

import image404 from '../../public/image/404.svg';

const NotFound = ({ heading, msg, link, route }) => {
	return (
		<div
			className='valign-wrapper'
			style={{ justifyContent: 'center', marginTop: '10%' }}
		>
			<div className='center-align'>
				<img
					src={image404}
					style={{
						height: '200px',
					}}
					alt='add-bootcamp'
				/>
				<h5 className='grey-text'>{heading}</h5>
				<p className='grey-text' style={{ margin: '1rem 0 1.25rem 0' }}>
					{msg}
				</p>
				<Link
					to={route}
					className='light-blue-text'
					style={{ fontSize: '1.5rem' }}
				>
					{link}
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
