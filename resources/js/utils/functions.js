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
     * @param {string} str 挿入させる文字列
     * @param {integer} idx 挿入する箇所
     * @param {string} val 挿入する文字列
     */
    strIns: (str, idx, val) => {
        const res = str.slice(0, idx) + val + str.slice(idx);
        return res;
    },
    /**
     * 【電話番号にハイフンを付与】
     * @param {integer} phoneNumber 電話番号
     */
    addHyphenPhoneNumber: (phoneNumber) => {
        if (!/^[0-9]+$/.test(phoneNumber) || phoneNumber.length > 17) {
            return "";
        }
        const region = "JP";
        const util = PhoneNumberUtil.getInstance();
        const number = util.parseAndKeepRawInput(phoneNumber, region) || "";
        if (!util.isValidNumberForRegion(number, region)) {
            return "";
        }
        return util.format(number, PhoneNumberFormat.NATIONAL);
    },
    /**
     * 【添付画像をブラウザに一時保存（URL生成）】
     * ファイル名とファイルパスをObjectで返す
     * @param {array} imageFiles 添付画像：e.value.files
     */
    createImageFilePath: (imageFiles) => {
        const fileObject = imageFiles[0];
        const fileName = fileObject.name;
        return {
            fileName: fileName,
            filePath: window.URL.createObjectURL(fileObject),
        };
    },
    /**
     * 【添付画像をブラウザから削除】
     * @param {string} imageFileObj createImageFilePathで返されるObj形式で渡す
     */
    deleteImageFilePath: (imageFileObj) => {
        window.URL.revokeObjectURL(imageFileObj.filePath);
    },
};
