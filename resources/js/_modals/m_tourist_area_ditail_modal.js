/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/06
 */
/**
 *import Library
 */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
/**
 *import components
 */
import TouristAreaDitailDisplay from "./modal_layouts/ml_tourist_area_detail_display.js";
import Map from "./modal_layouts/ml_tourist_area_detail_map.js";

const TouristAreaDitailModal = (props) => {
    const {
        setIsOpen,
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDetail,
        categoryListSelectValue,
        cityListSelectValue,
        cityListOptions,
        postal,
        numberAddress,
        otherAddress,
        phoneNumber,
        relationUrl,
        tab,
    } = props;

    const [selectDisplayValue, setSelectDisplayValue] = useState(tab);

    const addressAllInfo = `福岡県${cityListSelectValue.label}${numberAddress}${otherAddress}`;
    const handleChangeDisplay = (e, displayValue) => {
        setSelectDisplayValue(displayValue);
    };

    return (
        <div className="w-full h-full bg-slate-50">
            <div>
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs
                        value={selectDisplayValue}
                        onChange={handleChangeDisplay}
                    >
                        <Tab label="詳細内容" />
                        <Tab label="コメント" />
                        <Tab label="Map" />
                    </Tabs>
                </Box>
            </div>
            <div
                className="w-full h-[85%] overflow-auto"
                hidden={selectDisplayValue !== 0}
            >
                <TouristAreaDitailDisplay
                    imageArray={imageArray}
                    touristAreaName={touristAreaName}
                    touristAreaCatchPhrase={touristAreaCatchPhrase}
                    touristAreaDetail={touristAreaDetail}
                    categoryListSelectValue={categoryListSelectValue}
                    cityListSelectValue={cityListSelectValue}
                    cityListOptions={cityListOptions}
                    postal={postal}
                    numberAddress={numberAddress}
                    otherAddress={otherAddress}
                    phoneNumber={phoneNumber}
                    relationUrl={relationUrl}
                />
            </div>
            <div className="w-full h-[85%]" hidden={selectDisplayValue !== 2}>
                {addressAllInfo.includes("undefined") ? (
                    <p className="text-1xl font-bold">
                        住所が登録されていないためこちらの機能は利用できません
                    </p>
                ) : (
                    <Map address={addressAllInfo} />
                )}
            </div>
            <div className="w-full flex justify-center items-center absolute bottom-4 mt-3">
                <button
                    className="flex justify-center items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded text-sm font-bold"
                    onClick={() => setIsOpen(false)}
                >
                    閉じる
                </button>
            </div>
        </div>
    );
};

export default TouristAreaDitailModal;
