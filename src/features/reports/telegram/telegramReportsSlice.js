/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani, Priya Pathak
 * Filename: 		telegramReportsSlice.js
 * Description:     Redux Telegram slice, Telegram reports are centralized through this.
 *
 */


import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: 'idle',
    error:  null
}



export const fetchTelegramReports = createAsyncThunk('telegram/fetchReports', async () => {
    const response = await axios.get('http://localhost:3001/reports/telegram');
    return response.data.reports;
});

export const telegramReportsSlice = createSlice({
    name: 'telegramReports',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchTelegramReports.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTelegramReports.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [fetchTelegramReports.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export default telegramReportsSlice.reducer;

export const selectAllTelegramReports = (state) => state.telegramReports.data;
