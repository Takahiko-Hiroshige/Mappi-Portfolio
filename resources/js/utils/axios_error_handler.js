import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { ErrorEvent } from "../redux/slices/axios_error_slice.js";

/*intercept*
 * You can intercept requests or responses before they are handled by then or catch.
 * https://axios-http.com/docs/interceptors
 */

export const AxiosErrorHandleProvider = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // // Add a request interceptor
        axios.interceptors.request.use(
            (config) => {
                // Do something before request is sent
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        /**
         * axsiosの非同期通信によるエラーハンドリング
         */
        // Add a response interceptor
        axios.interceptors.response.use(
            (response) => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            (error) => {
                const ErrorData = {
                    isOpen: true,
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    errorInfo: error.response?.data?.error,
                    errorExecApi: error.response?.request?.responseURL,
                };
                dispatch(ErrorEvent(ErrorData));
                console.error("axiosによるAPI通信でエラーが発生しました");
                console.error(error.response);
                // switch (error.response?.status) {
                //     case 404:
                //         return Promise.reject(error.response?.data);
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                // switch (error.response?.status) {
                //     case 422: // ステータスコード別の処理
                //         // Promise reject オブジェクトを必ずリターンする
                //         return Promise.reject(error.response?.data);
                //     case 404:
                //         console.error(error.response);
                //         // ステータスコード別の処理
                //         return Promise.reject(error.response?.data);
                //     case 500: // ステータスコード別の処理
                //         return Promise.reject(error.response?.data);
                //     default: // デフォルトの処理
                //         return Promise.reject(error.response?.data);
                // }
            }
        );
    }, []);
    return <>{children}</>;
};
