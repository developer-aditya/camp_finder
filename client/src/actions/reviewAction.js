import axios from 'axios';
import { SETLOADING, GETREVIEWS, REVIEWERROR } from './types';

// Get Course by bootcamp Id
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

// Setting loading values
export const setLoading = () => {
	return {
		type: SETLOADING,
	};
};
