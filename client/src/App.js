import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Bootcamps from './components/bootcamps/Bootcamps';
import SignIn from './components/modals/SignIn';
import SignUp from './components/modals/SignUp';
import SingleBootcamp from './components/bootcamps/SingleBootcamp';

import EditBootcamp from './components/bootcamps/EditBootcamp';
import EditCourse from './components/course/EditCourse';
import ManageBootcamp from './components/bootcamps/ManageBootcamp';
import ManageReview from './components/reviews/ManageReview';
import ManageAccount from './components/account/ManageAccount';
import ChangePassword from './components/account/ChangePassword';
import ResetPassword from './components/account/ResetPassword';
import ForgotPassword from './components/modals/ForgotPassword';

import store from './store';
import { Provider } from 'react-redux';
import { userGet } from './actions/authActions';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min';

const App = () => {
	store.dispatch(userGet());
	useEffect(() => {
		M.AutoInit();
		let elems = document.querySelectorAll('.dropdown-trigger');
		const options = {
			coverTrigger: false,
			hover: true,
			constrainWidth: false,
			closeOnClick: true,
		};
		M.Dropdown.init(elems, options);
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Navbar title='CampFinder' icon='fas fa-laptop-house' />
					<SignIn />
					<SignUp />
					<ForgotPassword />
					<Switch>
						<Route exact path='/' component={Home}></Route>
						<Route exact path='/bootcamps' component={Bootcamps}></Route>
						<Route
							exact
							path='/singleBootcamp'
							component={SingleBootcamp}
						></Route>
						<Route
							exact
							path='/manageBootcamp'
							component={ManageBootcamp}
						></Route>
						<Route
							exact
							path='/manageBootcamp/editBootcamp'
							render={() => <EditBootcamp type={'Update'} />}
						></Route>
						<Route
							exact
							path='/manageBootcamp/editCourse'
							render={() => <EditCourse type={'Update'} />}
						></Route>
						<Route
							exact
							path='/manageReview'
							component={ManageReview}
						></Route>
						<Route
							exact
							path='/manageAccount'
							component={ManageAccount}
						></Route>
						<Route
							exact
							path='/manageAccount/changePassword'
							component={ChangePassword}
						></Route>
						<Route
							exact
							path='/manageAccount/resetPassword/:resetToken'
							component={ResetPassword}
						></Route>
						<Route
							path='*'
							render={(props) => (
								<h3>
									Have you ever been lost? If so, how did you feel?
								</h3>
							)}
						></Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
