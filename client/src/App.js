import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './webfonts-with-css/css/all.min.css';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Bootcamps from './components/bootcamps/Bootcamps';
import SignIn from './components/modals/SignIn';
import SignUp from './components/modals/SignUp';
import SingleBootcamp from './components/bootcamps/SingleBootcamp';

import BootcampForm from './components/bootcamps/BootcampForm';
import CourseForm from './components/course/CourseForm';
import ManageBootcamp from './components/bootcamps/ManageBootcamp';
import ManageReview from './components/reviews/ManageReview';
import ManageAccount from './components/account/ManageAccount';
import ChangePassword from './components/account/ChangePassword';
import ResetPassword from './components/account/ResetPassword';
import ForgotPassword from './components/modals/ForgotPassword';

import store from './store';
import { Provider } from 'react-redux';
import { userGet } from './actions/authAction';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min';

const App = () => {
	useEffect(() => {
		store.dispatch(userGet());
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
					<Navbar title='campFinder' />
					<SignIn />
					<SignUp />
					<ForgotPassword />
					<Switch>
						<Route exact path='/' component={Home}></Route>
						<Route exact path='/bootcamps' component={Bootcamps}></Route>
						<Route
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
							path='/manageBootcamp/bootcampForm'
							component={BootcampForm}
						></Route>
						<Route
							exact
							path='/manageBootcamp/courseForm'
							component={CourseForm}
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
								<h3>Have you ever been lost? If so, Go To home Page</h3>
							)}
						></Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
