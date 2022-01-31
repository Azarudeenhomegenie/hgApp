import { combineReducers } from "redux";
import hgReducer from "./hgReducer";
import errorReducers from "./errorReducers";

export default combineReducers({
    hg:hgReducer,
    error:errorReducers
})