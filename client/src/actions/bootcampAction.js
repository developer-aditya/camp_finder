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
export const getDistanceBootcamp = (query, distance, pincode) => async (
	dispatch,
) => {
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

export const setParams = (distance, pincode) => async (dispatch) => {
	dispatch({ type: SETPARAMS, payload: { distance, pincode } });
};

export const removeParams = () => async (dispatch) => {
	dispatch({ type: REMOVEPARAMS });
};

export const setCurrentBootcamp = (bootcampId) => async (dispatch) => {
	try {
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

export const clearCurrent = () => async (dispatch) => {
	try {
		dispatch({ type: CLEARCURRENT });
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
