import axios from 'axios';
import { REVIEWLOADING, GETREVIEWS, REVIEWERROR } from './types';

// Get Review by bootcamp Id
export const getReviews = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/${id}/reviews`,
			timeout: '4000',
		};
		const review = await axios(option);
		dispatch({ type: GETREVIEWS, payload: review.data.data });
	} catch (error) {
		dispatch({ type: REVIEWERROR, payload: error });
	}
};

// Post new Review by bootcamp Id
export const addReview = (id, newReview) => async (dispatch) => {
	try {
		const option = {
			method: 'POST',
			url: `/api/v1/bootcamps/${id}/reviews`,
			data: newReview,
			timeout: '4000',
		};
		const review = await axios(option);
		if (review.data.success === true) {
			console.log('Review Added Successfully');
		} else {
			console.log('Review Cannot be Added');
		}
	} catch (error) {
		dispatch({ type: REVIEWERROR, payload: error });
	}
};

// Setting loading values
export const setLoading = () => {
	return {
		type: REVIEWLOADING,
	};
};
