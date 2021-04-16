import React, { useEffect } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SidebarSingle from './SidebarSingle';
import ReadReview from '../reviews/ReadReview';
import WriteReview from '../reviews/WriteReview';
import SingleBootcampDetails from './SingleBootcampDetails';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const SingleBootcamp = () => {
	useEffect(() => {
		var elems = document.querySelectorAll('.materialboxed');
		M.Materialbox.init(elems, {});
	}, []);

	const arr = [1, 2, 3];
	return (
		<Router>
			<div
				className='grey lighten-4'
				style={{ padding: '3rem 2rem', minHeight: '90vh' }}
			>
				<div className='row'>
					<div className='col s12 m5 l4 xl3'>
						<SidebarSingle />
					</div>
					<div className='col s12 m7 l8 xl9'>
						<div className='container'>
							<Switch>
								<Route
									exact
									path='/singleBootcamp'
									component={SingleBootcampDetails}
								></Route>
								<Route
									exact
									path='/singleBootcamp/readReview'
									render={(props) => (
										<React.Fragment>
											<Link
												to='/singleBootcamp'
												className='btn blue-grey darken-3 '
												style={{ marginTop: '0' }}
											>
												<i class='fas fa-arrow-circle-left'></i>{' '}
												View Course Details
											</Link>
											{arr.map((element) => (
												<ReadReview element={element} />
											))}
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
												className='btn blue-grey darken-3 '
												style={{ marginTop: '0' }}
											>
												<i class='fas fa-arrow-circle-left'></i>{' '}
												View Course Details
											</Link>
											<WriteReview />
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

export default SingleBootcamp;
