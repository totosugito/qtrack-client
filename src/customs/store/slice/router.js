import {createSlice} from "@reduxjs/toolkit";
const SLICE_KEY = "router"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

export function initData() {
    return(
        {
            location: {},
            action: "",
        }
    )
}

const data = getData();
const initialState = data
    ? {
        location: data.location ? data.location : {},
        action: data.action ? data.action : "",
    }
    : initData();

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        LOCATION_CHANGE_HANDLE(state, action) {
            state.location = action.payload.location
            // state.action = action.payload.action
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    LOCATION_CHANGE_HANDLE
} = actions;
export default reducer;
