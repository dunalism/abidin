import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./dahsboard-store/userSlice";
import billReducer from "./dahsboard-store/billSlice";
import adminReducer from "./admin-store/adminSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    bill: billReducer,
  },
});
