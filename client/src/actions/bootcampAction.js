import axios from 'axios';
import {
	GETBOOTCAMP,
	SETLOADING,
	BOOTCAMPERROR,
	SETPARAMS,
	REMOVEPARAMS,
	SETCURRENT,
	CLEARCURRENT,
	GETENROLLEDUSERS,
} from './types';

// Get Bootcamp by query
export const getAllBootcamp = (query) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: '/api/v1/bootcamps?' + query,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: GETBOOTCAMP, payload: bootcamp.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR });
		return Promise.reject(error);
	}
};

// Get all Enrolled Users
export const getEnrolledUsers = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/enrolled`,
			timeout: '4000',
		};
		const user = await axios(option);
		dispatch({ type: GETENROLLEDUSERS, payload: user.data.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR });
		return Promise.reject(error);
	}
};

// Get Bootcamp by radius
export const getDistanceBootcamp =
	(query, distance, pincode) => async (dispatch) => {
		try {
			dispatch(setLoading());
			const option = {
				method: 'GET',
				url: `/api/v1/bootcamps/radius/${pincode}/${distance}?` + query,
				timeout: '10000',
			};
			const bootcamp = await axios(option);
			dispatch({ type: GETBOOTCAMP, payload: bootcamp.data });
		} catch (error) {
			dispatch({ type: BOOTCAMPERROR });
			return Promise.reject(error);
		}
	};

// Set Searching Distance & Pincode in State
export const setParams = (distance, pincode) => async (dispatch) => {
	dispatch({ type: SETPARAMS, payload: { distance, pincode } });
};

// Clear Searching Distance & Pincode in State
export const removeParams = () => async (dispatch) => {
	dispatch({ type: REMOVEPARAMS });
};

// Set Current Bootcamp Selected to Be viewed
export const setCurrentBootcamp = (bootcampId) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/${bootcampId}`,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR });
	}
};

// Get Bootcamp Of logged in User and Set Current
export const getUserBootcamp = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/me`,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR });
		return Promise.reject(error);
	}
};

// delete Bootcamp
export const deleteBootcamp = (bootcampId) => async (dispatch) => {
	const option = {
		method: 'DELETE',
		url: `/api/v1/bootcamps/${bootcampId}`,
		timeout: '4000',
	};
	await axios(option);
	dispatch({ type: CLEARCURRENT });
};

// Put (upload) a new Bootcamp Image
export const uploadImage = (id, formdata) => async (dispatch) => {
	const option = {
		method: 'PUT',
		headers: {
			'Content-type': 'image/jpeg',
		},
		url: `/api/v1/bootcamps/${id}/photo`,
		data: formdata,
		timeout: '4000',
	};
	await axios(option);
};

// Update Bootcamp
export const updateBootcamp = (bootcampId, Bootcamp) => async (dispatch) => {
	const option = {
		method: 'PUT',
		header: {
			'Content-Type': 'application/json',
		},
		url: `/api/v1/bootcamps/${bootcampId}`,
		data: Bootcamp,
		timeout: '4000',
	};
	const bootcamp = await axios(option);
	dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
};

// Add New Bootcamp
export const addBootcamp = (Bootcamp) => async (dispatch) => {
	const option = {
		method: 'POST',
		header: {
			'Content-Type': 'application/json',
		},
		url: '/api/v1/bootcamps',
		data: Bootcamp,
		timeout: '4000',
	};
	const bootcamp = await axios(option);
	dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
};

// Setting loading values
export const setLoading = () => {
	return {
		type: SETLOADING,
	};
};

// Clear Current Bootcamp in Bootcamp State
export const clearCurrent = () => async (dispatch) => {
	dispatch({ type: CLEARCURRENT });
};
