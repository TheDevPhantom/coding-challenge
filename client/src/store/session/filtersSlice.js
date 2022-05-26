import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: 'username',
  page: 1,
  limit: 5,
  filterBy: '',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      let value = action.payload;
      if (state.sort == value) {
        value = `-${value}`;
      }
      state.sort = value;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSort, updatePage, updateFilterBy, updateSearch } =
  filtersSlice.actions;

export default filtersSlice.reducer;
