import axios from 'axios';
import {
	GETBOOTCAMP,
	SETLOADING,
	BOOTCAMPERROR,
	SETPARAMS,
	REMOVEPARAMS,
	SETCURRENT,
	CLEARCURRENT,
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
		dispatch({ type: BOOTCAMPERROR, payload: error });
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
				timeout: '4000',
			};
			const bootcamp = await axios(option);
			dispatch({ type: GETBOOTCAMP, payload: bootcamp.data });
		} catch (error) {
			dispatch({ type: BOOTCAMPERROR, payload: error });
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
		dispatch({ type: BOOTCAMPERROR, payload: error });
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
		dispatch({ type: BOOTCAMPERROR, payload: error });
	}
};

// delete Bootcamp
export const deleteBootcamp = (bootcampId) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const option = {
			method: 'DELETE',
			url: `/api/v1/bootcamps/${bootcampId}`,
			timeout: '4000',
		};
		await axios(option);
		dispatch({ type: CLEARCURRENT });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR, payload: error });
	}
};

// Put (upload) a new Bootcamp Image
export const uploadImage = (id, formdata) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: `/api/v1/bootcamps/${id}/photo`,
			headers: {
				'Content-type': 'image/jpeg',
			},
			data: formdata,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		console.log(bootcamp.data);
	} catch (error) {
		console.log(error);
	}
};

// Update Bootcamp
export const updateBootcamp = (bootcampId, Bootcamp) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: `/api/v1/bootcamps/${bootcampId}`,
			data: Bootcamp,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR, payload: error });
	}
};

// Add New Bootcamp
export const addBootcamp = (Bootcamp) => async (dispatch) => {
	try {
		const option = {
			method: 'POST',
			url: '/api/v1/bootcamps',
			data: Bootcamp,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: SETCURRENT, payload: bootcamp.data.data });
	} catch (error) {
		dispatch({ type: BOOTCAMPERROR, payload: error });
	}
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
