import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  response: "",
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};
const backend = "http://localhost:5000/url/";

export const urlThunk = createAsyncThunk("urrl", async (data) => {
  // console.log(data);
  return await axios
    .post(`${backend}`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

// console.log(data);
export const urlSlice = createSlice({
  name: "url",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(urlThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(urlThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        state.message = action.payload.data.msg;
      })
      .addCase(urlThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        // state.message = action.payload;
      });
  },
});
export default urlSlice.reducer;
