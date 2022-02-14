import {
    createSlice,
    nanoid,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'


export const SEND_OTP      = '/hg/user/auth/SEND_OTP';
export const VERIFY_OTP    = '/hg/user/auth/SEND_OTP';
export const RESEND_OTP    = '/hg/user/auth/RESEND_OTP';
export const REGISTER_USER = '/hg/user/auth/REGISTER_USER';
export const GET_USER      = '/hg/user/auth/GET_USER';



export const sendOTP = createAsyncThunk(SEND_OTP, async (phoneNo, countryCode) => {
    const data = await client.post('customer/validatePhoneNo', { phoneNo, countryCode })
    return data.isRegistered
})

export const verifyOTP = createAsyncThunk(VERIFY_OTP, async (otpData) => {
    const data = await client.put('customer/verifyOTP1', otpData);
    return data
})

export const resendOTP = (phone, countryCode) => async (dispatch) => {
    dispatch(fetchPosts())
    dispatch(sendOTP(phone,countryCode))
}

export const register = createAsyncThunk(REGISTER_USER, async (userData) => {
    const resp = await client.get('/fakeApi/posts')
    return response.posts
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
      status: 'idle',
      error: null,
      isRegistered: false,
      token: null,
      isLoggedIn: false,
      user: null,
    },
    reducers: {
        updateLoginStatus(state, action) {
            const { token, isLoggedIn, user } = action.payload
        }
    },
    extraReducers: {
        [sendOTP.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [sendOTP.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                state.isRegistered = action.isRegistered
                state.status = 'idle'
            }
        },
        [sendOTP.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed'
                state.error = action.payload
            }
        },
        [verifyOTP.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [verifyOTP.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                const { token, isLoggedIn, user } = action.payload
                state = { ...state, token, isLoggedIn, user }
                state.status = 'idle'
            }
        },
        [verifyOTP.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed'
                state.error = action.payload
            }
        },
    },
})
  
export default userSlice.reducer
