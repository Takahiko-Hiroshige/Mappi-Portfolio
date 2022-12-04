/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/04
 */
import { useState, useEffect } from "react";

export const getWindowSize = () => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    useEffect(() => {
        const onResize = () => {
            setWindowDimensions(getWindowDimensions());
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return windowDimensions;
};
