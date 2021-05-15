import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
	addReview,
	clearCurrentReview,
	updateReview,
} from '../../actions/reviewAction';

import M from '../../../node_modules/materialize-css/dist/js/materialize.min';

const WriteReview = ({
	operation,
	data,
	addReview,
	clearCurrentReview,
	updateReview,
	current,
}) => {
	const [rating, setRating] = useState('1');
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		if (operation === 'edit' && current !== null) {
			setRating(current.rating);
			setTitle(current.title);
			setText(current.text);
			document.getElementById('review-submit').disabled = false;
		} else if (operation === 'edit' && current === null) {
			document.getElementById('review-submit').disabled = true;
			setTitle('');
			setText('');
			setRating('1');
		}
		//eslint-disable-next-line
	}, [current]);

	const submit = (e) => {
		e.preventDefault();
		if (title === '' || text === '') {
			M.toast({
				html: 'Please Enter Title and Review',
			});
		} else if (operation === 'add') {
			addReview(data, { title, text, rating })
				.then((res) => {
					M.toast({
						html: "You've Successfully Reviewed This Bootcamp",
					});
					setTitle('');
					setText('');
					setRating('1');
				})
				.catch((error) => {
					M.toast({
						html: `${error.response.status} ${
							error.response.data.error || 'Internal Server Error'
						}`,
					});
				});
		} else if (operation === 'edit') {
			updateReview(current._id, { title, text, rating })
				.then((res) => {
					M.toast({
						html: "You've Successfully Edited Your Review ",
					});
					setTitle('');
					setText('');
					setRating('1');
					clearCurrentReview();
				})
				.catch((error) => {
					M.toast({
						html: `${error.response.status} ${
							error.response.data.error || 'Internal Server Error'
						}`,
					});
				});
		}
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
									id='review-submit'
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

const mapStateToProps = (state) => ({ current: state.review.currentReview });

export default connect(mapStateToProps, {
	addReview,
	clearCurrentReview,
	updateReview,
})(WriteReview);
