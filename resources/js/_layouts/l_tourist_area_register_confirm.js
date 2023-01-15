/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React from "react";
/**
 *ReduxTools
 */
import { useSelector } from "react-redux";
/**
 *import components
 */
import ImageSwiper from "../_components/c_image_slider.js";
import TouristAreaDisplay from "../_components/c_tourist_area_display.js";
/**
 *import custom_hooks
 */
import { useWindow } from "../utils/custom_hooks/useWindow.js";

const TouristAreaRegisterConfirm = () => {
    // storeを監視
    const touristAreaRegisterData = useSelector(
        (state) => state.touristAreaRegisterData.value
    );
    const {
        displayImage,
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
    } = touristAreaRegisterData;

    const windowSize = useWindow();
    const windowWidthSize = windowSize.width;
    let mulValue = 1;
    if (windowWidthSize > 900) {
        mulValue = 1.5;
    } else if (windowWidthSize < 900 && windowWidthSize > 500) {
        mulValue = 2.0;
    } else if (windowWidthSize < 500) {
        mulValue = 2.5;
    }

    return (
        <div className="w-[90%] mt-3">
            <p className="flex justify-center items-center">
                ※表示させる端末などで表示状態は変動します
            </p>
            <div className="mb-5 flex justify-center items-center">
                <TouristAreaDisplay
                    image={displayImage?.filePath || imageArray[0]?.filePath}
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
            <div className="flex justify-center items-center mb-5">
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
