import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { addCourse, updateCourse } from '../../actions/courseAction';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const CourseForm = ({ location, addCourse, updateCourse }) => {
	useEffect(() => {
		let elems = document.querySelectorAll('select');
		M.FormSelect.init(elems);

		if (location.state.operation === 'edit') {
			const form = document.getElementById('course-form');
			const names = ['title', 'tuition', 'weeks', 'description'];

			names.forEach((element) => {
				form.elements[element].value = location.state.course[element];
				form.elements[element].nextElementSibling.className = 'active';
			});

			form.elements['minimumSkill'].value =
				location.state.course['minimumSkill'];
			form.elements['scholarshipsAvailable'].checked =
				location.state.course['scholarshipsAvailable'];
		}
		// eslint-disable-next-line
	}, []);

	const submit = (e) => {
		e.preventDefault();

		const form = e.target;
		const names = ['title', 'tuition', 'weeks', 'description'];
		let courseObject = {};
		let error = '';

		courseObject['scholarshipsAvailable'] =
			form.elements['scholarshipsAvailable'].checked;

		let val = form.elements['minimumSkill'].value;
		if (val === '0') error = 'Please Select Minimum Skills';
		else courseObject['minimumSkill'] = val;

		if (/^[1-9]\d*$/.test(form.elements['weeks'].value) === false)
			error = 'Please Enter Number Of Weeks';

		names.forEach((element) => {
			let val = form.elements[element].value;
			if (val === '') error = 'Please Enter Course Details';
			else courseObject[element] = val;
		});

		if (error === '') {
			if (location.state.operation === 'edit') {
				updateCourse(location.state.course._id, courseObject);
			} else if (location.state.operation === 'add') {
				addCourse(location.state.bootcampId, courseObject);
			}
		} else {
			console.log(error);
		}
	};

	return (
		<div className='grey lighten-4  page-layout'>
			<div className='container'>
				<div className='center'>
					<h3 className='mt-0'>{location.state.operation} Course</h3>
					<p>
						Important: You must be affiliated with the bootcamp to{' '}
						{location.state.operation} this Course
					</p>
				</div>

				<form id='course-form' onSubmit={submit}>
					<div className='row' style={{ margin: '1rem 0' }}>
						<div className='col l1 xl2'></div>
						<div className='col s12 l10 xl8'>
							<div className='card'>
								<div
									className='card-content'
									style={{ margin: '1rem 1.5rem' }}
								>
									<div
										className='input-field'
										style={{ margin: '1.5rem 0' }}
									>
										<input id='title' type='text' />
										<label htmlFor='title'>Course Title</label>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<input id='weeks' type='text' />
										<label htmlFor='weeks'>Course Duration</label>
										<span className='helper-text'>
											Enter number of weeks course lasts
										</span>
									</div>

									<div
										className='input-field'
										style={{ marginBottom: '1.5rem' }}
									>
										<input id='tuition' type='number' />
										<label htmlFor='tuition'>Course Tution</label>
										<span className='helper-text'>
											Indian Currency
										</span>
									</div>

									<span className='grey-text'>
										Minimum Skills Required
									</span>
									<div
										className='input-field'
										style={{ marginBottom: '2rem' }}
									>
										<select id='minimumSkill' defaultValue={'0'}>
											<option value='0' disabled>
												Choose your option
											</option>
											<option value='beginner'>
												Beginner (any)
											</option>
											<option value='intermediate'>
												Intermediate
											</option>
											<option value='advanced'>Advanced</option>
										</select>
									</div>

									<div
										className='input-field'
										style={{ margin: '2.5rem 0 1.5rem 0' }}
									>
										<textarea
											name='description'
											id='description'
											className='materialize-textarea'
										></textarea>
										<label htmlFor='description'>Description</label>
									</div>

									<div
										className='input-feild'
										style={{ marginBottom: '2rem' }}
									>
										<label>
											<input
												name='scholarshipsAvailable'
												id='scholarshipsAvailable'
												type='checkbox'
											/>
											<span>Scholarship Available</span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className=' center'>
							<button
								className='btn submit-btn waves-effect light-blue w-50'
								type='submit'
								form='course-form'
							>
								{location.state.operation} Course
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default connect(null, { addCourse, updateCourse })(CourseForm);
