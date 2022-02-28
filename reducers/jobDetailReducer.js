import axios from 'axios'
import { BASE_URL } from "../base_file";
// import { JobDetailConverter } from '../converters/jobDetailConverter';
import { JobBookingDetailConverter } from '../converters/bookingDetailConverter';

export const LOAD_JOB_DETAIL = 'hg/jobdetails/JOB_DETAIL'
export const LOAD_JOB_DETAIL_SUCCESS = 'hg/jobdetails/JOB_DETAIL_SUCCESS'
export const LOAD_JOB_DETAIL_FAIL = 'hg/jobdetails/JOB_DETAIL_FAIL'

export const LOAD_GENIE_DATA = 'hg/jobdetails/GENIE_DATA'
export const LOAD_GENIE_DATA_SUCCESS = 'hg/jobdetails/GENIE_DATA_SUCCESS'
export const LOAD_GENIE_DATA_FAIL = 'hg/jobdetails/GENIE_DATA_FAIL'

const initialState = {
    jobdetail: null,
    genie: null,
};

export default function (state = initialState, action = {}) {
    switch (action.type) {

        case LOAD_JOB_DETAIL:
            return {
                ...state,
                isJobdetailLoading: true,
                isJobdetailLoadError: null,
            }
        case LOAD_JOB_DETAIL_SUCCESS:
            // console.log('HEllo', action.payload)
            return {
                ...state,
                isJobdetailLoading: false,
                isJobdetailLoadError: null,
                jobdetail: action.payload,
            }
        case LOAD_JOB_DETAIL_FAIL:
            return {
                ...state,
                isJobdetailLoading: false,
                isJobdetailLoadError: true,
            }
        case LOAD_GENIE_DATA:
            return {
                ...state,
                isGenieLoading: true,
                isGenieLoadError: null,
            }
        case LOAD_GENIE_DATA_SUCCESS:
            // console.log('HEllo', action.payload)
            return {
                ...state,
                isGenieLoading: false,
                isGenieLoadError: null,
                genie: action.payload,
            }
        case LOAD_JOB_DETAIL_FAIL:
            return {
                ...state,
                isGenieLoading: false,
                isGenieLoadError: true,
            }
        default:
            return state
    }
}


export const loadJobDetails = (token, jobId) => async dispatch => {
    try {
        console.log('URL', `${BASE_URL}customer/getJobDetails`)
        const res = await axios.post(`${BASE_URL}customer/getJobDetails`, { appointmentId: jobId }, { headers: { Authorization: `Bearer ${token}` } });
        // console.log('BINGO DATA::::::', JSON.stringify(res.data.data[0]))
        const payload = JobBookingDetailConverter.fromApi(res.data.data[0]);
        console.log('Loaded....... JOB DAGTA');
        dispatch({ type: LOAD_JOB_DETAIL_SUCCESS, payload });
        return payload;
    } catch (e) {
        console.log('CATCH');
        console.log(e)
        dispatch({
            type: LOAD_JOB_DETAIL_FAIL,
            payload: e
        });
    }
};


export const loadGenie = (token, gid) => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}customer/getDriverDetails?id=${gid}`, { headers: { Authorization: `Bearer ${token}` } });
        const payload = res.data.data;
        console.log('Loaded....... GINE DAGTA');
        dispatch({ type: LOAD_GENIE_DATA_SUCCESS, payload });
        return res.data.data;
    } catch (e) {
        console.log('CATCH');
        console.log(e)
        dispatch({
            type: LOAD_GENIE_DATA_FAIL,
            payload: e
        });
    }
};

export const addRating = (token, data) => async dispatch => {
    try {
        const res = await axios.post(`${BASE_URL}customer/driverRatingComments`, data, { headers: { Authorization: `Bearer ${token}` } });
        return true;
    } catch (e) {
        console.log('CATCH');
        console.log(e)
        return false;
    }
};


export const updateInspection = (token, data) => async dispatch => {
    try {
        const res = await axios.put(`${BASE_URL}customer/acceptOrRejectedJobOnce`, data, { headers: { Authorization: `Bearer ${token}` } });
        return true;
    } catch (e) {
        console.log('CATCH');
        console.log(e)
        return false;
    }
};


//Selectors
export const getJobDetail = state => state.jobdetails.jobdetail;
export const getGenie = state => state.jobdetails.genie;