/*TODO::レスポンシブ対応が難しいため表示方法を検討中*
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
import TouristAreaRegisterInputForm from "../layouts/l_tourist_area_register_input_form.js";
import TouristAreaRegisterConfirm from "../layouts/l_tourist_area_register_confirm.js";

const TouristAreaRegister = () => {
    const [imageArray, setImageArray] = useState([]);
    const [displayImage, setDisplayImage] = useState("");
    const [touristAreaName, setTouristAreaName] = useState("");
    const [touristAreaCatchPhrase, setTouristAreaCatchPhrase] = useState("");
    const [touristAreaDeTail, setTouristAreaDeTail] = useState("");
    const [categoryListSelectValue, setCategoryListSelectValue] = useState([]);

    return (
        <div>
            <div className="flex mt-3">
                {/* 入力フォーム@観光地登録画面 */}
                <div className="flex w-1/2 justify-end mr-5 ml-3">
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
                {/* イメージ@観光地登録画面 */}
                <div className="flex w-1/2 justify-start ml-5 mr-3">
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
// flex-1 h-screen w-screen flex justify-center items-center
