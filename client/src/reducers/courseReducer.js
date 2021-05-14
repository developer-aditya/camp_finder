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
};

const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETCOURSES:
			return {
				...state,
				courses: action.payload,

				loading: false,
			};
		case DELETECOURSE:
			return {
				...state,
				courses: state.courses.filter(
					(element) => element._id !== action.payload,
				),

				loading: false,
			};
		case ADDCOURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],

				loading: false,
			};

		case UPDATECOURSE:
			return {
				...state,
				courses: state.courses.map((course) =>
					course._id === action.payload._id ? action.payload : course,
				),

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
				courses: [],
				loading: false,
			};
		default:
			return state;
	}
};

export default courseReducer;
