
import axios from "axios";
import Config from "../../constants/Config";

export const httpGet = async (url, config = {}) => {
    if (Config.SHOW_DEBUG_API) {
        let dbgInp = {
            "type": "http",
            "proc": ">>",
            "url": url,
            "method": "GET",
            "headers": config,
            "data": {}
        }
        console.log(dbgInp)
    }

    try {
        let response = await axios.get(url, config)
        if (Config.SHOW_DEBUG_API) {
            let dbgOut = {
                "type": "http",
                "proc": "<<",
                "url": url,
                "data": response.data
            }
            console.log(dbgOut)
        }

        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

        if (Config.SHOW_DEBUG_API) {
            let dbgOut = {
                "type": "http",
                "proc": "<<",
                "url": url,
                "data": err
            }
            console.log(dbgOut)
        }
        return ({isError: true, data: {}, message: message});
    }
}

export const httpPost = async (url, data={}, config={}) => {
    try {
        let response = await axios.post(url, data, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

export const httpPut = async (url, data={}, config={}) => {
    try {
        let response = await axios.put(url, data, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

export const httpDelete = async (url, config = {}) => {
    try {
        let response = await axios.delete(url, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

const httpApi = {
    httpGet, httpPost, httpPut
};

export default httpApi;
