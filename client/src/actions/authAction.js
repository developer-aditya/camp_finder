import axios from 'axios';
import {
	USER_LOADING,
	LOGIN_SUCCESS,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	UPDATEUSER,
} from './types';

export const userLogin = (userCredentials) => async (dispatch) => {
	try {
		dispatch(userLoading());
		const option = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			url: '/api/v1/auth/login',
			data: userCredentials,
			timeout: '4000',
		};
		const user = await axios(option);
		dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL });
		return Promise.reject(error);
	}
};

export const userRegister = (userDetails) => async (dispatch) => {
	try {
		dispatch(userLoading);
		const option = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			url: '/api/v1/auth/register',
			data: userDetails,
			timeout: '4000',
		};
		const user = await axios(option);
		dispatch({ type: REGISTER_SUCCESS, payload: user.data.user });
	} catch (error) {
		dispatch({ type: REGISTER_FAIL });
		return Promise.reject(error);
	}
};

export const userLogout = () => async (dispatch) => {
	dispatch(userLoading);
	const option = {
		method: 'GET',
		url: '/api/v1/auth/logout',
		timeout: '4000',
	};
	await axios(option);
	dispatch({ type: LOGOUT_SUCCESS });
};

export const userGet = () => async (dispatch) => {
	try {
		dispatch(userLoading());
		const option = {
			method: 'GET',
			url: '/api/v1/auth/me',
			timeout: '4000',
		};
		const user = await axios(option);
		dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const resetPasswordLinkRequest = (email) => async (dispatch) => {
	const option = {
		method: 'POST',
		header: {
			'Content-Type': 'application/json',
		},
		url: '/api/v1/auth/forgotpassword',
		data: email,
		timeout: '4000',
	};
	await axios(option);
};

export const resetPassword = (password, resetToken) => async (dispatch) => {
	const option = {
		method: 'PUT',
		header: {
			'Content-Type': 'application/json',
		},
		url: `/api/v1/auth/resetpassword/${resetToken}`,
		data: password,
		timeout: '4000',
	};
	const user = await axios(option);
	dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
};

export const updatePassword = (password) => async (dispatch) => {
	const option = {
		method: 'PUT',
		header: {
			'Content-Type': 'application/json',
		},
		url: '/api/v1/auth/updatepassword',
		data: password,
		timeout: '4000',
	};
	await axios(option);
};

export const updateAccount = (update) => async (dispatch) => {
	const option = {
		method: 'PUT',
		header: {
			'Content-Type': 'application/json',
		},
		url: '/api/v1/auth/updateuser',
		data: update,
		timeout: '4000',
	};
	const user = await axios(option);
	const { name, email, role } = user.data.data;
	dispatch({ type: UPDATEUSER, payload: { name, email, role } });
};

// Setting loading values
export const userLoading = () => {
	return {
		type: USER_LOADING,
	};
};
