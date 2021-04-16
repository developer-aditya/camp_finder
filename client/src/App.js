import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Bootcamps from './components/bootcamps/Bootcamps';
import SignIn from './components/modals/SignIn';
import SignUp from './components/modals/SignUp';
import SingleBootcamp from './components/bootcamps/SingleBootcamp';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min';

function App() {
	useEffect(() => {
		M.AutoInit();
		let elems = document.querySelectorAll('.dropdown-trigger');
		const options = {
			coverTrigger: false,
			hover: true,
			constrainWidth: false,
		};
		M.Dropdown.init(elems, options);
	}, []);

	return (
		<Router>
			<div className='App'>
				<Navbar title='CampFinder' icon='fas fa-laptop-house' />
				<SignIn />
				<SignUp />
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/bootcamps' component={Bootcamps}></Route>
					<Route
						exact
						path='/singleBootcamp'
						component={SingleBootcamp}
					></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
