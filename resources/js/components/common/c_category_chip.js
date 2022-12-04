/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/23
 */

/**
 *import Library
 */
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CategoryChip = (props) => {
    const {
        categories,
        size = "small", // medium|small
        onDelete, // function
        isOutlineStyle = false,
    } = props;

    // style
    let palette = {};
    if (!isOutlineStyle) {
        categories.forEach((category) => {
            palette[category.value] = {
                main: category.color,
                contrastText: "#FFFFFF",
            };
        });
    } else {
        categories.forEach((category) => {
            palette[category.value] = {
                main: "#FFFFFF",
                contrastText: "#000000",
            };
        });
    }
    const theme = createTheme({
        palette,
    });

    const addOptions = {};
    if (onDelete) addOptions["onDelete"] = onDelete;

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <ThemeProvider theme={theme}>
                    {categories?.map((category) => {
                        // style
                        if (!isOutlineStyle) {
                            addOptions["color"] = category.value;
                        } else {
                            addOptions["variant"] = "outlined";
                        }
                        return (
                            <Chip
                                key={category.value}
                                size={size}
                                label={
                                    isOutlineStyle
                                        ? `#${category.label}`
                                        : category.label
                                }
                                {...addOptions}
                            />
                        );
                    })}
                </ThemeProvider>
            </Stack>
        </div>
    );
};

export default CategoryChip;
