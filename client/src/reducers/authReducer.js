import {
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	UPDATEUSER,
} from '../actions/types';

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case UPDATEUSER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
