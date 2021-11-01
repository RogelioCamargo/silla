import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

// import reducers
import {listingsReducer} from './listings';
import {usersReducer} from './users';

const reducer = combineReducers({
  listings: listingsReducer,
  users: usersReducer,
});

// eslint-disable-next-line no-undef
export default store = configureStore({
  reducer,
});
