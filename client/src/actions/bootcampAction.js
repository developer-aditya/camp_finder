import axios from 'axios';
import {
	GETBOOTCAMP,
	SETLOADING,
	SETERROR,
	SETPARAMS,
	REMOVEPARAMS,
} from './types';

// Get Bootcamp by query
export const getAllBootcamp = (query) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const option = {
			method: 'GET',
			url: '/api/v1/bootcamps?' + query,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: GETBOOTCAMP, payload: bootcamp.data });
		dispatch(setLoading(false));
	} catch (error) {
		dispatch({ type: SETERROR, payload: error });
		dispatch(setLoading(false));
	}
};

// Get Bootcamp by radius
export const getDistanceBootcamp = (query, distance, pincode) => async (
	dispatch,
) => {
	try {
		dispatch(setLoading(true));
		const option = {
			method: 'GET',
			url: `/api/v1/bootcamps/radius/${pincode}/${distance}?` + query,
			timeout: '4000',
		};
		const bootcamp = await axios(option);
		dispatch({ type: GETBOOTCAMP, payload: bootcamp.data });
		dispatch(setLoading(false));
	} catch (error) {
		dispatch({ type: SETERROR, payload: error });
		dispatch(setLoading(false));
	}
};

export const setParams = (distance, pincode) => async (dispatch) => {
	dispatch({ type: SETPARAMS, payload: { distance, pincode } });
};

export const removeParams = () => async (dispatch) => {
	dispatch({ type: REMOVEPARAMS });
};

// Setting loading values
export const setLoading = (check) => {
	return {
		type: SETLOADING,
		payload: check,
	};
};
