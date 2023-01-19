/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/01
 */

import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    isDisplay: false,
};

export const reactSppinerSlice = createSlice({
    name: "isDisplaySppiner",
    initialState: {
        value: { ...initialStateObj },
    },
    reducers: {
        displaySppiner: (state, action) => {
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
export const { displaySppiner } = reactSppinerSlice.actions;
// storeでimport
export default reactSppinerSlice.reducer;
