import axios from "axios";
/**
 *DB登録処理の共通関数
 * @param {String} apiPath APIのPath
 * @param {Object} data 登録データ
 * @param {function} setError セットエラー関数
 * @param {function} func 登録処理完了後の実行関数
 */
export const registerExec = async ({
    apiPath,
    data,
    headers,
    setError,
    func = () => {},
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
    await axios.post(apiPath, params, headers).then((res) => {
        if (res.data.failedValidation) {
            Object.entries(res.data.errors).forEach(([key, value]) => {
                setError(key, {
                    type: "failedValidation",
                    message: value[0],
                });
            });
        } else {
            func();
        }
    });
};
