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

// const handleDelete = () => {
//     console.warn("この機能は検索機能の際に使用予定");
// };

const CategoryChip = (props) => {
    const { categories, size = "small", onDelete } = props;

    let palette = {};
    categories.forEach((category) => {
        palette[category.value] = {
            main: category.color,
            contrastText: "#FFFFFF",
        };
    });

    const theme = createTheme({
        palette,
    });

    const options = { size };
    // TODO::検索機能の際だけ追加するようにする
    // onDelete={handleDelete}
    if (onDelete) options["onDelete"] = { ...onDelete };
    return (
        <div>
            <Stack direction="row" spacing={1}>
                <ThemeProvider theme={theme}>
                    {categories?.map((category) => {
                        const color = category.value;
                        return (
                            <Chip
                                key={category.value}
                                label={category.label}
                                color={color}
                                {...options}
                            />
                        );
                    })}
                </ThemeProvider>
            </Stack>
        </div>
    );
};

export default CategoryChip;
