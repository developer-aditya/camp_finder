import axios from 'axios';
import {
	COURSELOADING,
	GETCOURSES,
	COURSEERROR,
	DELETECOURSE,
	ADDCOURSE,
	UPDATECOURSE,
} from './types';

// Get all Course by bootcamp Id
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

// Delete Course By Course Id
export const deleteCourse = (id) => async (dispatch) => {
	try {
		const option = {
			method: 'DELETE',
			url: `/api/v1/courses/${id}`,
			timeout: '4000',
		};
		await axios(option);
		dispatch({ type: DELETECOURSE, payload: id });
	} catch (error) {
		dispatch({ type: COURSEERROR, payload: error });
	}
};

// Update Course By Course Id
export const updateCourse = (id, course) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: `/api/v1/courses/${id}`,
			data: course,
			timeout: '4000',
		};
		const courseRes = await axios(option);
		dispatch({ type: UPDATECOURSE, payload: courseRes.data.data });
	} catch (error) {
		dispatch({ type: COURSEERROR, payload: error });
	}
};

// Add course to Bootcamp
export const addCourse = (id, course) => async (dispatch) => {
	try {
		const option = {
			method: 'POST',
			url: `/api/v1/bootcamps/${id}/courses`,
			data: course,
			timeout: '4000',
		};
		const courseRes = await axios(option);
		dispatch({ type: ADDCOURSE, payload: courseRes.data.data });
	} catch (error) {
		dispatch({ type: COURSEERROR, payload: error });
	}
};

// Setting loading values
export const setLoading = () => {
	return {
		type: COURSELOADING,
	};
};
