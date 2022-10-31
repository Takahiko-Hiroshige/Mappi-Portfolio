/**
 * Created T.HIROSHIGE
 * Created At 2022/10/23
 */

/**
 * import library
 */
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const touristAreaCardList = () => {
    return (
        <div>
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="160"
                    image="/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        博多駅
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography>
                </CardContent>
                <div className="flex justify-end">
                    <CardActions>
                        <Button size="small">Share</Button>
                    </CardActions>
                    <IconButton>
                        <CheckCircleOutlinedIcon color="secondary" />
                    </IconButton>
                </div>
            </Card>
        </div>
    );
};

export default touristAreaCardList;
