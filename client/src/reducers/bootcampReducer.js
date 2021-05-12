import {
	GETBOOTCAMP,
	SETLOADING,
	BOOTCAMPERROR,
	SETPARAMS,
	REMOVEPARAMS,
	SETCURRENT,
	CLEARCURRENT,
} from '../actions/types';

const initialState = {
	loading: false,
	bootcamps: [],
	error: null,
	pagination: {},
	params: null,
	currentBootcamp: null,
};

const bootcampReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETBOOTCAMP:
			return {
				...state,
				bootcamps: action.payload.data,
				pagination: action.payload.pagination,
				error: null,
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
				error: action.payload,
				loading: false,
				currentBootcamp: null,
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
