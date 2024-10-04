import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../lib/axios-dashboard";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    // const response = await axiosInstance.get(`/users/${id}`);
    const response = await axiosInstance.get("/users/d397");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "ada yang error!");
  }
});

export const putUser = createAsyncThunk(
  "user/putUser",
  async (data, thunkAPI) => {
    try {
      // const response = await axiosInstance.put(`/user/${id}`, data);
      const response = await axiosInstance.put(`/users/d397`, data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "ada yang error!"
      );
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

      .addCase(putUser.pending, (state) => {
        state.error = null;
        state.isUpdating = true;
      })
      // .addCase(putUser.fulfilled, (state, action) => {
      //   state.isUpdating = false;
      //   state.getUserData = state.getUserData.map((i) =>
      //     i.id === action.payload.id ? action.payload : i
      //   );
      // })
      .addCase(putUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.getUserData = action.payload;
      })

      .addCase(putUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
