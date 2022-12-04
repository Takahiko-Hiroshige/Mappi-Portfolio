/*
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
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
import TouristAreaRegisterInputForm from "../layouts/l_tourist_area_register_input_form.js";
import TouristAreaRegisterConfirm from "../layouts/l_tourist_area_register_confirm.js";

const TouristAreaRegister = () => {
    const [selectDisplayValue, setSelectDisplayValue] = useState(0);
    const [imageArray, setImageArray] = useState([]);
    const [displayImage, setDisplayImage] = useState("");
    const [touristAreaName, setTouristAreaName] = useState("");
    const [touristAreaCatchPhrase, setTouristAreaCatchPhrase] = useState("");
    const [touristAreaDeTail, setTouristAreaDeTail] = useState("");
    const [categoryListSelectValue, setCategoryListSelectValue] = useState([]);

    const handleChangeDisplay = (e, displayValue) => {
        setSelectDisplayValue(displayValue);
    };

    return (
        <div>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs
                    value={selectDisplayValue}
                    onChange={handleChangeDisplay}
                    centered
                >
                    <Tab label="入力フォーム" />
                    <Tab label="サンプル" />
                </Tabs>
            </Box>
            <div className="mt-3">
                {/* 入力フォーム@観光地登録画面 */}
                <div
                    className="flex justify-center items-center"
                    hidden={selectDisplayValue !== 0}
                >
                    <TouristAreaRegisterInputForm
                        displayImage={displayImage}
                        setDisplayImage={setDisplayImage}
                        imageArray={imageArray}
                        setImageArray={setImageArray}
                        touristAreaName={touristAreaName}
                        setTouristAreaName={setTouristAreaName}
                        touristAreaCatchPhrase={touristAreaCatchPhrase}
                        setTouristAreaCatchPhrase={setTouristAreaCatchPhrase}
                        touristAreaDeTail={touristAreaDeTail}
                        setTouristAreaDeTail={setTouristAreaDeTail}
                        categoryListSelectValue={categoryListSelectValue}
                        setCategoryListSelectValue={setCategoryListSelectValue}
                    />
                </div>
                <div
                    className="flex justify-center items-center"
                    hidden={selectDisplayValue !== 1}
                >
                    <TouristAreaRegisterConfirm
                        displayImage={displayImage}
                        imageArray={imageArray}
                        touristAreaName={touristAreaName}
                        touristAreaCatchPhrase={touristAreaCatchPhrase}
                        touristAreaDeTail={touristAreaDeTail}
                        categoryListSelectValue={categoryListSelectValue}
                    />
                </div>
            </div>
        </div>
    );
};

export default TouristAreaRegister;
