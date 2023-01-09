/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/19
 */

/**
 *import Library
 */
import React, { useEffect } from "react";
import SwiperCore, {
    EffectCoverflow,
    Pagination,
    Navigation,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
/**
 *import file
 */
import noImage from "/var/www/html/public/images/noImage.png";

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

const ImageSwiper = (props) => {
    const {
        displayPattern = "normal" /**normal|wide */,
        width = 860,
        height = 532,
        multiplication = false /**掛け算 */,
        mulValue /**乗数 */,
        division = false /**割り算 */,
        divValue /**除数 */,
        imageArray /**【必須】画像 型:配列 */,
        optionsProps = {},
    } = props;

    if (displayPattern !== "normal" && displayPattern !== "wide") {
        console.error(
            "displayPatternは[normal]または[wide]のどちらかを選択してください"
        );
        return;
    }
    const {
        speed = 1000 /**スライド速度 */,
        spaceBetween = 10 /**画像同士の間隔 */,
        autoplay = {},
    } = optionsProps;

    let normalPatternSize = {};
    let widePatternSize = {};

    if (multiplication) {
        normalPatternSize = {
            width: width / mulValue,
            height: height / mulValue,
        };
        widePatternSize = {
            width: width / mulValue,
            height: height / mulValue / 2,
        };
    } else if (division) {
        normalPatternSize = {
            width: width * divValue,
            height: height * divValue,
        };
        widePatternSize = {
            width: width * divValue,
            height: (height * divValue) / 2,
        };
    } else {
        normalPatternSize = { width, height };
        widePatternSize = { width, height };
    }

    const { width: setWidth, height: setHeight } =
        displayPattern === "normal" ? normalPatternSize : widePatternSize;

    const {
        isAutoplay = false /**自動スクロール判定*/,
        autoplayDelay = 3000 /**isAutoplayがtrueの際のdefault値*/,
    } = autoplay;

    const options = {
        init: true,
        speed: speed,
        slidesPerView: displayPattern === "normal" ? 1 : 2,
        spaceBetween: spaceBetween,
        loop: true,
        paginationclickable: "true",
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        parallax: true,
        pagination: {
            clickable: true,
        },
        navigation: {
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
        },
        observer: true,
        observeParents: true,
        className: "mySwiper",
    };

    if (isAutoplay) {
        options["autoplay"] = {
            delay: autoplayDelay,
            disableOnInteraction: false,
        };
    }

    const sliderBoxStyle = {
        width: `${setWidth}px`,
        height: `${setHeight}px`,
    };

    return (
        <div style={sliderBoxStyle}>
            <Swiper {...options}>
                {imageArray.length === 0 ? (
                    <SwiperSlide>
                        <img src={noImage} style={{ ...sliderBoxStyle }} />
                    </SwiperSlide>
                ) : (
                    imageArray.map((image) => (
                        <SwiperSlide key={image.fileName}>
                            <img
                                src={image.filePath}
                                style={{ ...sliderBoxStyle }}
                            />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default ImageSwiper;
