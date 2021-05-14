import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { uploadImage, deleteBootcamp } from '../../actions/bootcampAction';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const ManageBootcampDetail = ({ current, uploadImage, deleteBootcamp }) => {
	const submit = (e) => {
		const imgInput = document.getElementById('img-input');
		const file = imgInput.files[0];

		if (!file || !file.type.match(/image.*/)) {
			M.toast({
				html: 'Please Select An Image File',
			});
		} else {
			const fd = new FormData();
			fd.append('file', file);
			uploadImage(current.id, fd)
				.then((res) =>
					M.toast({
						html: "You've Successfully Updated Bootcamp Photo, Reload the Page ",
					}),
				)
				.catch((error) => {
					M.toast({
						html: `${error.response.status} Error! ${
							error.response.data.error || 'Internal Server Error'
						}`,
					});
				});
		}
		e.preventDefault();
	};

	const deleteBootcampFunc = (id) => {
		deleteBootcamp(id)
			.then((res) =>
				M.toast({
					html: "You've Successfully Deleted Your Bootcamp ",
				}),
			)
			.catch((error) => {
				M.toast({
					html: `${error.response.status} Error! ${
						error.response.data.error || 'Internal Server Error'
					}`,
				});
			});
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
					<button
						className='btn-floating btn-large halfway-fab waves-effect red darken-3 '
						onClick={(e) => deleteBootcampFunc(current.id)}
					>
						<i className='fas fa-trash-alt'></i>
					</button>
					<Link
						to={{
							pathname: '/manageBootcamp/bootcampForm',
							state: {
								operation: 'edit',
								current,
							},
						}}
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
							{current.averageRating === null
								? 'UR'
								: current.averageRating}
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

export default connect(null, { uploadImage, deleteBootcamp })(
	ManageBootcampDetail,
);
