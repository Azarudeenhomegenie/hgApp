import axios from 'axios'
import { BASE_URL } from "../base_file";


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getData(key) {
    let result = await SecureStore.getItemAsync(key);
    return result ? result : false;
}

//Login
export const LOAD_BOOKINGS = 'hg/bookings/LOAD_BOOKINGS'
export const LOAD_BOOKINGS_SUCCESS = 'hg/bookings/LOAD_BOOKINGS_SUCCESS'
export const LOAD_BOOKINGS_FAIL = 'hg/bookings/LOAD_BOOKINGS_FAIL'

const initialState = {
    currentBookings: null,
    pastBookings: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {

        case LOAD_BOOKINGS:
            return {
                ...state,
                isBookingsLoading: true,
                isBookingsLoadError: null,
            }
        case LOAD_BOOKINGS_SUCCESS:
            // console.log('HEllo', action.payload)
            return {
                ...state,
                isBookingsLoading: false,
                isBookingsLoadError: null,
                currentBookings: action.payload.currentBookings,
                pastBookings: action.payload.pastBookings
                // ...action.payload
            }
        case LOAD_BOOKINGS_FAIL:
            return {
                ...state,
                isBookingsLoading: false,
                isBookingsLoadError: true,
            }
        default:
            return state
    }
}


export const loadBookings = (token) => async dispatch => {
    try {
        console.log('URL', `${BASE_URL}customer/getmybookings`)
        const res = await axios.get(`${BASE_URL}customer/getmybookings`, { headers: { Authorization: `Bearer ${token}` } });
        // console.log('response ', res.data);
        const data = res.data.data;
        const payload = {
            pastBookings: data.pastBooking,
            currentBookings: data.upcomingAppointment
        };
        console.log('Loaded');
        dispatch({ type: LOAD_BOOKINGS_SUCCESS, payload });

        return res.data.data;
    } catch (e) {
        console.log('CATCH');
        console.log(e)
        dispatch({
            type: LOAD_BOOKINGS_FAIL,
            payload: e
        });
    }
};


//Selectors
export const getCurrentBookings = state => state.currentBookings
export const getPastBookings = state => state.pastBookings