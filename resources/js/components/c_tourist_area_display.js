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
import CategoryChip from "./common/c_category_chip.js";
/**
 *import file
 */
import noImage from "/var/www/html/public/images/noImage.png";

const TouristAreaDisplay = (props) => {
    const {
        image,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
    } = props;

    const [goodState, setGoodState] = useState(false);
    const [goodCount, setGoodCount] = useState(123456);
    return (
        <div className="flex w-1/3 min-w-[350px] max-w-[445px] justify-center items-center">
            <Card className="w-full border rounded-lg">
                <CardHeader
                    className="relative h-56 m-2"
                    onClick={() => console.log("モダールを開く処理を実装要")}
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
                    className="p-1 text-left"
                    onClick={() => console.log("モダールを開く処理を実装要")}
                >
                    <div className={"mb-2 truncate h-7 max-h-7 border-b"}>
                        <CategoryChip
                            categories={categoryListSelectValue}
                            isOutlineStyle={true}
                        />
                    </div>
                    <Typography
                        variant="h5"
                        className={
                            "mb-2 pl-2 pr-2 font-sans truncate h-5 max-h-5"
                        }
                    >
                        {touristAreaCatchPhrase}
                    </Typography>
                    <Typography
                        className={
                            "h-20 pl-2 pr-2 max-h-20 min-h-20 text-gray-600 truncate whitespace-pre-wrap line-clamp-3"
                        }
                    >
                        {touristAreaDeTail}
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
                                <ThumbUpOffAltRoundedIcon color={"primary"} />
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
                        <IconButton>
                            <LocationOnOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <TextsmsOutlinedIcon />
                        </IconButton>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TouristAreaDisplay;
