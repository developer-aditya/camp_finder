import React from 'react';
import { Link } from 'react-router-dom';

import addBootcampImg from '../../public/image/browserAdd.svg';

const AddBootcamp = () => {
	return (
		<div
			className='valign-wrapper'
			style={{ justifyContent: 'center', marginTop: '10%' }}
		>
			<div className='center-align'>
				<img
					src={addBootcampImg}
					style={{
						height: '200px',
					}}
					alt='add-bootcamp'
				/>
				<h5 className='grey-text'>
					You Don't Have Any Bootcamp Registered Yet...
				</h5>
				<p className='grey-text' style={{ margin: '1rem 0 1.25rem 0' }}>
					This is where you will create and manage your Bootcamp. Add
					Courses to Publish
				</p>
				<Link
					to={{
						pathname: '/manageBootcamp/bootcampForm',
						state: {
							operation: 'add',
						},
					}}
					className='light-blue-text'
					style={{ fontSize: '1.5rem' }}
				>
					Create a New Bootcamp
				</Link>
			</div>
		</div>
	);
};

export default AddBootcamp;
