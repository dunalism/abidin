import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../../lib/axios-dashboard";
import axios from "axios";

export const getBill = createAsyncThunk("bill/getBill", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://json-server-flax-six.vercel.app/bill-history");
    const billHistory = response.data;
    const saldo = response.data[0].finalBalance;
    let totalBid = 0;
    let bidSuccess = 0;

    for (let i = 0; i < billHistory.length; i++) {
      if (
        billHistory[i]?.description === "Failed Bid" ||
        billHistory[i]?.description === "Successful Bid"
      ) {
        totalBid++;
      }
    }

    for (let i = 0; i < billHistory.length; i++) {
      if (billHistory[i]?.description === "Successful Bid") {
        bidSuccess++;
      }
    }

    return {
      billHistory: billHistory,
      saldo: saldo,
      totalBid: totalBid,
      bidSuccess: bidSuccess,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "ada yang error!");
  }
});

const initialState = {
  billHistory: [],
  saldo: null,
  totalBid: null,
  bidSuccess: null,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.billHistory = action.payload.billHistory;
  state.saldo = action.payload.saldo;
  state.totalBid = action.payload.totalBid;
  state.bidSuccess = action.payload.bidSuccess;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBill.pending, handlePending)
      .addCase(getBill.fulfilled, handleFulfilled)
      .addCase(getBill.rejected, handleRejected);
  },
});

export default billSlice.reducer;
