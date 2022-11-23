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
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
    } = props;

    return (
        <div>
            <div className="mb-24 flex justify-center items-center">
                <TouristAreaDisplay
                    image={imageArray[0]}
                    touristAreaName={touristAreaName}
                    touristAreaCatchPhrase={touristAreaCatchPhrase}
                    touristAreaDeTail={touristAreaDeTail}
                    categoryListSelectValue={categoryListSelectValue}
                />
            </div>
            <div>
                <ImageSwiper
                    imageArray={imageArray}
                    imageSize={1.5}
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
