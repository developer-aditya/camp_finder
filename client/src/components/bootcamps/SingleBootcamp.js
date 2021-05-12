import React, { useEffect } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SidebarSingle from './SidebarSingle';
import ReadReview from '../reviews/ReadReview';
import WriteReview from '../reviews/WriteReview';
import SingleBootcampDetails from './SingleBootcampDetails';

import { connect } from 'react-redux';
import { clearCurrent } from '../../actions/bootcampAction';

import NotFound from '../reponse/NotFound';

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
		<NotFound />
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
