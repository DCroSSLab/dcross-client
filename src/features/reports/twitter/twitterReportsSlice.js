/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		twitterReportsSlice.js
 * Description:     Redux Twitter slice, Twitter reports are centralized through this.
 *
 */


import {createAsyncThunk, nanoid, createSlice, createSelector} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: 'idle',
    error:  null
}

export const fetchTwitterReports = createAsyncThunk('twitter/fetchReports', async () => {
    const response = await axios.get('http://localhost:3001/reports/twitter');
    return response.data.reports;
});

export const twitterReportsSlice = createSlice({
    name: 'twitterReports',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchTwitterReports.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTwitterReports.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [fetchTwitterReports.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export default twitterReportsSlice.reducer;

export const selectAllTwitterReports = (state) => state.twitterReports.data;
