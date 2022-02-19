import { combineReducers } from "redux";
import hgReducer from "./hgReducer";
import errorReducers from "./errorReducers";
import authReducer from './authReducer';
import bookingsReducer from "./bookingsReducer";
import jobReducer from "./jobReducer";

export default combineReducers({
    hg:hgReducer,
    error:errorReducers,
    auth: authReducer,
    bookings: bookingsReducer,
    jobs: jobReducer,
})