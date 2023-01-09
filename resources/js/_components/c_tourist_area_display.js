/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/10
 */

/**
 *import Library
 */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
/**
 *import components
 */
import ModalFrame from "./common/c_modal_frame.js";
import TouristAreaDitailModal from "../_modals/m_tourist_area_ditail_modal.js";
import CategoryChip from "./common/c_category_chip.js";
/**
 *import file
 */
import noImage from "/var/www/html/public/images/noImage.png";

const TouristAreaDisplay = (props) => {
    const {
        image,
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
    } = props;

    const [goodState, setGoodState] = useState(false);
    const [goodCount, setGoodCount] = useState(123456);
    const [
        touristAreaDitailModalSelectTab,
        setTouristAreaDitailModalSelectTab,
    ] = useState("");
    const [isOpenTouristAreaDitailModal, setIsOpenTouristAreaDitailModal] =
        useState(false);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-1/3 min-w-[350px] max-w-[445px]">
                <Card className="w-full border rounded-lg">
                    <CardHeader
                        className="relative h-56 m-2 cursor-pointer"
                        onClick={() => {
                            setTouristAreaDitailModalSelectTab(0);
                            setIsOpenTouristAreaDitailModal(true);
                        }}
                    >
                        <img
                            src={image || noImage}
                            className={"h-full w-full object-cover"}
                        />
                        <div className="absolute h-7 bottom-0 w-full bg-gradient-to-r from-neutral-400">
                            <p
                                className={
                                    "font-bold text-lg text-white ml-2 truncate"
                                }
                            >
                                {touristAreaName}
                            </p>
                        </div>
                    </CardHeader>
                    <CardBody
                        className="p-1 text-left cursor-pointer"
                        onClick={() => {
                            setTouristAreaDitailModalSelectTab(0);
                            setIsOpenTouristAreaDitailModal(true);
                        }}
                    >
                        <div className={"mb-2 truncate h-7 max-h-7 border-b"}>
                            <CategoryChip
                                categories={categoryListSelectValue}
                            />
                        </div>
                        <Typography
                            variant="h5"
                            className={
                                "mb-2 mt-1 pl-2 pr-2 font-sans truncate h-5 max-h-5"
                            }
                        >
                            {touristAreaCatchPhrase}
                        </Typography>
                        <Typography
                            className={
                                "h-20 pl-2 pr-2 max-h-20 min-h-20 text-gray-600 truncate whitespace-pre-wrap line-clamp-3"
                            }
                        >
                            {touristAreaDetail}
                        </Typography>
                    </CardBody>
                    <CardFooter divider className="h-12 flex py-3">
                        <div className="flex justify-start items-center">
                            {goodState ? (
                                <IconButton
                                    onClick={() => {
                                        setGoodState(!goodState);
                                        setGoodCount(123456);
                                    }}
                                >
                                    <ThumbUpOffAltRoundedIcon
                                        color={"primary"}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setGoodState(!goodState);
                                        setGoodCount(goodCount + 1);
                                    }}
                                >
                                    <ThumbUpOffAltOutlinedIcon />
                                </IconButton>
                            )}
                            {goodCount.toLocaleString()}
                        </div>
                        <div className="w-full flex justify-end items-center">
                            <IconButton
                                onClick={() => {
                                    setTouristAreaDitailModalSelectTab(1);
                                    setIsOpenTouristAreaDitailModal(true);
                                }}
                            >
                                <TextsmsOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setTouristAreaDitailModalSelectTab(2);
                                    setIsOpenTouristAreaDitailModal(true);
                                }}
                            >
                                <LocationOnOutlinedIcon />
                            </IconButton>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <ModalFrame
                    setIsOpen={setIsOpenTouristAreaDitailModal}
                    isOpen={isOpenTouristAreaDitailModal}
                    element={
                        <TouristAreaDitailModal
                            setIsOpen={setIsOpenTouristAreaDitailModal}
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
                            tab={touristAreaDitailModalSelectTab}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default TouristAreaDisplay;
