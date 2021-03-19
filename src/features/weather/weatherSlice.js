import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchAWSARGWeather = createAsyncThunk('weather/fetchAWSARGWeather', async () => {
    const response = await axios.get('http://localhost:3001/events/weather')
    return response.data.features
})

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAWSARGWeather.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchAWSARGWeather.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.concat(action.payload);
        },
        [fetchAWSARGWeather.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export const selectWeather = (state) => state.weather.data;

export default weatherSlice.reducer;