/**
 * 削除予定
 *Created:T.HIROSHIGE
 *Created At:2022/11/08
 *Access::http://localhost:8000/searchBoxSample
 */
/**
 *import Library
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
/**
 *import components
 */
import SelectBox from "../components/common/c_select_box.js";

const SearchBoxSample = () => {
    const area = "福岡県";
    const [selectValue, setSelectValue] = useState([]);
    const [options, setOptions] = useState([]);

    // 福岡県の市町村を取得[API]
    useEffect(() => {
        axios
            .get(
                `http://geoapi.heartrails.com/api/json?method=getCities&prefectur=${area}`
            )
            .then((res) => {
                const location = res.data.response.location;
                const cityList = location.map((obj, index) => {
                    return {
                        id: index,
                        label: obj.city,
                        value: obj.city,
                        cityKana: obj.city_kana,
                    };
                });
                setOptions(cityList);
            });
    }, []);

    return (
        <div>
            <div className="container">
                {/* SelectBox */}
                <div className="w-72 p-10">
                    <SelectBox
                        setSelectValue={setSelectValue}
                        options={options}
                        value={selectValue}
                        isMulti={true}
                        isSearchable={true}
                        placeholder="...市町村"
                        getOptionValue={(option) =>
                            option.label + option.cityKana
                        }
                    />
                </div>
                {/* 選択値の表示 */}
                {selectValue.map((obj) => (
                    <h1 key={obj.id}>{obj.value}</h1>
                ))}
            </div>
        </div>
    );
};

export default SearchBoxSample;
