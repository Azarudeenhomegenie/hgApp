import { combineReducers } from "redux";
import hgReducer from "./hgReducer";
import errorReducers from "./errorReducers";
import authReducer from './authReducer';
import bookingsReducer from "./bookingsReducer";
import jobDetailReducer from "./jobDetailReducer";

export default combineReducers({
    hg:hgReducer,
    error:errorReducers,
    auth: authReducer,
    bookings: bookingsReducer,
    jobdetails: jobDetailReducer,
})