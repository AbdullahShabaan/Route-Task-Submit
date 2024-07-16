import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetCustomers = createAsyncThunk(
  "customers/GetCustomers",
  async (args, thunkApi) => {
    try {
      const req = await fetch(
        "https://my-json-server.typicode.com/AbdullahShabaan/Transaction-Server/transactions"
      );
      const data = req.json();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const UsersSlice = createSlice({
  name: "customers",
  initialState: { customers: [], isLoading: false, isError: false },
  extraReducers: (builder) => {
    // Get Transactions
    builder.addCase(GetCustomers.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(GetCustomers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(GetCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
    });
  },
});

export default UsersSlice.reducer;
