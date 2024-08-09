import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
