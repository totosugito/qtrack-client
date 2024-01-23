import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Config from "../../../constants/Config";
import {jwtDecode} from "jwt-decode";
const SLICE_KEY = "auth"

export const setAccessToken = (accessToken) => {
    const { exp } = jwtDecode(accessToken);
    const expires = new Date(exp * 1000);

    Cookies.set(Config.ACCESS_TOKEN_KEY, accessToken, {
        expires,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
    });

    Cookies.set(Config.ACCESS_TOKEN_VERSION_KEY, Config.ACCESS_TOKEN_VERSION, {
        expires,
    });
}

export const removeAccessToken = () => {
    Cookies.remove(Config.ACCESS_TOKEN_KEY);
    Cookies.remove(Config.ACCESS_TOKEN_VERSION_KEY);
};

export const getAccessToken = () => {
    let accessToken = Cookies.get(Config.ACCESS_TOKEN_KEY);
    const accessTokenVersion = Cookies.get(Config.ACCESS_TOKEN_VERSION_KEY);

    if (accessToken && accessTokenVersion !== Config.ACCESS_TOKEN_VERSION) {
        removeAccessToken();
        accessToken = undefined;
    }

    return accessToken;
}

export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

export function initData() {
    return(
        {
            accessToken: getAccessToken(),
            userId: null,
        }
    )
}

const data = getData();
const initialState = data
    ? {
        accessToken: data.accessToken ? data.accessToken : getAccessToken(),
        userId: data.userId ? data.userId : null,
    }
    : initData();

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        AUTHENTICATE(state, action) {
            state.accessToken = null
            state.userId = null
            setData(state)
        },
        AUTHENTICATE__SUCCESS(state, action) {
            state.accessToken = action.payload.accessToken
            setData(state)
        },
        AUTHENTICATE__FAILURE(state, action) {
            state.accessToken = null
            state.userId = null
            setData(state)
        },
        AUTH_SOCKET_RECONNECT_HANDLE(state, action) {
            state.userId = action.payload.user.id
            setData(state)
        },
        USER_PASSWORD_UPDATE__SUCCESS(state, action) {
            if (action.payload.accessToken) {
                state.accessToken = action.payload.accessToken
                setData(state)
            }
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    AUTHENTICATE,
    AUTHENTICATE__SUCCESS,
    AUTHENTICATE__FAILURE,
    AUTH_SOCKET_RECONNECT_HANDLE,
    USER_PASSWORD_UPDATE__SUCCESS
} = actions;
export default reducer;
