/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React from "react";
/**
 *import components
 */
import ImageSwiper from "../components/c_image_slider.js";
import TouristAreaDisplay from "../components/c_tourist_area_display.js";
/**
 *import functions
 */
import { getWindowSize } from "../utils/window_dimensions.js";

const TouristAreaRegisterConfirm = (props) => {
    const {
        displayImage,
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
    } = props;

    const windowWidth = getWindowSize().width;
    const mulValue = windowWidth > 900 ? 1.5 : 2;

    return (
        <div className="w-[90%] mt-3">
            <p className="flex justify-center items-center">
                ※表示させる端末などで表示状態は変動します
            </p>
            <div className="mb-5 flex justify-center items-center">
                <TouristAreaDisplay
                    image={displayImage.filePath || imageArray[0]?.filePath}
                    touristAreaName={touristAreaName}
                    touristAreaCatchPhrase={touristAreaCatchPhrase}
                    touristAreaDeTail={touristAreaDeTail}
                    categoryListSelectValue={categoryListSelectValue}
                />
            </div>
            <div
                className="flex justify-center items-center mb-5"
                hidden={windowWidth <= 550}
            >
                <ImageSwiper
                    imageArray={imageArray}
                    displayPattern="wide"
                    multiplication={true}
                    mulValue={mulValue}
                />
            </div>
        </div>
    );
};

export default TouristAreaRegisterConfirm;
