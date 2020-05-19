// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import treatmentReducer from './treatmentReducer';


// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  treatmentReducer: treatmentReducer
});

// Exports
export default rootReducer;