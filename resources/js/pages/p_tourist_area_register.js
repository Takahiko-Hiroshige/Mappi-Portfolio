/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React, { useState } from "react";
/**
 *import components
 */
import TouristAreaRegisterInput from "../layouts/l_tourist_area_register_input_form.js";
import TouristAreaRegisterConfirm from "../layouts/l_tourist_area_register_confirm.js";

const TouristAreaRegisterForm = () => {
    const [imageArray, setImageArray] = useState([]);
    const [displayImage, setDisplayImage] = useState("");
    const [touristAreaName, setTouristAreaName] = useState("");
    const [touristAreaCatchPhrase, setTouristAreaCatchPhrase] = useState("");
    const [touristAreaDeTail, setTouristAreaDeTail] = useState("");
    const [categoryListSelectValue, setCategoryListSelectValue] = useState([]);

    return (
        <div className="bg-zinc-50">
            <div className="flex flex-row w-full">
                {/* イメージ@観光地登録画面 */}
                <div className="flex-1 h-screen w-screen flex justify-center items-center">
                    <TouristAreaRegisterConfirm
                        displayImage={displayImage}
                        imageArray={imageArray}
                        touristAreaName={touristAreaName}
                        touristAreaCatchPhrase={touristAreaCatchPhrase}
                        touristAreaDeTail={touristAreaDeTail}
                        categoryListSelectValue={categoryListSelectValue}
                    />
                </div>
                {/* 入力フォーム@観光地登録画面 */}
                <div className="flex-1 h-screen bg-white overflow-scroll w-32">
                    <TouristAreaRegisterInput
                        setDisplayImage={setDisplayImage}
                        imageArray={imageArray}
                        setImageArray={setImageArray}
                        setTouristAreaName={setTouristAreaName}
                        setTouristAreaCatchPhrase={setTouristAreaCatchPhrase}
                        setTouristAreaDeTail={setTouristAreaDeTail}
                        setCategoryListSelectValue={setCategoryListSelectValue}
                        categoryListSelectValue={categoryListSelectValue}
                    />
                </div>
            </div>
        </div>
    );
};

export default TouristAreaRegisterForm;
