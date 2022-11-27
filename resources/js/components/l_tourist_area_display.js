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
/**
 *import components
 */
import CategoryChip from "../components/common/c_category_chip.js";
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

    return (
        <Card className="w-96 border rounded-lg">
            <CardHeader
                className="relative h-56 m-2"
                onClick={() => console.log("モダールを開く処理を実装要")}
            >
                <img
                    src={image || noImage}
                    className={"h-full w-full object-cover"}
                />
                <div className="absolute h-7 bottom-0 w-full bg-gradient-to-r from-neutral-400">
                    <p className={"font-bold text-lg ml-2 truncate"}>
                        {touristAreaName}
                    </p>
                </div>
            </CardHeader>
            <CardBody
                className="p-1 text-left"
                onClick={() => console.log("モダールを開く処理を実装要")}
            >
                <div className={"mb-2 truncate h-7 max-h-7 border-b"}>
                    <CategoryChip categories={categoryListSelectValue} />
                </div>
                <Typography
                    variant="h5"
                    className={"mb-1 pl-1 pr-1 font-sans truncate h-5 max-h-5"}
                >
                    {touristAreaCatchPhrase}
                </Typography>
                <Typography
                    className={
                        "h-16 pl-1 pr-1 max-h-16 min-h-full truncate whitespace-pre-wrap line-clamp-3"
                    }
                >
                    {touristAreaDeTail}
                </Typography>
            </CardBody>
            <CardFooter
                divider
                className="flex items-center justify-between py-3"
            >
                <Typography variant="small">いいね</Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    詳細を表示
                </Typography>
            </CardFooter>
        </Card>
    );
};

export default TouristAreaDisplay;
