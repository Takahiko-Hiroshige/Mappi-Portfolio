/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/01
 */
import { configureStore } from "@reduxjs/toolkit";
import axiosErrorReducer from "./slices/axios_error_slice.js";
import displaySppinerReducer from "./slices/react_sppiner_slice.js";
import touristAreaRegisterDataReducer from "./slices/tourist_area_register_data_slice.js";
// 各reducerを格納
const reducers = {
    isOpen: axiosErrorReducer,
    isDisplaySppiner: displaySppinerReducer,
    touristAreaRegisterData: touristAreaRegisterDataReducer,
};

export const store = configureStore({
    reducer: reducers,
});
