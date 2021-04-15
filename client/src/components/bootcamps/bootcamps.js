import React from 'react';
import Sidebar from './Sidebar';
import BootcampList from './BootcampList';

const Bootcamps = () => {
	return (
		<div className='grey lighten-4' style={{ padding: '3rem 2rem' }}>
			<div className='row'>
				<div className='col s12 m5 xl3'>
					<Sidebar />
				</div>
				<div className='col s12 m7 xl9'>
					<div className='container'>
						<BootcampList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bootcamps;
