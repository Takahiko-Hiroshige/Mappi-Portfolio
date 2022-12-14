/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/09
 */
/**
 *import Library
 */
import React from "react";
/**
 *import components
 */
import ImageSwiper from "../../components/c_image_slider.js";
import CategoryChip from "../../components/common/c_category_chip.js";
/**
 *import functions
 */
import { funcs } from "../../utils/functions.js";
import { useWindow } from "../../utils/custom_hooks/useWindow.js";

const TouristAreaDitailDisplay = (props) => {
    const {
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
        cityListSelectValue,
        postal,
        numberAddress,
        otherAddress,
        phoneNumber,
        relationUrl,
    } = props;

    const hyphenPostal = postal ? funcs.strIns(postal, 3, "-") : "";
    const addressAllInfo = hyphenPostal
        ? [
              "〒",
              hyphenPostal,
              "　",
              "福岡県",
              cityListSelectValue.label,
              numberAddress,
              otherAddress,
          ].join("")
        : "";
    const hyphenPhoneNumber = phoneNumber
        ? funcs.addHyphenPhoneNumber(phoneNumber)
        : "";

    // TODO::端末ごとに変数で値を定義させる
    const windowSize = useWindow();
    const windowWidthSize = windowSize.width;
    let mulValue = 1.0;
    if (windowWidthSize < 1200 && windowWidthSize > 900) {
        mulValue = 1.5;
    } else if (windowWidthSize < 900 && windowWidthSize > 500) {
        mulValue = 2.0;
    } else if (windowWidthSize < 500) {
        mulValue = 3.0;
    }

    return (
        <div className="w-full">
            <div className="mt-2 mb-3 flex justify-center items-center">
                <ImageSwiper
                    imageArray={imageArray}
                    displayPattern="wide"
                    multiplication={true}
                    mulValue={mulValue}
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="flex w-[70%] max-w-[850px] min-w-[270px] justify-center items-center border-l-2 border-r-2">
                    <div className="flex-col w-full p-2 bg-slate-50">
                        <div
                            className={
                                "mb-2 truncate h-9 max-h-9 overflow-auto"
                            }
                        >
                            <CategoryChip
                                categories={categoryListSelectValue}
                                size={"medium"}
                            />
                        </div>
                        <div>
                            <p className="text-2xl text-gray-900 font-bold">
                                {touristAreaCatchPhrase}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="touristAreaInfo"
                                className="block mb-1 text-sm font-medium font-bold text-blue-900"
                            >
                                ➤観光地情報
                            </label>
                            <p className="ml-3 mb-1 block text-1xl text-gray-700 font-bold">
                                {touristAreaName}
                            </p>
                        </div>
                        <div>
                            <p className="ml-3 text-gray-700">
                                {addressAllInfo}
                            </p>
                            <p className="ml-3 text-gray-700">
                                {hyphenPhoneNumber
                                    ? `TEL:${hyphenPhoneNumber}`
                                    : ""}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="touristAreaDetail"
                                className="block mb-1 text-sm font-medium font-bold text-blue-900"
                            >
                                ➤観光地概要
                            </label>
                            <p className="whitespace-pre-wrap ml-3 text-gray-600">
                                {touristAreaDeTail}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="touristAreaRelationUrl"
                                className="block mb-1 text-sm font-medium font-bold text-blue-900"
                            >
                                ➤関連サイトURL
                            </label>
                            <div>
                                <a
                                    href={relationUrl}
                                    target="_blank"
                                    className="ml-3 break-words text-sm font-medium"
                                >
                                    {relationUrl}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristAreaDitailDisplay;
