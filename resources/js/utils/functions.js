/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/07
 */
/**
 *import Library
 */
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

export const funcs = {
    /**
     * 【文字列の挿入】
     * @param {str} str 挿入させる文字列
     * @param {idx} int 挿入する箇所
     * @param {val} str 挿入する文字列
     */
    strIns: (str, idx, val) => {
        const res = str.slice(0, idx) + val + str.slice(idx);
        return res;
    },
    /**
     * 【電話番号にハイフンを付与】
     * @param {phoneNumber} int 電話番号
     */
    addHyphenPhoneNumber: (phoneNumber) => {
        const region = "JP";
        const util = PhoneNumberUtil.getInstance();
        const number = util.parseAndKeepRawInput(phoneNumber, region);
        if (!util.isValidNumberForRegion(number, region)) {
            return null;
        }
        return util.format(number, PhoneNumberFormat.NATIONAL);
    },
};
