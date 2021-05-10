import { combineReducers } from 'redux';
import bootcampReducer from './bootcampReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
	bootcamp: bootcampReducer,
	course: courseReducer,
	auth: authReducer,
	review: reviewReducer,
});

export default rootReducer;
