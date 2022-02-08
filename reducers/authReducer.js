import axios from 'axios'
import path from 'ramda/src/path'
import { BASE_URL } from "../base_file";
import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
  
async function getData(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log('key', result, typeof result)
    return result ? result : false;
}

async function removeData(key) {
  await SecureStore.deleteItemAsync(key);
}

//Login
export const LOGIN              = 'hg/auth/user/LOGIN'
export const LOGIN_SUCCESS      = 'hg/auth/user/LOGIN_SUCCESS'
export const LOGIN_FAIL         = 'hg/auth/user/LOGIN_FAIL'

//Verify otp

export const VERIFY_OTP         = 'hg/auth/user/VERIFY_OTP'
export const VERIFY_OTP_SUCCESS = 'hg/auth/user/VERIFY_OTP_SUCCESS'
export const VERIFY_OTP_FAIL    = 'hg/auth/user/VERIFY_OTP_FAIL'

export const RESEND_OTP         = 'hg/auth/user/RESEND_OTP'
export const RESEND_OTP_SUCCESS = 'hg/auth/user/RESEND_OTP_SUCCESS'
export const RESEND_OTP_FAIL    = 'hg/auth/user/RESEND_OTP_FAIL'

export const LOGOUT              = 'hg/auth/user/LOGOUT'
export const LOGOUT_SUCCESS      = 'hg/auth/user/LOGOUT_SUCCESS'
export const LOGOUT_FAIL         = 'hg/auth/user/LOGOUT_FAIL'

const USER = getData('user')
console.log(typeof USER)
const initialState = {
    token: getData('token'),
    isOTPSent: false,
    isLoggedIn: getData('isLoggedIn'),
    user: USER
}
console.log('INIT', initialState);



export default function (state = initialState, action = {}) {
    switch (action.type) {
      
      case LOGIN:
        return {
          ...state,
          loggingIn: true,
          loginError: null,
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          info: action.result,
          loggingIn: false,
          isOTPSent: true,
        }
      case LOGIN_FAIL:
        return {
          ...state,
          info: {},
          loggingIn: false,
          loginError: action.error,
        }
      case LOGOUT:
        removeData('token');
        removeData('isLoggedIn');
        return {
          ...state,
          loggingOut: true,
          isLoggedIn: false,
          user: {},
          token: null
        }
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
          loggingOut: false,
          info: {},
        }
      case LOGOUT_FAIL:
        return {
          ...state,
          loggingOut: false,
          logoutError: action.error,
        }
        case VERIFY_OTP:
            return {
              ...state,
              isOTPVerifying: true,
            }
          case VERIFY_OTP_SUCCESS:
            
            console.log("PAYload", action.payload)
            save('token', action.payload.token);
            save('isLoggedIn', true);
            // save('user', JSON.stringify(action.payload.user));
            return {
              ...state,
              isLoggedIn: true,
              isOTPVerifying: false,
              user: action.payload.user,
              token: action.payload.token
            }
          case VERIFY_OTP_FAIL:
            return {
              ...state,
              isOTPVerifying: false,
            }
      default:
        return state
    }
  }


export const login = (phone, countryCode) => async dispatch => {

    try {   
        // console.log('req', `${BASE_URL}customer/validatePhoneNo`, phone)
        const res = await axios.post(`${BASE_URL}customer/validatePhoneNo`,
            { 
                phoneNo: phone,
                countryCode: countryCode,
            }
        );
        // console.log('response', res.data);
        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        return res.data.data;
    } catch(e) {
        console.log(e)
        dispatch({ 
            type: LOGIN_FAIL,
            payload: e
        });
    }
};


export const verifyOtp = (params) => async dispatch =>  {


    try {   
      console.log(params, `${BASE_URL}customer/verifyOTP1`)
      const res = await axios.put(`${BASE_URL}customer/verifyOTP1`, params);
      console.log(res);
      const data = res.data.data;
      const payload = {
        token: data.accessToken,
        user: {
          name: data.userDetails.name,
          email: data.userDetails.email
        }
      }
    
      dispatch({ 
        type: VERIFY_OTP_SUCCESS,
        payload
      });
      return res.data.data;
    } catch(e) {
        console.log(e)
        dispatch({ 
            type: VERIFY_OTP_FAIL,
            payload: e
        });
    }
}

export const logout = () => async dispatch =>  {
  dispatch({ 
    type: LOGOUT
  });
}