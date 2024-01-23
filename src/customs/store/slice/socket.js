import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "socket"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

export function initData() {
    return(
        {
            isDisconnected: false,
        }
    )
}

const data = getData();
const initialState = data
    ? {
        isDisconnected: data.isDisconnected ? data.isDisconnected : false
    }
    : initData();

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        SOCKET_DISCONNECT_HANDLE(state, action) {
            state.isDisconnected = true
        },
        SOCKET_RECONNECT_HANDLE(state, action) {
            state.isDisconnected = false
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    SOCKET_DISCONNECT_HANDLE,
    SOCKET_RECONNECT_HANDLE
} = actions;
export default reducer;
