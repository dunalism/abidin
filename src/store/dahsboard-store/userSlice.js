import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib-axios/axios-dashboard";

const admin = "d397";
const user = "9f25"; // untuk user percobaan aja

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    // const response = await axiosInstance.get(`/users/${id}`); // buat dinamis
    const response = await axiosInstance.get(`/users/${user}`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "ada yang error!");
  }
});

export const putUser = createAsyncThunk(
  "user/putUser",
  async (data, thunkAPI) => {
    try {
      // const response = await axiosInstance.put(`/user/${id}`, data); // buat dinamis
      const response = await axiosInstance.put(`/users/${user}`, data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "ada yang error!"
      );
    }
  }
);

export const delUser = createAsyncThunk(
  "user/delUser",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    getUserData: {},
    isLoading: false,
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getUserData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // untuk edit user
      .addCase(putUser.pending, (state) => {
        state.error = null;
        state.isUpdating = true;
      })
      .addCase(putUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.getUserData = action.payload;
      })
      .addCase(putUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })

      // untuk del user
      .addCase(delUser.fulfilled, (state, action) => {
        if (state.getUserData.id === action.payload) {
          state.getUserData = {};
        }
      });
  },
});

export default userSlice.reducer;
