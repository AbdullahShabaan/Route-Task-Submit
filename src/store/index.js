import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import userDetails from "./userDetails";

const store = configureStore({
  reducer: {
    usersSlice,
    userDetails,
  },
});

export default store;
