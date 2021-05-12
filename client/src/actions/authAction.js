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
			url: '/api/v1/auth/login',
			data: userCredentials,
			timeout: '4000',
		};
		const user = await axios(option);
		if (user.data.success === true) {
			dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
		} else {
			dispatch({ type: LOGIN_FAIL });
		}
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const userRegister = (userDetails) => async (dispatch) => {
	try {
		dispatch(userLoading);
		const option = {
			method: 'POST',
			url: '/api/v1/auth/register',
			data: userDetails,
			timeout: '4000',
		};
		const user = await axios(option);
		if (user.data.success === true) {
			dispatch({ type: REGISTER_SUCCESS, payload: user.data.user });
		} else {
			dispatch({ type: REGISTER_FAIL });
		}
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const userLogout = () => async (dispatch) => {
	try {
		dispatch(userLoading);
		const option = {
			method: 'GET',
			url: '/api/v1/auth/logout',
			timeout: '4000',
		};
		await axios(option);
		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
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
		if (user.data.success === true) {
			dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
		} else {
			dispatch({ type: LOGIN_FAIL });
		}
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const resetPasswordLinkRequest = (email) => async (dispatch) => {
	try {
		const option = {
			method: 'POST',
			url: '/api/v1/auth/forgotpassword',
			data: email,
			timeout: '4000',
		};
		const user = await axios(option);
		if (user.data.success === true) {
			console.log(user.data.msg);
		} else {
			console.log(user.data.error);
		}
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const resetPassword = (password, resetToken) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: `/api/v1/auth/resetpassword/${resetToken}`,
			data: password,
			timeout: '4000',
		};
		const user = await axios(option);
		if (user.data.success === true) {
			dispatch({ type: LOGIN_SUCCESS, payload: user.data.user });
		} else {
			console.log(user.data.error);
			dispatch({ type: LOGIN_FAIL });
		}
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const updatePassword = (password) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: '/api/v1/auth/updatepassword',
			data: password,
			timeout: '4000',
		};
		const user = await axios(option);
		console.log(user.data.msg);
	} catch (error) {
		console.log(error);
	}
};

export const updateAccount = (update) => async (dispatch) => {
	try {
		const option = {
			method: 'PUT',
			url: '/api/v1/auth/updateuser',
			data: update,
			timeout: '4000',
		};
		const user = await axios(option);
		const { name, email, role } = user.data.data;
		dispatch({ type: UPDATEUSER, payload: { name, email, role } });
	} catch (error) {
		console.log(error);
	}
};

// Setting loading values
export const userLoading = () => {
	return {
		type: USER_LOADING,
	};
};
