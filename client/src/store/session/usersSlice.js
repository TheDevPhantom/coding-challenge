import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api, { usersUrl } from '../../constants/api';

const initialState = {
  status: 'idle',
  users: [],
  limit: 5,
  count: 0,
  total: 0,
  pagination: {},
};

export const getUsers = createAsyncThunk(
  'users/get',
  async (_, { getState, requestId }) => {
    const { page, limit, sort, filterBy, search } = getState().filters;
    const response = await api.get(usersUrl, {
      params: { page, limit, sort, [filterBy]: search },
    });
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (userDetails, { getState, requestId }) => {
    const { token } = getState().auth;
    const response = await api.post(usersUrl, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, { getState, requestId }) => {
    const { token } = getState().auth;
    const response = await api.delete(`${usersUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (userData, { getState, requestId }) => {
    const { token } = getState().auth;
    const response = await api.put(`${usersUrl}/${userData.id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.users = action.payload.data;
        state.count = action.payload.count;
        state.pagination = action.payload.pagination;
        state.total = action.payload.total;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.count++;
        state.users.push(action.payload.data);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        let aux = state.users;
        filterInPlace(aux, (obj) => obj.id != action.payload.userId);
        state.users = aux;
        state.total--;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        let aux = state.users;
        filterInPlace(aux, (obj) => obj.id != action.payload.data.id);
        state.users = aux;
        state.users.push(action.payload.data);
      });
  },
});

const filterInPlace = (array, predicate) => {
  let end = 0;

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    if (predicate(obj)) {
      array[end++] = obj;
    }
  }

  array.length = end;
};

export default usersSlice.reducer;
