import axios from 'axios'
import { BASE_URL } from "../base_file";

export const JOBDETAILS = 'hg/jobdetails/JOBDETAILS'
export const JOBDETAILS_SUCCESS = 'hg/bookings/JOBDETAILS_SUCCESS'
export const JOBDETAILS_FAIL = 'hg/bookings/JOBDETAILS_FAIL'

const initialState = {
    jobDetails: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {

        case JOBDETAILS:
            return {
                ...state,
                isLoading: true,
                isLoadError: null,
            }
        case JOBDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadError: null,
                jobDetails: action.payload
            }
        case JOBDETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoadError: true,
            }
        default:
            return state
    }
}


export const loadJobDetails = (token, appointmentId) => async dispatch => {
    try {
        dispatch({ type: JOBDETAILS });
        const res = await axios.post(`${BASE_URL}customer/getJobDetails`, { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
        const data = res.data.data;
        console.log('Loaded', data);
        dispatch({ type: JOBDETAILS_SUCCESS, payload });

        return res.data.data;
    } catch (e) {
        console.log('CATCH', e);
        dispatch({ type: JOBDETAILS_FAIL });
    }
};

//Selectors
export const getJobDetails = state => state.jobDetails;