import { configureStore } from '@reduxjs/toolkit';
import authReducer from './session/authSlice';
import filtersSlice from './session/filtersSlice';
import usersReducer from './session/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    filters: filtersSlice,
  },
});
