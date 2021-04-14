import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Bootcamps from './components/bootcamps/bootcamps';
import SignIn from './components/modals/SignIn';
import SignUp from './components/modals/SignUp';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min';

function App() {
	useEffect(() => {
		M.AutoInit();
	}, []);

	return (
		<Router>
			<div className='App'>
				<Navbar title='BootCamp' icon='fas fa-laptop-house' />
				<SignIn />
				<SignUp />
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/bootcamps' component={Bootcamps}></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
