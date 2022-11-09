/**
 *Created:T.HIROSHIGE && H.NOJIMA
 *Created At:2022/11/10
 */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/c_header";
import TouristAreaList from "../layouts/l_tourist_area_list.js";

const home = () => {
    return (
        <div>
            <Header />
            <div className="w-72 p-10">
                <TouristAreaList />
            </div>
        </div>
    );
};

export default home;
