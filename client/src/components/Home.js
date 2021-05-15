import React, { useState } from 'react';

import { setParams } from '../actions/bootcampAction';
import { connect } from 'react-redux';

import M from '../../node_modules/materialize-css/dist/js/materialize.min';

const Home = ({ setParams, history }) => {
	const [distance, setDistance] = useState('');
	const [pincode, setPincode] = useState('');

	const setParamsState = (e) => {
		e.preventDefault();
		if (distance === '' || pincode === '') {
			M.toast({ html: 'Please Enter Pincode and Distance' });
		} else if (
			!/^\+?(0|[1-9]\d*)$/.test(distance) ||
			!/^[0-9]{1}[0-9]{2}\s{0,1}[0-9]{2}$/.test(pincode)
		) {
			M.toast({ html: 'Distance and Pincode must be valid' });
		} else {
			setParams(distance, pincode);
			history.push('/bootcamps');
		}
	};

	return (
		<div className='showcase valign-wrapper'>
			<div className='showcase-inner center-align white-text'>
				<h2>Find a Coding Bootcamp</h2>
				<p className='flow-text' style={{ marginBottom: '1rem' }}>
					Find, rate and read reviews on coding bootcamps
				</p>
				<form>
					<div className='row'>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='distance'
									placeholder='Distance From'
									className='white-text'
									value={distance}
									onChange={(e) => setDistance(e.target.value)}
								/>
							</div>
						</div>
						<div className='col s6'>
							<div className='input-group'>
								<input
									type='text'
									name='pincode'
									placeholder='Enter Pincode'
									className='white-text'
									value={pincode}
									onChange={(e) => setPincode(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<button
						className='btn waves-effect light-blue submit-btn'
						onClick={setParamsState}
					>
						<i className='fas fa-search'></i> Find Bootcamps
					</button>
				</form>
			</div>
		</div>
	);
};

export default connect(null, { setParams })(Home);
