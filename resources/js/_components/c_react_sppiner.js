/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/07
 */
import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
const ReactSppiner = () => {
    // storeを監視
    const isDisplay = useSelector(
        (state) => state.isDisplaySppiner.value.isDisplay
    );
    return isDisplay ? (
        <div>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <ReactLoading
                    type="spokes"
                    color="#ffffff"
                    height={"15%"}
                    width={"15%"}
                />
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    ) : null;
};
export default ReactSppiner;
