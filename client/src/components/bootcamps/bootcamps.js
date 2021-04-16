import React from 'react';
import Sidebar from './Sidebar';
import BootcampList from './BootcampList';

const Bootcamps = () => {
	return (
		<div
			className='grey lighten-4'
			style={{ padding: '3rem 2rem', minHeight: '90vh' }}
		>
			<div className='row'>
				<div className='col col s12 m5 l4 xl3'>
					<Sidebar />
				</div>
				<div className='col s12 m7 l8 xl9'>
					<div className='container'>
						<BootcampList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bootcamps;
