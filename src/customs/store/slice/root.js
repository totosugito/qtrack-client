import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "root"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

export function initData() {
    return(
        {
            isInitializing: true,
            config: null,
        }
    )
}

const data = getData();
const initialState = data
    ? {
        isInitializing: data.isInitializing ? data.isInitializing : false,
        config: data.config ? data.config : {},
    }
    : initData();

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        LOGIN_INITIALIZE(state, action) {
            state.isInitializing = false
            state.config = action.payload.config
        },
        // AUTHENTICATE__SUCCESS(state, action) {
        //     state.isInitializing = true
        // },
        CORE_INITIALIZE(state, action) {
            state.isInitializing = false
        },
        CORE_INITIALIZE__CONFIG_FETCH(state, action) {
            state.config = action.payload.config
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    LOGIN_INITIALIZE,
    // AUTHENTICATE__SUCCESS,
    CORE_INITIALIZE,
    CORE_INITIALIZE__CONFIG_FETCH
} = actions;
export default reducer;
