import React from 'react';
import WriteReview from './WriteReview';

function ManageReview() {
	return (
		<div className='grey lighten-4 page-layout'>
			<div className='row'>
				<div className='col s12 l4'>
					<div className='card'>
						<div className='card-content'>
							<h4
								className='blue-grey-text center'
								style={{ marginTop: '0' }}
							>
								Your Reviews
							</h4>
							<ul className='collection'>
								<li
									className='collection-item'
									style={{
										fontSize: '1.5rem',
									}}
								>
									Alvin
									<div className='secondary-content'>
										<a href='#editReview' className='blue-grey-text'>
											<i className='fas fa-pen'></i>
										</a>
										<a
											href='#d'
											className='red-text'
											style={{ marginLeft: '0.5rem' }}
										>
											<i className='fas fa-trash'></i>
										</a>
									</div>
								</li>
							</ul>
						</div>
						<div className='card-action'>
							<a href='#delete' className='btn red darken-2'>
								<i class='fas fa-minus-circle'></i> Delete All Reviews
							</a>
						</div>
					</div>
				</div>
				<div className='col s12 l8'>
					<div className='container'>
						<WriteReview />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageReview;
