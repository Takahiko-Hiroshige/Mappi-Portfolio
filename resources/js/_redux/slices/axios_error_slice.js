/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/01
 */
/**
 *【Redux Toolkit基本構成】
 * ユーザーの入力から、ActionCreatorがActionを作成する
 * StoreへActionをDispatch（送信）する
 * DispatchされたActionをReducerへ渡す
 * Reducerが作成した新しいStateをStoreが保存する
 * Storeからデータを参照してViewに描画する
 */
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    isOpen: false,
    status: "",
    statusText: "",
    errorInfo: "",
    errorExecApiUrl: "",
};

export const axiosErrorSlice = createSlice({
    name: "isOpenErrorModal",
    initialState: {
        value: { ...initialStateObj },
    },
    reducers: {
        ErrorEvent: (state, action) => {
            state.value = !action.payload
                ? { ...initialStateObj }
                : action.payload;
        },
    },
});

/**
 * actionとreducerをexportする
 */
// ActionをDispatchファイルでimport
export const { ErrorEvent } = axiosErrorSlice.actions;
// storeでimport
export default axiosErrorSlice.reducer;
