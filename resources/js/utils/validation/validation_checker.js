/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */
/**
 * カスタムバリデーションチェック関数を共通化
 */
/**
 *import Library
 */
import { PhoneNumberUtil } from "google-libphonenumber";
import isUrl from "is-url";

export const validationChecker = {
    /**
     *整数チェック関数
     * @param {*} value 判定対象
     * @returns boolean
     */
    integer: (value) => {
        const judge = /^[0-9]+$/.test(value);
        return judge;
    },
    /**
     *画像チェック関数-渡されたファイルが画像か判定-
     * @param {*} file 判定対象
     * @returns boolean
     */
    imageFile: (file) => {
        const files = file;
        if (!files || files.length === 0) return;
        const fileObject = file[0];
        const judge = /image/.test(fileObject.type);
        return judge;
    },
    /**
     *URLチェック関数-URL形式か判定-
     * @param {string} value 判定対象
     * @returns boolean
     */
    url: (value) => {
        const judge = isUrl(value);
        return judge;
    },
    /**
     *電話番号チェック関数-電話番号形式か判定-
     * @param {integer} value 判定対象
     * @returns boolean
     */
    phoneNumber: (value) => {
        let judge = false;
        if (!/^[0-9]+$/.test(value) || value.length > 17) {
            return judge;
        }
        try {
            const region = "JP";
            const util = PhoneNumberUtil.getInstance();
            const number = util.parse(value, region);
            judge = util.isValidNumber(number);
            return judge;
        } catch {
            return judge;
        }
    },
    /**
     *選択済みチェック関数-selectboxなどの選択項目が選択されているか判定-
     * @param {*} cheackItemArray {value, name, message} 判定対象
     * @param {function} setError setError関数
     * @returns boolean
     */
    selectItem: (cheackItemArray, setError) => {
        cheackItemArray.forEach((item) => {
            if (!item.value || item.value.length === 0) {
                setError(item.name, {
                    type: "noSelect",
                    message: item.message,
                });
            }
        });
    },
};
