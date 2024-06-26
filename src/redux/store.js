import { createStore, combineReducers } from 'redux';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
  students: studentReducer
});

const store = createStore(rootReducer);

export default store;
