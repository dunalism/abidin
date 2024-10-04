import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib-axios/axios-dashboard";

export const getAdminData = createAsyncThunk(
  "admin/getAdminData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "ada yang error!"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: [],
    isLoading: false,
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAdminData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminData = action.payload;
      })
      .addCase(getAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
