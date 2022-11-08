/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/01
 */
import { configureStore } from "@reduxjs/toolkit";
import axiosErrorReducer from "./slices/axios_error_slice.js";

// 各reducerを格納
const reducers = {
    isOpen: axiosErrorReducer,
};

export const store = configureStore({
    reducer: reducers,
});
