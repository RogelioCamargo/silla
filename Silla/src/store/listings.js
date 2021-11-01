import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// import constants
import {API_URL, HTTP_STATUS} from '../constants';

const namespace = 'listings';

export const getUserResults = createAsyncThunk(
  `${namespace}/getUserResults`,
  async () => {
    const {data} = await axios.get(
      `${API_URL}/listings/search/uid/${auth().currentUser.uid}`,
    );
    return data;
  },
);

export const getSellerResults = createAsyncThunk(
  `${namespace}/getSellerResults`,
  async uid => {
    const {data} = await axios.get(`${API_URL}/listings/search/uid/${uid}`);
    return data;
  },
);

export const getInitialResults = createAsyncThunk(
  `${namespace}/getInitialResults`,
  async () => {
    const {data} = await axios.get(`${API_URL}/listings/`);
    return data;
  },
);

export const getSearchResults = createAsyncThunk(
  `${namespace}/getSearchResults`,
  async query => {
    const {data} = await axios.get(`${API_URL}/listings/search?${query}`);
    return data;
  },
);

const initialState = {
  userResults: null,
  sellerResults: null,
  initialResults: null,
  searchResults: null,
  loading: null,
};

const listings = createSlice({
  name: namespace,
  initialState,
  reducers: {
    addListingImages: (state, action) => {
      state.images = action.payload;
    },
    addListingInfo: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    // This reducer is for when the user submits the form.
    reset: () => initialState,
  },
  extraReducers: {
    [getUserResults.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getUserResults.fulfilled](state, {payload}) {
      state.userResults = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getUserResults.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [getSellerResults.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getSellerResults.fulfilled](state, {payload}) {
      state.sellerResults = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getSellerResults.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [getInitialResults.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getInitialResults.fulfilled](state, {payload}) {
      state.initialResults = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getInitialResults.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [getSearchResults.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getSearchResults.fulfilled](state, {payload}) {
      state.searchResults = payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    [getSearchResults.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

// export actions
export const {addListingImages, addListingInfo, reset} = listings.actions;

// export reducer
export const listingsReducer = listings.reducer;
