// src/features/payment/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initiatePayment = createAsyncThunk(
  'payment/initiatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/payments/initiate-payment', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Error initiating payment');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    paymentUrl: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.data.authorization_url;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
