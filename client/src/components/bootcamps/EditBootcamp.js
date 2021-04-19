import React, { useEffect } from 'react';
import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

function EditBootcamp(props) {
	useEffect(() => {
		var elems = document.querySelectorAll('select');
		M.FormSelect.init(elems);
	}, []);
	return (
		<div className='grey lighten-4  page-layout'>
			<div className='container'>
				<div className='center'>
					<h3 style={{ marginTop: '0' }}>{props.type} Bootcamp</h3>
					<p>
						Important: You must be affiliated with a bootcamp to add to
						CampFinder
					</p>
				</div>

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
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='bootcamp_name' type='text' />
									<label htmlFor='bootcamp_name'>Bootcamp Name</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='bootcamp_address' type='text' />
									<label htmlFor='bootcamp_address'>
										Full Address
									</label>
									<span className='helper-text'>
										Street, city, state, etc
									</span>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='bootcamp_phone' type='text' />
									<label htmlFor='bootcamp_phone'>Phone Number</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='bootcamp_email' type='email' />
									<label htmlFor='bootcamp_email'>Email</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='bootcamp_website' type='text' />
									<label htmlFor='bootcamp_website'>Website</label>
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
									*After you add the bootcamp, you can add the specific
									courses offered
								</small>
								<div
									className='input-field'
									style={{ marginBottom: '2rem' }}
								>
									<span>Description</span>
									<textarea
										className='text-area'
										id='description'
										placeholder={
											'Description (what you offer, details, etc)'
										}
									/>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '4rem' }}
								>
									<select id='careers' multiple>
										<option value='0' disabled>
											Choose your option
										</option>
										<option value='1'>Web Development</option>
										<option value='2'>UI/UX</option>
										<option value='3'>Mobile Development</option>
									</select>
									<label htmlFor='careers'>Careers</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '3rem' }}
								>
									<select id='course_features' multiple>
										<option value='0' disabled>
											Choose your option
										</option>
										<option value='1'>Housing</option>
										<option value='2'>Job Assistance</option>
										<option value='3'>Job Guarentee</option>
										<option value='4'>Accepts GI Bill</option>
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
					<div className=' center'>
						<button
							className='btn submit-btn waves-effect cyan'
							style={{ width: '50%' }}
						>
							{props.type} Bootcamp
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditBootcamp;
