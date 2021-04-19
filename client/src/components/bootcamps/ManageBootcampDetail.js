import React from 'react';
import { Link } from 'react-router-dom';

function ManageBootcampDetail() {
	return (
		<React.Fragment>
			<div className='card'>
				<div className='img-block card-image'>
					<div className='upload-img-block valign-wrapper'>
						<form style={{ margin: 'auto' }}>
							<div className='file-field input-field'>
								<span className='flow-text valign-wrapper'>
									<i
										className='far fa-user-circle fa-2x'
										style={{ marginRight: '1rem' }}
									></i>
									Upload Image
								</span>
								<input type='file' id='img' />
							</div>
						</form>
					</div>

					<img
						src='https://source.unsplash.com/user/erondu/1600x900'
						alt='camp-img'
					/>
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
						<Link to='/singleBootcamp'>Devworks Bootcamp</Link>
						<span
							className='cyan circle right white-text'
							style={{ padding: '0.5rem', marginLeft: '1rem' }}
						>
							8.8
						</span>
					</h5>
					<p className='blue-grey-text'>Boston, MA</p>
					<ul className='collection'>
						<li className='collection-item'>Web Development</li>
						<li className='collection-item'>UI/UX</li>
						<li className='collection-item'>Mobile Development</li>
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
}

export default ManageBootcampDetail;
