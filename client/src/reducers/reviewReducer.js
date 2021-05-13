import {
	REVIEWLOADING,
	GETREVIEWS,
	REVIEWERROR,
	DELETEREVIEW,
	SETCURRENTREVIEW,
	CLEARCURRENTREVIEW,
	UPDATEREVIEW,
} from '../actions/types';

const initialState = {
	loading: false,
	reviews: null,
	error: null,
	currentReview: null,
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
		case DELETEREVIEW:
			return {
				...state,
				reviews: state.reviews.filter(
					(review) => review._id !== action.payload,
				),
				currentReview:
					state.currentReview &&
					(state.currentReview._id === action.payload
						? null
						: state.currentReview),
				error: null,
				loading: false,
			};
		case UPDATEREVIEW:
			return {
				...state,
				reviews: state.reviews.map((review) =>
					review._id === action.payload._id ? action.payload : review,
				),
				error: null,
				loading: false,
			};
		case REVIEWLOADING:
			return {
				...state,
				loading: true,
			};
		case SETCURRENTREVIEW:
			return {
				...state,
				currentReview: action.payload,
			};
		case CLEARCURRENTREVIEW:
			return {
				...state,
				currentReview: null,
			};
		case REVIEWERROR:
			return {
				...state,
				review: null,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default reviewReducer;
