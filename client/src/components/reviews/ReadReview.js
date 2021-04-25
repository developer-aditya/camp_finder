import React from 'react';

function ReadReview(props) {
	return (
		<div>
			<React.Fragment>
				<div className='card' key={props.element}>
					<p
						className='flow-text blue-grey darken-3 white-text'
						style={{ padding: '0.5rem 1.5rem' }}
					>
						Fantastic Bootcamp
					</p>
					<div className='card-content'>
						<p className='flow-text blue-grey-text'>
							Rating: <span className='green-text'>8</span>
						</p>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Commodi similique mollitia, praesentium, animi harum
							officia dolores corporis ex tempore consequuntur dolorem
							ullam dolorum magnam corrupti quaerat tempora repudiandae!
							Similique, molestiae. Iste, blanditiis recusandae unde
							tenetur eius exercitationem rerum a fuga.
						</p>
						<blockquote style={{ marginBottom: '0' }}>
							Written by Jack Adams
						</blockquote>
					</div>
				</div>
			</React.Fragment>
		</div>
	);
}

export default ReadReview;
