import React from 'react';
import { Link } from 'react-router-dom';

function SidebarSingle() {
	return (
		<React.Fragment>
			<img
				width='100%'
				src='https://source.unsplash.com/user/erondu/1600x900'
				class='materialboxed'
				alt='bootcamp-img'
			/>
			<div className='card blue-grey darken-3 white-text center-align'>
				<div className='card-content'>
					<p className='flow-text'>
						Average Rating
						<span
							className='cyan circle'
							style={{ padding: '0.75rem', marginLeft: '1rem' }}
						>
							8.8
						</span>
					</p>

					<div style={{ padding: '2rem 1rem' }}>
						<Link
							to='/singleBootcamp/readReview'
							className='btn waves-effect blue-grey lighten-1 white-text'
							style={sideBtn}
						>
							<i class='far fa-comments'></i> Read Reviews
						</Link>
						{/* Show only for normal users not even publisher */}
						<Link
							to='/singleBootcamp/writeReview'
							className='btn waves-effect blue-grey lighten-5 blue-grey-text modal-trigger'
							style={sideBtn}
						>
							<i class='fas fa-pen'></i> Write A Review
						</Link>
						<a
							href='#website'
							className='btn waves-effect cyan white-text '
							style={sideBtn}
						>
							<i class='fas fa-globe'></i> Visit Website
						</a>
					</div>
				</div>
			</div>
			<div className='card '>
				<div className='card-content'>
					<ul class='collection with-header'>
						<li class='collection-header center blue-grey-text'>
							<p className='flow-text'>Features</p>
						</li>
						<li class='collection-item'>
							Housing{' '}
							<span className='secondary-content'>
								<i class='fas fa-check'></i>
							</span>
						</li>
						<li class='collection-item'>
							Job Assistance{' '}
							<span className='secondary-content'>
								<i class='fas fa-check'></i>
							</span>
						</li>
						<li class='collection-item'>
							Job Guarantee{' '}
							<span className='secondary-content'>
								<i class='fas fa-times red-text'></i>
							</span>
						</li>
						<li class='collection-item'>
							Accepts GI Bill{' '}
							<span className='secondary-content'>
								<i class='fas fa-times red-text'></i>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
}

const sideBtn = {
	width: '100%',
	marginBottom: '1rem',
	textTransform: 'capitalize',
	fontSize: '1.1rem',
	height: '3.25rem',
	lineHeight: '48px',
};

export default SidebarSingle;
