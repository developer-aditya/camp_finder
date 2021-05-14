import React from 'react';
import image500 from '../../public/image/500.svg';

const ServerError = ({ heading, msg, link, route }) => {
	return (
		<div
			className='valign-wrapper'
			style={{ justifyContent: 'center', marginTop: '10%' }}
		>
			<div className='center-align'>
				<img
					src={image500}
					style={{
						height: '350px',
					}}
					alt='add-bootcamp'
				/>
			</div>
		</div>
	);
};

export default ServerError;
