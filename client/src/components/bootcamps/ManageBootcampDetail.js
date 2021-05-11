import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { uploadImage } from '../../actions/bootcampAction';

const ManageBootcampDetail = ({ current, uploadImage }) => {
	const submit = (e) => {
		const imgInput = document.getElementById('img-input');
		const file = imgInput.files[0];

		if (!file || !file.type.match(/image.*/)) {
			console.log('Please Select An Image File');
		} else {
			const fd = new FormData();
			fd.append('file', file);
			uploadImage(current.id, fd);
		}
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<div className='card'>
				<div className='img-block card-image'>
					<div className='upload-img-block valign-wrapper'>
						<form
							id='uploadImg'
							onSubmit={submit}
							style={{ margin: 'auto' }}
						>
							<div className='input-field file-field'>
								<span className='flow-text valign-wrapper'>
									<i
										className='far fa-user-circle fa-2x'
										style={{ marginRight: '1rem' }}
									></i>
									Upload Image
								</span>
								<input type='file' id='img-input' accept='image/*' />
							</div>
							<div className='input-field center'>
								<button
									className='btn light-blue'
									type='submit'
									form='uploadImg'
								>
									Submit
								</button>
							</div>
						</form>
					</div>

					<img src={`/uploads/${current.photo}`} alt='camp-img' />
					<a
						href='#d'
						className='btn-floating btn-large halfway-fab waves-effect red darken-3 '
					>
						<i className='fas fa-trash-alt'></i>
					</a>
					<Link
						to='/manageBootcamp/editBootcamp'
						className='btn-floating btn-large halfway-fab waves-effect blue-grey darken-3'
						style={{ marginRight: '3.1rem' }}
					>
						<i className='fas fa-pen'></i>
					</Link>
				</div>
				<div className='card-content'>
					<h5 className='card-title'>
						<Link to='/singleBootcamp'>{current.name}</Link>
						<span className='light-blue right white-text valign-wrapper rating'>
							{current.averageRating}
						</span>
					</h5>
					<p className='blue-grey-text'>
						{current.location.city}, {current.location.country}
					</p>
					<ul className='collection' style={{ marginTop: '1.5rem' }}>
						{current.careers.map((career, index) => (
							<li className='collection-item' key={index}>
								{career}
							</li>
						))}
					</ul>
					<p className='grey-text'>
						* You can only add one bootcamp per account.
					</p>
					<p className='grey-text'>
						* You must be affiliated with the bootcamp in some way in
						order to add it to CampFinder.
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default connect(null, { uploadImage })(ManageBootcampDetail);
