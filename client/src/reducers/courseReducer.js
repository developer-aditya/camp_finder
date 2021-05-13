import {
	COURSELOADING,
	GETCOURSES,
	COURSEERROR,
	DELETECOURSE,
	ADDCOURSE,
	UPDATECOURSE,
} from '../actions/types';

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
		case DELETECOURSE:
			return {
				...state,
				courses: state.courses.filter(
					(element) => element._id !== action.payload,
				),
				error: null,
				loading: false,
			};
		case ADDCOURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
				error: null,
				loading: false,
			};

		case UPDATECOURSE:
			return {
				...state,
				courses: state.courses.map((course) =>
					course._id === action.payload._id ? action.payload : course,
				),
				error: null,
				loading: false,
			};
		case COURSELOADING:
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
