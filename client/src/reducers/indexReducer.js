import { combineReducers } from 'redux';
import bootcampReducer from './bootcampReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	bootcamp: bootcampReducer,
	auth: authReducer,
});

export default rootReducer;
