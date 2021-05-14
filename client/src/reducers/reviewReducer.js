import {
	REVIEWLOADING,
	GETREVIEWS,
	REVIEWERROR,
	DELETEREVIEW,
	SETCURRENTREVIEW,
	CLEARCURRENTREVIEW,
	UPDATEREVIEW,
	ADDREVIEW,
} from '../actions/types';

const initialState = {
	loading: false,
	reviews: null,
	currentReview: null,
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETREVIEWS:
			return {
				...state,
				reviews: action.payload,
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

				loading: false,
			};
		case UPDATEREVIEW:
			return {
				...state,
				reviews: state.reviews.map((review) =>
					review._id === action.payload._id ? action.payload : review,
				),

				loading: false,
			};
		case ADDREVIEW:
			return {
				...state,
				reviews: [...state.reviews, action.payload],
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
				reviews: null,
				loading: false,
			};
		default:
			return state;
	}
};

export default reviewReducer;
