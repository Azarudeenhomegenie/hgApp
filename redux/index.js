import { configureStore } from '@reduxjs/toolkit'
import { client } from '../api/client';
import { loadState, saveState } from '../helpers/localStorage'

import rootReducer from './reducers'

// const user = await loadState();
// const preloadedState = { user };
const store = configureStore({ reducer: rootReducer });

store.subscribe(() => {
    const state = store.getState();
    // console.log(state.user, 'test');
    // if (state.action.indexOf('user') !== -1) {
        saveState(state.user);
    // }
});
// console.log('Storeee')

export default store
