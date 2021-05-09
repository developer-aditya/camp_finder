import {
	GETBOOTCAMP,
	SETLOADING,
	BOOTCAMPERROR,
	SETPARAMS,
	REMOVEPARAMS,
} from '../actions/types';

const initialState = {
	loading: false,
	bootcamps: [],
	error: null,
	pagination: {},
	params: null,
};

const bootcampReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETBOOTCAMP:
			return {
				...state,
				bootcamps: action.payload.data,
				pagination: action.payload.pagination,
				error: null,
			};
		case SETLOADING:
			return {
				...state,
				loading: action.payload,
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
				error: action.payload,
			};
		default:
			return state;
	}
};

export default bootcampReducer;
