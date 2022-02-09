import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { init } from './reducers/authReducer';

const initialState = {

};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
);
console.log('DISSSSSPAAA');
store.dispatch(init());
store.subscribe(state => console.log(store.getState().auth));
export default store;