import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// import constants
import {API_URL, HTTP_STATUS} from '../constants';

const namespace = 'users';

export const getUser = createAsyncThunk(`${namespace}/getUser`, async () => {
  const {data} = await axios.get(
    `${API_URL}/users/search/profile/${auth().currentUser.uid}`,
  );
  if (!data) {
    const {uid, email, displayName, photoURL} = auth().currentUser;
    const newUser = {
      _id: uid,
      email,
      displayName,
      photoURL,
    };
    const response = await await axios.post(`${API_URL}/users/create`, newUser);
    return response.data;
  } else {
    return data;
  }
});

export const getSeller = createAsyncThunk(
  `${namespace}/getSeller`,
  async uid => {
    const {data} = await axios.get(`${API_URL}/users/search/${uid}`);
    return data;
  },
);

const initialState = {
  user: null,
  seller: null,
  loading: null,
};

const users = createSlice({
  name: namespace,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getUser.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getUser.fulfilled](state, {payload}) {
      state.user = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getUser.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [getSeller.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getSeller.fulfilled](state, {payload}) {
      state.seller = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getSeller.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

// export actions
export const {reset} = users.actions;

// export reducer
export const usersReducer = users.reducer;
