import React, { useEffect } from 'react';
import ManageBootcampDetail from './ManageBootcampDetail';
import ManageCourse from '../course/ManageCourse';

import { connect } from 'react-redux';
import { getUserBootcamp } from '../../actions/bootcampAction';

import AddBootcamp from '../reponse/AddBootcamp';

function ManageBootcamp({ getUserBootcamp, current, loading }) {
	useEffect(() => {
		getUserBootcamp();
		// eslint-disable-next-line
	}, []);

	if (loading)
		return (
			<div
				className='progress'
				style={{
					position: 'absolute',
					top: '50%',
					left: '25%',
					width: '50%',
					backgroundColor: '#c0e7fa',
				}}
			>
				<div
					className='indeterminate'
					style={{ backgroundColor: '#1c9fe0' }}
				></div>
			</div>
		);

	return current === null ? (
		<AddBootcamp />
	) : (
		<div className='grey lighten-4 page-layout'>
			<div className='container'>
				<div className='row'>
					<div className='col s12 m7'>
						<ManageBootcampDetail current={current} />
					</div>
					<div className='col s12 m5'>
						<ManageCourse id={current.id} />
					</div>
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	current: state.bootcamp.currentBootcamp,
	loading: state.bootcamp.loading,
});

export default connect(mapStateToProps, { getUserBootcamp })(ManageBootcamp);
