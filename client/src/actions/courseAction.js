import axios from 'axios';
import { SETLOADING, GETCOURSES, COURSEERROR } from './types';

// Get Course by bootcamp Id
export const getCourses = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/${id}/courses`,
			timeout: '4000',
		};
		const course = await axios(option);
		dispatch({ type: GETCOURSES, payload: course.data.data });
	} catch (error) {
		dispatch({ type: COURSEERROR, payload: error });
	}
};

// Setting loading values
export const setLoading = () => {
	return {
		type: SETLOADING,
	};
};
