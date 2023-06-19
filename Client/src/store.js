import { configureStore, combineReducers } from 'redux';
import matchesReducer from './reducers/matchesReducer';
import matchReducer from './reducers/matchReducer';

const rootReducer = combineReducers({
    matches: matchesReducer,
    match: matchReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer
  });
  
  export default store;