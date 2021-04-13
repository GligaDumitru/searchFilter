import { combineReducers } from 'redux';
import mainReducer from './reducers/main';

const rootReducer = combineReducers({
  main: mainReducer,
});

export default rootReducer;
