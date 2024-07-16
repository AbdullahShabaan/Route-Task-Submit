import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetGraphData = createAsyncThunk(
  "userDetails/GetGraphData",
  async (args, thunkApi) => {
    try {
      const req = await fetch(
        `https://my-json-server.typicode.com/AbdullahShabaan/Transaction-Server/transactions?customer_id=${args.id}`
      );
      const data = req.json();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const UserDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { user: {}, isShow: false, isLoading: false },
  extraReducers: (builder) => {
    builder.addCase(GetGraphData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isShow = true;
      state.isLoading = false;
    });
    builder.addCase(GetGraphData.rejected, (state, action) => {
      state.isLoading = false;
      state.isShow = false;
    });
    builder.addCase(GetGraphData.pending, (state, action) => {
      state.isLoading = true;
      state.isShow = false;
    });
  },
});

export default UserDetailsSlice.reducer;
