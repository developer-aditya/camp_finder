import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BootcampList from './BootcampList';

const Bootcamps = () => {
	const [filter, setFilter] = useState({ rating: '0', range: ['0', '20000'] });

	const setQueryUtil = (ratingArg, rangeValue) => {
		setFilter({ rating: ratingArg, range: rangeValue });
	};

	return (
		<div className='grey lighten-4 page-layout'>
			<div className='row'>
				<div className='col s12 xl3'>
					<Sidebar setQuery={setQueryUtil} />
				</div>
				<div className='col s12 xl9'>
					<div className='container'>
						<BootcampList queryState={filter} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bootcamps;
