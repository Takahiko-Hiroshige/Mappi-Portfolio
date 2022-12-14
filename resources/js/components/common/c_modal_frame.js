/**
 *Created:T.HIROSHIGE
 *Created At:2022/12/07
 */
import React from "react";

const ModalFrame = (props) => {
    const { isOpen, setIsOpen, element } = props;

    return isOpen ? (
        <div>
            <div
                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={() => setIsOpen(false)}
            >
                <div
                    className="relative w-[85%] h-[85%] my-6 mx-auto mt-20 border-0 rounded-lg shadow-lg flex flex-col bg-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/*body*/}
                    <div className="relative w-full h-full p-2">{element}</div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    ) : null;
};
export default ModalFrame;
