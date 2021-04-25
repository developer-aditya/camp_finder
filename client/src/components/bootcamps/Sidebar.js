import React, { useState, useEffect } from 'react';

import { setParams } from '../../actions/bootcampAction';
import { connect } from 'react-redux';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';
import noUiSlider from '../../../node_modules/materialize-css/extras/noUiSlider/nouislider.min';
import '../../../node_modules/materialize-css/extras/noUiSlider/nouislider.css';

const Sidebar = ({ setParams, setQuery }) => {
	useEffect(() => {
		let slider = document.getElementById('test-slider');
		noUiSlider.create(slider, {
			start: [500, 20000],
			connect: true,
			range: {
				min: 500,
				max: 20000,
			},
		});
		// eslint-disable-next-line
	}, []);

	const [distance, setDistance] = useState('');
	const [pincode, setPincode] = useState('');

	const [rating, setRating] = useState('0');

	const setParamsState = (e) => {
		if (distance === '' || pincode === '') {
			M.toast({ html: 'Please Enter Pincode and Distance' });
		} else if (
			!/^\+?(0|[1-9]\d*)$/.test(distance) ||
			!/^[0-9]{1}[0-9]{2}\s{0,1}[0-9]{2}$/.test(pincode)
		) {
			M.toast({ html: 'Distance and Pincode must be valid' });
		} else {
			setParams(distance, pincode);
		}
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<div className='card'>
				<div className='card-content'>
					<h5 className='mt-0'>By Location...</h5>
					<form>
						<div className='row'>
							<div className='col s6'>
								<div className='input-group'>
									<input
										type='text'
										name='distance'
										placeholder='Distance From'
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
										value={pincode}
										onChange={(e) => setPincode(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<button
							className='btn waves-effect light-blue find-bootcamp-btn'
							onClick={setParamsState}
						>
							Find Bootcamps
						</button>
					</form>
				</div>
			</div>

			<div className='card'>
				<div className='card-content'>
					<h5 className='mt-0'>Filter...</h5>
					<form>
						<div className='row'>
							<div className='col s12'>
								<div className='input-group'>
									<select
										name='rating'
										id='rating'
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										className='browser-default'
									>
										<option value='0'>Rating</option>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
											(element) => (
												<option value={element} key={element}>
													{element}
												</option>
											),
										)}
									</select>
								</div>
							</div>

							<div className='col s12'>
								<div className='input-group'>
									<div
										id='test-slider'
										style={{ margin: '3.25rem 0 1rem 0' }}
									></div>
									<span>Average Cost</span>
								</div>
							</div>
						</div>
						<button
							className='btn waves-effect light-blue find-bootcamp-btn'
							onClick={(e) => {
								setQuery(
									rating,
									document
										.getElementById('test-slider')
										.noUiSlider.get(),
								);
								e.preventDefault();
							}}
						>
							Apply Filter
						</button>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default connect(null, { setParams })(Sidebar);
