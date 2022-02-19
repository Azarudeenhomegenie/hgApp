import { GET_CUSTOMER_DETAILS, GET_LOGIN, GET_OFFERS, GET_POPULAR_SERVICE, REGISTER_VIA_PHONE, VERIFY_OTP, GET_ERROR, GET_CITY, GET_SEARCH, GET_SPECIALIZED } from "../actions/types";

const initialState = {
    getCustomerDetails: [],
    getLogin: [],
    getOffers: [],
    getPopularService: [],
    registerViaPhone: [],
    verifyOtp: [],
    getCity: [],
    getSearch: [],
    getSpecialized: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER_DETAILS:
            return {
                ...state,
                getCustomerDetails: action.payload
            }
        case GET_LOGIN:
            return {
                ...state,
                getLogin: action.payload
            }
        case GET_SPECIALIZED:
            return {
                ...state,
                getSpecialized: action.payload
            }
        case GET_SEARCH:
            return {
                ...state,
                getSearch: action.payload
            }
        case GET_OFFERS:
            return {
                ...state,
                getOffers: action.payload
            }
        case GET_POPULAR_SERVICE:
            return {
                ...state,
                getPopularService: action.payload
            }
        case REGISTER_VIA_PHONE:
            return {
                ...state,
                registerViaPhone: action.payload
            }
        case VERIFY_OTP:
            return {
                ...state,
                verifyOtp: action.payload
            }
        case GET_CITY:
            return {
                ...state,
                getCity: action.payload
            }
        default:
            return state;
    }
}