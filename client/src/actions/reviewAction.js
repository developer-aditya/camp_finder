import axios from 'axios';
import {
	REVIEWLOADING,
	GETREVIEWS,
	REVIEWERROR,
	DELETEREVIEW,
	SETCURRENTREVIEW,
	CLEARCURRENTREVIEW,
	UPDATEREVIEW,
} from './types';

// Get Review by bootcamp Id
export const getReviewOfBootcamp = (id) => async (dispatch) => {
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

// Get Reviews Of User
export const getReviewOfUser = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/reviews/me`,
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

// delete review
export const deleteReview = (id) => async (dispatch) => {
	try {
		const option = {
			method: 'DELETE',
			url: `/api/v1/reviews/${id}`,
			timeout: '4000',
		};
		await axios(option);
		dispatch({ type: DELETEREVIEW, payload: id });
	} catch (error) {
		console.log(error);
	}
};

// PUT Review by bootcamp Id
export const updateReview = (id, data) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: `/api/v1/reviews/${id}`,
			data,
			timeout: '4000',
		};
		const review = await axios(option);
		dispatch({ type: UPDATEREVIEW, payload: review.data.data });
	} catch (error) {
		console.log(error);
	}
};

// Set Current Review To be Edited
export const setCurrentReview = (review) => async (dispatch) => {
	dispatch({ type: SETCURRENTREVIEW, payload: review });
};

// Clear Current Review After Edit
export const clearCurrentReview = () => async (dispatch) => {
	dispatch({ type: CLEARCURRENTREVIEW });
};

// Setting loading values
export const setLoading = () => {
	return {
		type: REVIEWLOADING,
	};
};
