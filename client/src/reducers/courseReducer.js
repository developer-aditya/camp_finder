import {
	COURSELOADING,
	GETCOURSES,
	GETENROLLEDCOURSES,
	COURSEERROR,
	DELETECOURSE,
	ADDCOURSE,
	UPDATECOURSE,
} from '../actions/types';

const initialState = {
	loading: false,
	courses: [],
	enrolledCourses: [],
	hash: {},
};

const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETCOURSES:
			return {
				...state,
				courses: action.payload,
				loading: false,
			};
		case GETENROLLEDCOURSES: {
			let newHash = {};
			for (let i = 0; i < action.payload.length; i++)
				newHash[action.payload[i].course._id] = 1;
			return {
				...state,
				enrolledCourses: action.payload,
				hash: newHash,
				loading: false,
			};
		}
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
				enrolledCourses: [],
				hash: {},
				loading: false,
			};
		default:
			return state;
	}
};

export default courseReducer;
