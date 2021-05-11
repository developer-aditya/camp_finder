import React, { useEffect } from 'react';
import ManageBootcampDetail from './ManageBootcampDetail';
import ManageCourse from '../course/ManageCourse';

import { connect } from 'react-redux';
import { getUserBootcamp } from '../../actions/bootcampAction';
import addBootcampImg from '../../public/image/browserAdd.svg';
import { Link } from 'react-router-dom';

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
					This is where you will create and manage your Bootcamp.
				</p>
				<Link
					to='/manageBootcamp/editBootcamp'
					className='light-blue-text'
					style={{ fontSize: '1.5rem' }}
				>
					Create a New Bootcamp
				</Link>
			</div>
		</div>
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
