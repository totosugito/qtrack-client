import {fetch} from 'whatwg-fetch';

import Config from '../../constants/Config';
import axios from "axios";

const http = {};

// TODO: add all methods
['GET', 'POST'].forEach((method) => {
    http[method.toLowerCase()] = (url, data, headers) => {
        if (Config.SHOW_DEBUG_API) {
            let dbgInp = {
                "type": "http",
                "proc": ">",
                "url": `/api${url}`,
                "method": method,
                "headers": headers,
                "data": data,
            }
            console.log(dbgInp)
        }

        const formData =
            data &&
            Object.keys(data).reduce((result, key) => {
                result.append(key, data[key]);

                return result;
            }, new FormData());

        // // axios.defaults.baseURL = 'http://myurl';
        // // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        // axios.defaults.headers.post['Access-Control-Allow-Methods'] ='GET, PUT, POST, DELETE, OPTIONS';
        // return axios({
        //     method: method,
        //     url: `${Config.SERVER_BASE_URL}/api${url}`,
        //     headers: headers,
        //     data: formData,
        //     withCredentials: false,
        // })
        //     .then((response) =>
        //      {
        //          console.log(response)
        //             if (Config.SHOW_DEBUG_API) {
        //                 let dbgOut = {
        //                     "type": "http",
        //                     "proc": "<",
        //                     "url": `/api${url}`,
        //                     "data": response.data
        //                 }
        //                 console.log(dbgOut)
        //             }
        //
        //             return ({
        //                 body: response.data,
        //                 isError: response.status !== 200,
        //             })
        //         }
        // )

        return fetch(`${Config.SERVER_BASE_URL}/api${url}`, {
            method,
            headers,
            body: formData,
        })
            .then((response) =>
                response.json().then(function (body) {
                        if (Config.SHOW_DEBUG_API) {
                            let dbgOut = {
                                "type": "http",
                                "proc": "<",
                                "url": `/api${url}`,
                                "data": body
                            }
                            console.log(dbgOut)
                        }

                        return ({
                            body: body,
                            isError: response.status !== 200,
                        })
                    }
                )
            )
            .then(({body, isError}) => {
                if (isError) {
                    throw body;
                }

                return body;
            });
    };
});

export default http;
