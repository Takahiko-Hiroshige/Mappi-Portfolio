/*
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

/**
 *import components
 */
import TouristAreaRegisterInputForm from "../_layouts/l_tourist_area_register_input_form.js";
import TouristAreaRegisterConfirm from "../_layouts/l_tourist_area_register_confirm.js";
import ReactTsparticles from "../_components/common/c_particles.js";
import { touristAreaRegisterParticlesOption } from "../_objects/particles-objects/tourist_area_registe_particles_option.js";

const TouristAreaRegister = () => {
    const [selectDisplayValue, setSelectDisplayValue] = useState(0);

    const handleChangeDisplay = (e, displayValue) => {
        setSelectDisplayValue(displayValue);
    };

    return (
        <div>
            <ReactTsparticles options={touristAreaRegisterParticlesOption} />
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs
                    value={selectDisplayValue}
                    onChange={handleChangeDisplay}
                    centered
                >
                    <Tab label="入力フォーム" />
                    <Tab label="サンプル" />
                </Tabs>
            </Box>
            <div className="mt-3">
                {/* 入力フォーム@観光地登録画面 */}
                <div
                    className="flex justify-center items-center"
                    hidden={selectDisplayValue !== 0}
                >
                    <TouristAreaRegisterInputForm />
                </div>
                <div
                    className="flex justify-center items-center"
                    hidden={selectDisplayValue !== 1}
                >
                    <TouristAreaRegisterConfirm />
                </div>
            </div>
        </div>
    );
};

export default TouristAreaRegister;
