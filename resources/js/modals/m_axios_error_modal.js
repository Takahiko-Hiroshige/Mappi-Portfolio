/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/01
 */
/**
 * backend側によるAPI処理でエラー発生した際にエラー表示させる
 */
import React from "react";
import { ErrorEvent } from "../redux/slices/axios_error_slice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const axiosErrorModal = () => {
    const dispatch = useDispatch();
    // storeを監視
    const errorInfoObj = useSelector((state) => state.isOpen.value);
    const { isOpen, status, statusText, errorInfo, errorExecApi } =
        errorInfoObj;

    return (
        <>
            {isOpen ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {`ServerError：${status}`}
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {`エラー内容：${statusText}`}
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {`エラー詳細：${errorInfo}`}
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {`APIURL：${errorExecApi}`}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(ErrorEvent())}
                                    >
                                        閉じる
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};
export default axiosErrorModal;
