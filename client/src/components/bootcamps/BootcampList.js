import React from 'react';
import BootcampListItem from './BootcampListItem';

const BootcampList = () => {
	const arr = [1, 2, 3, 4, 5];
	return (
		<React.Fragment>
			{arr.map((element) => (
				<BootcampListItem element={element} key={element} />
			))}
			<ul className='pagination center-align' style={{ marginTop: '3rem' }}>
				<li className='disabled'>
					<a href='#!'>
						<i className='fas fa-angle-left'></i>
					</a>
				</li>
				<li className='active cyan'>
					<a href='#!'>1</a>
				</li>
				<li className='waves-effect'>
					<a href='#!'>2</a>
				</li>
				<li className='waves-effect'>
					<a href='#!'>3</a>
				</li>
				<li className='waves-effect'>
					<a href='#!'>4</a>
				</li>
				<li className='waves-effect'>
					<a href='#!'>5</a>
				</li>
				<li className='waves-effect'>
					<a href='#!'>
						<i className='fas fa-angle-right'></i>
					</a>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default BootcampList;
