import { REVIEWLOADING, GETREVIEWS, REVIEWERROR } from '../actions/types';

const initialState = {
	loading: false,
	reviews: [],
	error: null,
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETREVIEWS:
			return {
				...state,
				reviews: action.payload,
				error: null,
				loading: false,
			};
		case REVIEWLOADING:
			return {
				...state,
				loading: true,
			};
		case REVIEWERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default reviewReducer;
