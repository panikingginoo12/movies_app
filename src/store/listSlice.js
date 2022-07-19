import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action) => {
      console.log({ action, state });
      return action.payload;
    },
  },
});

export const getItem = (state, id) => {
  const data = state.list.find(({ show }) => {
    console.log({ show });
    return show.id === Number(id);
  });
  console.log({ id, data, state });
  return data;
};

export const { setList } = listSlice.actions;

export default listSlice.reducer;
