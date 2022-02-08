import axios from 'axios'
import { BASE_URL } from "../base_file";


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}
  
async function getData(key) {
    let result = await SecureStore.getItemAsync(key);
    return result? result : false;
}

//Login
export const LOAD_BOOKINGS         = 'hg/auth/user/LOAD_BOOKINGS'
export const LOAD_BOOKINGS_SUCCESS = 'hg/auth/user/LOAD_BOOKINGS_SUCCESS'
export const LOAD_BOOKINGS_FAIL    = 'hg/auth/user/LOAD_BOOKINGS_FAIL'

const initialState = {

}

export default function (state = initialState, action = {}, payload) {
    switch (action.type) {
      
        case LOAD_BOOKINGS:
            return {
            ...state,
            isBookingsLoading: true,
            isBookingsLoadError: null,
            }
        case LOAD_BOOKINGS_SUCCESS:
            return {
                ...state,
                isBookingsLoading: false,
                isBookingsLoadError: null,
                ...payload
            }
        case LOAD_BOOKINGS_SUCCESS:
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
       
        console.log('req', `${BASE_URL}customer/getmybookings`, { headers: { Authorization: `Bearer ${token}` }});
        const res = await axios.get(`${BASE_URL}customer/getmybookings`, { headers: { Authorization: `Bearer ${token}` } });
        console.log('response ');
        return;
        dispatch({ 
            type: LOAD_BOOKINGS_SUCCESS,
            payload: res.data
        });
        return res.data.data;
    } catch(e) {
        console.log(e)
        dispatch({ 
            type: LOAD_BOOKINGS_FAIL,
            payload: e
        });
    }
};