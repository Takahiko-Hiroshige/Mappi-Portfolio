import axios from "axios";
/**
 *DB登録処理の共通関数
 * @param {String} apiPath APIのPath
 * @param {Object} data 登録データ
 * @param {function} setError セットエラー関数
 * @param {function} beforeExecFunc 登録処理前の実行関数
 * @param {function} afterExecFunc 登録処理後の実行関数
 * @param {function} afterSuccessFunc 登録処理完了後の実行関数
 */

export const registerExec = async ({
    apiPath,
    data,
    headers,
    setError,
    beforeExecFunc = () => {},
    afterExecFunc = () => {},
    afterSuccessFunc = () => {},
}) => {
    const params = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const setKey = `${key}[]`;
            data[key].map((item) => {
                params.append(setKey, item);
            });
        } else {
            const setKey = key;
            params.append(setKey, value);
        }
    });
    beforeExecFunc();
    await axios.post(apiPath, params, headers).then((res) => {
        if (res.data.failedValidation) {
            /**バッグ側のバリデーションで引っかかった場合、setErrorに渡す */
            Object.entries(res.data.errors).forEach(([key, value]) => {
                setError(key, {
                    type: "failedValidation",
                    message: value[0],
                });
            });
        } else {
            afterSuccessFunc();
        }
    });
    afterExecFunc();
};
