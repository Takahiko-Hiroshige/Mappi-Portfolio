/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/19
 */

/**
 *import Library
 */
import React from "react";
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
        imageSize /**【必須】画像サイズ */,
        imageArray /**【必須】画像 型:配列 */,
        optionsProps,
    } = props;

    const {
        speed = 1000 /**スライド速度 */,
        slidesPerView = 2 /**表示枚数 （例）2の場合: 0.5 1.0 0.5形式で表示 */,
        spaceBetween = 10 /**画像同士の間隔 */,
        autoplay,
    } = optionsProps;

    /**黄金比 */
    const width = 860 / imageSize;
    const height = 532 / imageSize / 2;

    const {
        isAutoplay = false /**自動スクロール判定*/,
        autoplayDelay = 3000 /**isAutoplayがtrueの際のdefault値*/,
    } = autoplay;

    const options = {
        init: true,
        speed: speed,
        slidesPerView: slidesPerView,
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
        className: "mySwiper",
    };

    if (isAutoplay) {
        options["autoplay"] = {
            delay: autoplayDelay,
            disableOnInteraction: false,
        };
    }

    const sliderBoxStyle = {
        width: `${width}px`,
        height: `${height}px`,
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
