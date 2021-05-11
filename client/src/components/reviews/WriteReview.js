import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewAction';
import { setCurrentBootcamp } from '../../actions/bootcampAction';

const WriteReview = ({ id, addReview, setCurrentBootcamp }) => {
	const [rating, setRating] = useState('1');
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const submit = (e) => {
		if (title === '' || text === '') {
			console.log('Please Enter Title and Review');
		} else {
			addReview(id, { title, text, rating });
			setTitle('');
			setText('');
			setRating('1');
		}
		e.preventDefault();
	};

	return (
		<div className='row'>
			<div className='col s12 l10'>
				<div className='card'>
					<div
						className='card-title blue-grey lighten-1 white-text'
						style={{ padding: '0.75rem 1.5rem' }}
					>
						Submit Your Review
					</div>
					<div className='card-content blue-grey-text'>
						<p>
							Attention! You must have attended and graduated this
							bootcamp to review
						</p>
						<form style={{ padding: '1rem 2rem' }}>
							<p>
								Rating:{' '}
								<span className='light-blue-text'>{rating}</span>
							</p>
							<div className='input-feild'>
								<input
									type='range'
									min='1'
									max='10'
									step='1'
									id='rating'
									value={rating}
									onChange={(e) => setRating(e.target.value)}
								/>
							</div>

							<div className='input-feild'>
								<label htmlFor='title'>Review title</label>
								<input
									type='text'
									name='title'
									id='title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							<div
								className='input-feild'
								style={{ marginTop: '1.5rem' }}
							>
								<label htmlFor='review'>Your review</label>
								<textarea
									name='review'
									id='review'
									className='materialize-textarea'
									value={text}
									onChange={(e) => setText(e.target.value)}
								></textarea>
							</div>

							<div className='input-feild'>
								<button
									className='btn waves-effect light-blue submit-btn'
									name='action'
									onClick={submit}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { addReview, setCurrentBootcamp })(WriteReview);
