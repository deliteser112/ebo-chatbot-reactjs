import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice";

export default configureStore({
  reducer: {
    messages: messageReducer,
  },
});
