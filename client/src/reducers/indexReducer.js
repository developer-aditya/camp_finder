import { combineReducers } from 'redux';
import bootcampReducer from './bootcampReducer';

const rootReducer = combineReducers({
	bootcamp: bootcampReducer,
});

export default rootReducer;
