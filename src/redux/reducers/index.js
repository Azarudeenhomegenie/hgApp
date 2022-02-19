import { combineReducers } from 'redux';

import userReducer from './userSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

export default rootReducer;
