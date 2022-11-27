/**
 *Created:T.HIROSHIGE && H.NOJIMA
 *Created At:2022/11/10
 */
import React, { useState, useEffect } from "react";
import axios from "axios";

import TouristAreaList from "../layouts/l_tourist_area_list.js";

const home = () => {
    return (
        <div>
            <div className="w-72 p-10">
                <TouristAreaList />
            </div>
        </div>
    );
};

export default home;
