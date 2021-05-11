import React, { useEffect } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SidebarSingle from './SidebarSingle';
import ReadReview from '../reviews/ReadReview';
import WriteReview from '../reviews/WriteReview';
import SingleBootcampDetails from './SingleBootcampDetails';

import { connect } from 'react-redux';
import { clearCurrent } from '../../actions/bootcampAction';

import image404 from '../../public/image/404.svg';

const SingleBootcamp = ({ loading, current, clearCurrent }) => {
	useEffect(() => {
		return () => {
			clearCurrent();
		};
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
					src={image404}
					style={{
						height: '200px',
					}}
					alt='add-bootcamp'
				/>
				<h5 className='grey-text'>
					Oops! Unable to Locate Selected Bootcamp...
				</h5>
				<p className='grey-text' style={{ margin: '1rem 0 1.25rem 0' }}>
					Go to the Bootcamp List and Select Again
				</p>
				<Link
					to='/bootcamps'
					className='light-blue-text'
					style={{ fontSize: '1.5rem' }}
				>
					Go To Bootcamp List
				</Link>
			</div>
		</div>
	) : (
		<Router>
			<div className='grey lighten-4 page-layout'>
				<div className='row'>
					<div className='col s12 m5 l4 xl3'>
						<SidebarSingle current={current} />
					</div>
					<div className='col s12 m7 l8 xl9'>
						<div className='container'>
							<Switch>
								<Route
									exact
									path='/singleBootcamp'
									component={() => (
										<SingleBootcampDetails current={current} />
									)}
								></Route>
								<Route
									exact
									path='/singleBootcamp/readReview'
									render={(props) => (
										<React.Fragment>
											<Link
												to='/singleBootcamp'
												className='btn blue-grey darken-3 mt-0'
											>
												<i className='fas fa-arrow-circle-left'></i>{' '}
												View Course Details
											</Link>
											<ReadReview id={current.id} />
										</React.Fragment>
									)}
								></Route>
								<Route
									exact
									path='/singleBootcamp/writeReview'
									render={(props) => (
										<React.Fragment>
											<Link
												to='/singleBootcamp'
												className='btn blue-grey darken-3 mt-0'
											>
												<i className='fas fa-arrow-circle-left'></i>{' '}
												View Course Details
											</Link>
											<WriteReview id={current.id} />
										</React.Fragment>
									)}
								></Route>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
};
const mapStateToProps = (state) => ({
	current: state.bootcamp.currentBootcamp,
	loading: state.bootcamp.loading,
});

export default connect(mapStateToProps, { clearCurrent })(SingleBootcamp);
