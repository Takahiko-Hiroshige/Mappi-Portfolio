/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/08
 */
import React from "react";
import Select from "react-select";

const selectBox = (props) => {
    const {
        isDisabled = false /**検索可否 */,
        isLoading = false /**ロード表示 */,
        isClearable = false /**検索値削除可否 */,
        isRtl = false /**左右調整 */,
        isSearchable = false /**検索機能付与（入力可否）*/,
        isMulti = false /**複数選択 */,
        options /*【必須】*選択リスト*/,
        value /*【必須】*選択値*/,
        getOptionValue /*【必須】*検索一致ワード設定*/,
        placeholder /**プレースホルダー */,
        setSelectValue /*【必須】*useStateのセット関数*/,
    } = props;

    return (
        <div>
            <Select
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                isMulti={isMulti}
                options={options}
                value={value}
                placeholder={placeholder}
                getOptionValue={getOptionValue}
                /**
                 * ※isMulti=trueの場合、eventは配列
                 */
                onChange={(e) => {
                    setSelectValue(e);
                }}
            />
        </div>
    );
};

export default selectBox;
