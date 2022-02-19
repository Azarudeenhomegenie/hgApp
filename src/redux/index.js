import { configureStore } from '@reduxjs/toolkit';
import { saveState } from '@helpers/localStorage';
import { loadLocalData } from './reducers/userSlice';
import rootReducer from './reducers';

// const user = await loadState();
// const preloadedState = { user };
const store = configureStore({ reducer: rootReducer });
store.dispatch(loadLocalData);
store.subscribe(() => {
  const state = store.getState();
  // console.log(state.user, 'test');
  // if (state.action.indexOf('user') !== -1) {
  saveState(state.user);
  // }
});

export default store;
