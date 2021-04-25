import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/indexReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialAppLevelState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialAppLevelState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
