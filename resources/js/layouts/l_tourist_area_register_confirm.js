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
import TouristAreaDisplay from "../components/l_tourist_area_display.js";

const TouristAreaRegisterConfirm = (props) => {
    const {
        displayImage,
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
    } = props;

    return (
        <div className="w-[90%] m-5">
            <div className="mb-24 flex justify-center items-center">
                <TouristAreaDisplay
                    image={displayImage.filePath || imageArray[0]?.filePath}
                    touristAreaName={touristAreaName}
                    touristAreaCatchPhrase={touristAreaCatchPhrase}
                    touristAreaDeTail={touristAreaDeTail}
                    categoryListSelectValue={categoryListSelectValue}
                />
            </div>
            <div className="flex justify-center items-center">
                <ImageSwiper
                    imageArray={imageArray}
                    imageSize={2.0}
                    optionsProps={{
                        slidesPerView: 2,
                        autoplay: { isAutoplay: true },
                    }}
                />
            </div>
        </div>
    );
};

export default TouristAreaRegisterConfirm;
