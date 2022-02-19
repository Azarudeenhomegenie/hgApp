/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { loadState, resetStorage } from '@helpers/localStorage';

export const INIT_STORAGE = '/hg/user/auth/INIT_STORAGE';
export const SEND_OTP = '/hg/user/auth/SEND_OTP';
export const VERIFY_OTP = '/hg/user/auth/SEND_OTP';
export const RESEND_OTP = '/hg/user/auth/RESEND_OTP';
export const REGISTER_USER = '/hg/user/auth/REGISTER_USER';
export const GET_USER = '/hg/user/auth/GET_USER';
export const LOGOUT = '/hg/user/auth/LOGOUT';

export const loadLocalData = createAsyncThunk(INIT_STORAGE, async () => {
  const data = await loadState();
  if (!data) {
    Promise.reject();
  }
  return data;
});

export const logout = createAsyncThunk(LOGOUT, async () => {
  await resetStorage();
  return null;
});

export const sendOTP = createAsyncThunk(SEND_OTP, async ({ phoneNo, countryCode }) => {
  console.log(countryCode, phoneNo);
  const data = await client.post('customer/validatePhoneNo', { phoneNo, countryCode });
  console.log(data);
  return data.isRegistered;
});

export const verifyOTP = createAsyncThunk(VERIFY_OTP, async (otpData) => {
  const data = await client.put('customer/verifyOTP1', otpData);
  return data;
});

export const resendOTP = (phone, countryCode) => async (dispatch) => {
//   dispatch(fetchPosts());
  dispatch(sendOTP(phone, countryCode));
};

export const register = createAsyncThunk(REGISTER_USER, async (params) => {
  const data = await client.post('customer/registerViaPhone', params);
  return data.message;
});

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
  reducers: {},
  extraReducers: {
    [sendOTP.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [sendOTP.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.isRegistered = action.isRegistered;
        state.status = 'idle';
      }
    },
    [sendOTP.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
    [verifyOTP.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [verifyOTP.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        const { token, isLoggedIn, user } = action.payload;
        state = {
          ...state,
          token,
          isLoggedIn,
          user
        };
        state.status = 'idle';
      }
    },
    [verifyOTP.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
    [loadLocalData.fulfilled]: (state, action) => {
      const { token, isLoggedIn, user } = action.payload;
      state = {
        state,
        token,
        isLoggedIn,
        user
      };
    },
    [logout.fulfilled]: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null
      };
    }
  },
});

export default userSlice.reducer;

export const getAccessToken = (state) => state.user.token;
export const getLoggedInStatus = (state) => state.user.isLoggedIn;
export const getUser = (state) => state.user.user;
