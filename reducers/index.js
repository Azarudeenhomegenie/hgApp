import { combineReducers } from "redux";
import hgReducer from "./hgReducer";
import errorReducers from "./errorReducers";
import authReducer from './authReducer';
import myBookingsReducer from "./myBookingsReducer";
import jobDetailReducer from "./jobDetailReducer";

export default combineReducers({
    hg: hgReducer,
    error: errorReducers,
    auth: authReducer,
    bookings: myBookingsReducer,
    jobdetails: jobDetailReducer,
})