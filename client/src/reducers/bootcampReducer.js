import {
	GETBOOTCAMP,
	SETLOADING,
	BOOTCAMPERROR,
	SETPARAMS,
	REMOVEPARAMS,
	SETCURRENT,
	CLEARCURRENT,
	GETENROLLEDUSERS,
} from '../actions/types';

const initialState = {
	loading: false,
	bootcamps: [],
	pagination: {},
	params: null,
	currentBootcamp: null,
	enrolledUsers: [],
};

const bootcampReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETBOOTCAMP:
			return {
				...state,
				bootcamps: action.payload.data,
				pagination: action.payload.pagination,
				loading: false,
			};
		case GETENROLLEDUSERS:
			return {
				...state,
				enrolledUsers: action.payload,
				loading: false,
			};
		case SETLOADING:
			return {
				...state,
				loading: true,
			};
		case SETPARAMS:
			return {
				...state,
				params: action.payload,
			};
		case REMOVEPARAMS:
			return {
				...state,
				params: null,
			};
		case BOOTCAMPERROR:
			return {
				...state,
				loading: false,
				currentBootcamp: null,
				bootcamps: [],
				enrolledUsers: [],
			};
		case SETCURRENT:
			return {
				...state,
				loading: false,
				currentBootcamp: action.payload,
			};
		case CLEARCURRENT:
			return {
				...state,
				currentBootcamp: null,
				loading: false,
			};
		default:
			return state;
	}
};

export default bootcampReducer;
