/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/14
 */
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    displayImage: "",
    imageArray: [],
    touristAreaName: "",
    touristAreaCatchPhrase: "",
    touristAreaDetail: "",
    categoryListSelectValue: [],
    cityListSelectValue: "",
    postal: "",
    numberAddress: "",
    otherAddress: "",
    phoneNumber: "",
    relationUrl: "",
};

export const touristAreaRegisterDataSlice = createSlice({
    name: "touristAreaRegisterData",
    initialState: {
        value: { ...initialStateObj },
    },
    reducers: {
        setTouristAreaRegisterData: (state, action) => {
            state.value = !action.payload
                ? { ...initialStateObj }
                : action.payload;
        },
    },
});

/**
 * actionとreducerをexportする
 */
// ActionをDispatch実行ファイルでimport
export const { setTouristAreaRegisterData } =
    touristAreaRegisterDataSlice.actions;
// Storeでimport
export default touristAreaRegisterDataSlice.reducer;
