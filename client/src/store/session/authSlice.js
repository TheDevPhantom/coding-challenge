import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api, { authenticateUrl, loginUrl } from '../../constants/api';

const initialState = {
  token: null,
  status: 'idle',
  me: {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    mobile: '',
    description: '',
    role: '',
    createdAt: '',
    updatedAt: '',
  },
  authenticated: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await api.post(loginUrl, { username, password });
    return response.data;
  }
);

export const authenticate = createAsyncThunk('auth/authenticate', async () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    throw new Error('No token');
  }

  const response = await api.post(authenticateUrl, null, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state = initialState;
      sessionStorage.removeItem('token');
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.token = action.payload.token;
        state.me = action.payload.user;
        state.authenticated = true;
        sessionStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action);
      })
      .addCase(authenticate.pending, (state) => {
        state.status = 'loading-authentication';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = 'success';
        state.token = action.payload.token;
        state.me = action.payload.user;
        state.authenticated = true;
        sessionStorage.setItem('token', action.payload.token);
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
