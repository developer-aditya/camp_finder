import { SETLOADING, GETCOURSES, COURSEERROR } from '../actions/types';

const initialState = {
	loading: false,
	courses: [],
	error: null,
};

const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETCOURSES:
			return {
				...state,
				courses: action.payload,
				error: null,
				loading: false,
			};
		case SETLOADING:
			return {
				...state,
				loading: true,
			};
		case COURSEERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default courseReducer;
