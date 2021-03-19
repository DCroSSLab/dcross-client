import {createAsyncThunk, nanoid, createSlice, createSelector} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    filters: {
        magnitude: {
            low: 4.0,
            high: 7.0,
            minimum: 0.0,
            maximum: 10.0,
        },
        depth: {
            low: 10,
            high: 200,
            minimum: 0,
            maximum: 750,
        }
    },
    status: 'idle',
    error:  null
}

export const fetchEarthquakes = createAsyncThunk('earthquakes/fetchEarthquakes', async () => {
    const response = await axios.get('http://localhost:3001/events/earthquakes')
    return response.data.features
});

const markerColor = (earthquake) => {
    let mag = earthquake.properties.magnitude
    if (mag <= 4.0) {
        earthquake.properties.fill = '#3293d9'
        earthquake.properties.classname = 'earthquake-light'
    }
    else if (4.0 < mag && mag < 5.5) {
        earthquake.properties.fill = '#FFFF00'
        // earthquake.properties.fill = '#f2e527'
        earthquake.properties.classname = 'earthquake-moderate'
    }
    else if (5.5 <= mag && mag < 6.0) {
        earthquake.properties.fill = '#d96f32'
        earthquake.properties.classname = 'earthquake-strong'
    }
    else if (mag >= 6.0) {
        // console.log("We came into gt than 6 eqs")
        earthquake.properties.fill = '#d00'
        earthquake.properties.classname = 'earthquake-major'
    }
}

export const earthquakesSlice = createSlice({
    name: 'earthquakes',
    initialState,
    reducers: {
        setMagnitudeRange: (state, action) => {
            //rounding off to one decimal because the sliders are glitched
            state.filters.magnitude.low = action.payload[0]
            state.filters.magnitude.high = action.payload[1]
        },
        setDepthRange: (state, action) => {
            state.filters.depth.low = action.payload[0]
            state.filters.depth.high = action.payload[1]
        }
    },
    extraReducers: {
        [fetchEarthquakes.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchEarthquakes.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.concat(action.payload);
            state.data.forEach(markerColor);
        },
        [fetchEarthquakes.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export const { setMagnitudeRange, setDepthRange } = earthquakesSlice.actions;

export const selectAllEarthquakes = (state) => state.earthquakes.data;

export const selectFilters = (state) => state.earthquakes.filters;

export const selectFilteredEarthquakes = createSelector(
    selectAllEarthquakes,
    selectFilters,
    (earthquakes, filters) => {
        const {magnitude, depth} = filters;
        return earthquakes.filter(earthquake => {
            const matches = magnitude.low <= earthquake.properties.magnitude <= magnitude.high;
            const magnitudeMatches = earthquake.properties.magnitude >= magnitude.low &&
                earthquake.properties.magnitude <= magnitude.high
            const depthMatches = earthquake.properties.depth.value >= depth.low &&
                earthquake.properties.depth.value <= depth.high
            return magnitudeMatches && depthMatches
        })
    }
)

export default earthquakesSlice.reducer;