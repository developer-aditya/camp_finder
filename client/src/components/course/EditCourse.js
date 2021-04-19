import React from 'react';

function EditCourse(props) {
	return (
		<div className='grey lighten-4  page-layout'>
			<div className='container'>
				<div className='center'>
					<h3 className='mt-0'>{props.type} Course</h3>
					<p>
						Important: You must be affiliated with a bootcamp to add to
						CampFinder
					</p>
				</div>

				<div className='row' style={{ margin: '1rem 0' }}>
					<div className='col l1 xl2'></div>
					<div className='col s12 l10 xl8'>
						<div className='card'>
							<div
								className='card-content'
								style={{ margin: '1rem 1.5rem' }}
							>
								<p className='flow-text'>Bootcamp Name</p>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='course_title' type='text' />
									<label htmlFor='course_title'>Course Title</label>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='course_duration' type='text' />
									<label htmlFor='course_duration'>
										Course Duration
									</label>
									<span className='helper-text'>
										Enter number of weeks course lasts
									</span>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '1.5rem' }}
								>
									<input id='course_tution' type='number' />
									<label htmlFor='course_tution'>Course Tution</label>
									<span className='helper-text'>Indian Currency</span>
								</div>

								<span className='grey-text'>
									Minimum Skills Required
								</span>
								<div
									className='input-field'
									style={{ marginBottom: '2rem' }}
								>
									<select
										id='minimum_skill'
										defaultValue={'0'}
										className='browser-default'
									>
										<option value='0' disabled>
											Choose your option
										</option>
										<option value='1'>Beginner (any)</option>
										<option value='2'>Intermediate</option>
										<option value='3'>Advanced</option>
									</select>
								</div>

								<div
									className='input-field'
									style={{ marginBottom: '2rem' }}
								>
									<span className='grey-text'>Description</span>
									<textarea
										className='text-area'
										id='description'
										placeholder={
											'Description (what you offer, details, etc)'
										}
									/>
									<span className='helper-text'>
										No More than 500 Characters
									</span>
								</div>
								<div
									className='input-feild'
									style={{ marginBottom: '2rem' }}
								>
									<label>
										<input type='checkbox' />
										<span>Scholarship Available</span>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className=' center'>
						<button className='btn submit-btn waves-effect cyan w-50'>
							{props.type} Course
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditCourse;
