import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    filters: {
        severity: ["Medium", "High"]
    },
    status: 'idle',
    error:  null
}

export const fetchNowcasts = createAsyncThunk('nowcasts/fetchNowcasts', async () => {
    const response = await axios.get('http://localhost:3001/events/nowcasts');
    return response.data.features;
});

export const nowcastsSlice = createSlice({
    name: 'nowcasts',
    initialState,
    reducers: {
        setSeverityFilter: (state, action) => {
            if (action.payload[0] === "enable") {
                console.log("we in enable");
                if (!state.filters.severity.includes(action.payload[1])) {
                    state.filters.severity = state.filters.severity.concat(action.payload[1]);
                }
            }
            else if (action.payload[0] === "disable") {
                if (state.filters.severity.includes(action.payload[1])) {
                    console.log("we in disable");
                    state.filters.severity = state.filters.severity.filter(existingSeverity => {
                        return existingSeverity !== action.payload[1]
                    });
                }
            }
        },
    },
    extraReducers: {
        [fetchNowcasts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchNowcasts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.concat(action.payload);
        },
        [fetchNowcasts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export const { setSeverityFilter } = nowcastsSlice.actions;

export const selectAllNowcasts = (state) => state.nowcasts.data;
export const selectNowcastFilters = (state) => state.nowcasts.filters;

export const selectFilteredNowcasts = createSelector(
    selectAllNowcasts,
    selectNowcastFilters,
    (nowcasts, filters) => {
        return nowcasts.filter(nowcast => {
            return filters.severity.includes(nowcast["properties"]["forecast"]["severity"]);
        });
    }
)

export default nowcastsSlice.reducer;