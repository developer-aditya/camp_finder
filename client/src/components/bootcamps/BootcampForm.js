import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addBootcamp, updateBootcamp } from '../../actions/bootcampAction';

import M from 'materialize-css/dist/js/materialize.min';

const BootcampForm = ({ location, addBootcamp, updateBootcamp }) => {
	const history = useHistory();

	useEffect(() => {
		let elems = document.querySelectorAll('select');
		M.FormSelect.init(elems);

		if (location.state.operation === 'edit') {
			const current = location.state.current;
			const form = document.getElementById('bootcamp-form');
			const names = [
				'name',
				'address',
				'phone',
				'email',
				'website',
				'description',
			];

			names.forEach((element) => {
				form.elements[element].value = current[element];
				form.elements[element].nextElementSibling.className = 'active';
			});

			for (let option of form.elements['careers'].options) {
				for (let i = 0; i < current.careers.length; i++) {
					if (current.careers[i] === option.value) {
						option.selected = true;
					}
				}
			}

			for (let option of form.elements['course_features'].options) {
				if (current[option.value]) {
					option.selected = true;
				}
			}
		}
		//eslint-disable-next-line
	}, []);

	const submit = (e) => {
		e.preventDefault();

		const formBtn = document.getElementById('bootcampForm-btn');
		formBtn.classList.add('button--loading');

		let form = e.target;
		let bootcamp = {};
		let error = '';
		const names = [
			'name',
			'address',
			'phone',
			'email',
			'website',
			'description',
		];

		// Course Feature Adding in bootcamp
		for (let option of form.elements['course_features'].options) {
			if (option.value === '0') continue;
			bootcamp[option.value] = option.selected;
		}

		// Careers validate and adding in bootcamp
		let careers = [];
		for (let option of form.elements['careers'].options) {
			if (option.selected) careers.push(option.value);
		}
		if (careers.length === 0) error = 'Please Select One or More Careers';
		else bootcamp['careers'] = careers;

		// Website Validate
		if (
			/^((http(s?)?):\/\/)([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
				form.elements['website'].value,
			) === false
		)
			error = 'Please Enter Full Url of Website';

		// Email Validate
		if (
			/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(form.elements['email'].value) ===
			false
		)
			error = 'Please Enter Proper Email Id';

		// Phone Number Validate
		if (/^[0-9]{10}$/.test(form.elements['phone'].value) === false)
			error = 'Wrong Phone Number';

		//  Text feilds validate and adding in bootcamp
		names.forEach((element) => {
			let val = form.elements[element].value;
			if (val === '') error = 'Please Enter Bootcamp Details';
			else bootcamp[element] = val;
		});

		if (error === '') {
			if (location.state.operation === 'edit') {
				updateBootcamp(location.state.current.id, bootcamp)
					.then((res) => {
						M.toast({
							html: `Your Bootcamp Has Been Updated Successfully`,
						});
						setTimeout(() => {
							formBtn.classList.remove('button--loading');
							history.push('/manageBootcamp');
						}, 500);
					})
					.catch((err) => {
						M.toast({
							html: `${err.response.status}! ${
								err.response.data.error || 'Internal Server Error'
							}`,
						});
						formBtn.classList.remove('button--loading');
					});
			} else if (location.state.operation === 'add') {
				addBootcamp(bootcamp)
					.then((res) => {
						M.toast({
							html: `You Have Successfully Created a bootcamp`,
						});
						setTimeout(() => {
							formBtn.classList.remove('button--loading');
							history.push('/manageBootcamp');
						}, 500);
					})
					.catch((err) => {
						M.toast({
							html: `${err.response.status}! ${
								err.response.data.error || 'Internal Server Error'
							}`,
						});
						formBtn.classList.remove('button--loading');
					});
			}
		} else {
			M.toast({
				html: `${error}`,
			});
			formBtn.classList.remove('button--loading');
		}
	};

	return (
		<div className='grey lighten-4  page-layout'>
			<div className='container'>
				<div className='center'>
					<h3 className='mt-0'>{location.state.operation} Bootcamp</h3>
					<p style={{ textAlign: 'center', padding: '0rem 0.5rem' }}>
						Important: You must be affiliated with a bootcamp to{' '}
						{location.state.operation} to CampFinder
					</p>
				</div>
				<form id='bootcamp-form' onSubmit={submit}>
					<div className='row' style={{ margin: '1rem 0' }}>
						<div className='col s12 l6'>
							<div className='card'>
								<div
									className='card-content'
									style={{ margin: '1rem 1.5rem' }}
								>
									<p className='flow-text'>Location &amp; Contact</p>
									<small className='grey-text'>
										If multiple locations, use the main or largest
									</small>
									<div
										className='input-field'
										style={{
											margin: '1.75rem 0',
										}}
									>
										<input name='name' id='name' type='text' />
										<label htmlFor='name'>Bootcamp Name</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<textarea
											name='address'
											id='address'
											className='materialize-textarea'
										></textarea>
										<label htmlFor='address'>Full Address</label>
										<span className='helper-text'>
											Street, city, state, etc
										</span>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<input name='phone' id='phone' type='text' />
										<label htmlFor='phone'>Phone Number</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<input name='email' id='email' type='email' />
										<label htmlFor='email'>Email</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<input name='website' id='website' type='text' />
										<label htmlFor='website'>Website</label>
									</div>
								</div>
							</div>
						</div>
						<div className='col s12 l6'>
							<div className='card'>
								<div
									className='card-content'
									style={{ margin: '1rem 1.5rem' }}
								>
									<p className='flow-text'>Other Information</p>
									<small className='grey-text'>
										*After you {location.state.operation} the
										bootcamp, you can {location.state.operation} the
										specific courses offered
									</small>

									<div
										className='input-field'
										style={{ margin: '2rem 0' }}
									>
										<textarea
											name='description'
											id='description'
											className='materialize-textarea'
										></textarea>
										<label htmlFor='description'>Description</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '4rem' }}
									>
										<select name='careers' id='careers' multiple>
											<option value='0' disabled>
												Choose your option
											</option>
											<option value='Web Development'>
												Web Development
											</option>
											<option value='UI/UX'>UI/UX</option>
											<option value='Mobile Development'>
												Mobile Development
											</option>
											<option value='Data Science'>
												Data Science
											</option>
											<option value='Business'>Business</option>
										</select>
										<label htmlFor='careers'>Careers</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '3rem' }}
									>
										<select
											id='course_features'
											name='course_features'
											multiple
										>
											<option value='0' disabled>
												Choose your option
											</option>
											<option value='housing'>Housing</option>
											<option value='jobAssistance'>
												Job Assistance
											</option>
											<option value='jobGuarantee'>
												Job Guarentee
											</option>
											<option value='periodicPayment'>
												Accepts Periodic Payments
											</option>
										</select>
										<label htmlFor='course_features'>
											Course Features
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='center'>
							<button
								id='bootcampForm-btn'
								className='btn submit-btn waves-effect light-blue w-50 center'
								type='submit'
								form='bootcamp-form'
							>
								{location.state.operation} Bootcamp
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default connect(null, { addBootcamp, updateBootcamp })(BootcampForm);
