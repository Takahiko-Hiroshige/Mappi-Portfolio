/**
 *【Redux Toolkit基本構成】
 * ユーザーの入力から、ActionCreatorがActionを作成する
 * StoreへActionをDispatch（送信）する
 * DispatchされたActionをReducerへ渡す
 * Reducerが作成した新しいStateをStoreが保存する
 * Storeからデータを参照してViewに描画する
 */

/**
 * Action Creator
 * Actionを作るためのロジック
 */

/**
 * Action
 * Store内の値を変更するために発行される処理
 * オブジェクト
 * {type:"文字列", payload（任意）}
 */

/**
 * createSliceでは、action type文字列、ActionCreator関数、actionオブジェクトの生成
 * 下記でいくとactionのTypeは"isOpenErrorModal/ErrorEvent"となる
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
