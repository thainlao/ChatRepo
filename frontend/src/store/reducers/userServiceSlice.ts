import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../axios'
import { authState } from "../../types/types"

const initialState: authState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const updateUsername = createAsyncThunk('auth/updateUsername', async (newUsername: string) => {
    try {
      const { data } = await axios.patch('/auth/updateusername', { newUsername });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  
  export const updateEmail = createAsyncThunk('auth/updateEmail', async (newEmail: string) => {
    try {
      const { data } = await axios.patch('/auth/updateemail', { newEmail });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
                  //changeName , Email , Username
                  builder.addCase(updateEmail.pending, (state) => {
                    state.isLoading = true;
                    state.status = null
                  });
                  builder.addCase(updateEmail.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.status = action.payload.message
                  });
                  builder.addCase(updateEmail.rejected, (state, action: any) => {
                    state.isLoading = false;
                    state.status = action.payload.message || 'Произошла ошибка'
                  });
        
                  builder.addCase(updateUsername.pending, (state) => {
                    state.isLoading = true;
                    state.status = null
                  });
                  builder.addCase(updateUsername.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.status = action.payload.message
                  });
                  builder.addCase(updateUsername.rejected, (state, action: any) => {
                    state.isLoading = false;
                    state.status = action.payload.message || 'Произошла ошибка'
                  });
}})

export default authSlice.reducer