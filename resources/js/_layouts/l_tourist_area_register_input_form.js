/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
/**
 *import ReduxTools
 */
import { useDispatch, useSelector } from "react-redux";
import { setTouristAreaRegisterData } from "../_redux/slices/tourist_area_register_data_slice.js";
import { displaySppiner } from "../_redux/slices/react_sppiner_slice.js";
/**
 *import components
 */
import SelectBox from "../_components/common/c_select_box.js";
/**
 *import functions
 */
import { funcs } from "../utils/functions.js";
/**
 *import validation
 */
import { validationChecker } from "../utils/validation_checker.js";
/**
 *import register
 */
import { registerExec } from "../utils/register.js";

const TouristAreaRegisterInputForm = () => {
    const [cityListOptions, setCityListOptions] = useState([]);
    const [imageFileArray, setImageFileArray] = useState([]);

    /**storeを監視 */
    const touristAreaRegisterData = useSelector(
        (state) => state.touristAreaRegisterData.value
    );
    const {
        displayImage,
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDetail,
        categoryListSelectValue,
        cityListSelectValue,
        postal,
        numberAddress,
        otherAddress,
        phoneNumber,
        relationUrl,
    } = touristAreaRegisterData;

    const dispatch = useDispatch();

    const inputRef = useRef(null);
    const fileUpload = () => {
        inputRef.current.click();
    };

    /**バリデーション */
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ mode: "onChange", criteriaMode: "all" });

    const selectItemValidation = () => {
        validationChecker.selectItem(
            [
                {
                    value: imageArray,
                    name: "imageArray",
                    message: "画像が選択されていません",
                },
                {
                    value: cityListSelectValue,
                    name: "touristAreaCity",
                    message: "選択されていません",
                },
                {
                    value: categoryListSelectValue,
                    name: "touristAreaCategories",
                    message: "選択されていません",
                },
            ],
            setError
        );
    };

    const onSubmit = async () => {
        selectItemValidation();
        if (!Object.keys(errors).length) {
            await createTouristArea();
        }
    };
    const onError = () => {
        selectItemValidation();
    };

    /**登録処理 */
    const createTouristArea = async () => {
        const data = {
            /**touristArea */
            touristAreaName,
            touristAreaCatchPhrase,
            touristAreaDetail,
            touristAreaCategories: categoryListSelectValue
                .map((item) => item.id)
                .join(","),
            touristAreaCity: cityListSelectValue.value,
            touristAreaPostal: postal,
            touristAreaNumberAddress: numberAddress,
            touristAreaOtherAddress: otherAddress,
            touristAreaPhoneNumber: phoneNumber,
            touristAreaRelationUrl: relationUrl,
            /**images */
            displayImage: displayImage.fileName,
            imageArray: imageFileArray.reduce((acc, cur) => {
                return imageArray.some((image) => cur.name === image.fileName)
                    ? [...acc, cur]
                    : acc;
            }, []),
        };
        await registerExec({
            apiPath: "/api/TouristArea/create",
            data,
            headers: {
                "content-type": "multipart/form-data",
            },
            setError,
            beforeExecFunc: () => {
                /**spinner表示 */
                dispatch(
                    displaySppiner({
                        isDisplay: true,
                    })
                );
            },
            afterExecFunc: () => {
                /**spinner非表示 */
                dispatch(
                    displaySppiner({
                        isDisplay: false,
                    })
                );
            },
            afterSuccessFunc: () => {
                /**登録用データをクリア */
                dispatch(setTouristAreaRegisterData());
                setImageFileArray([]);
            },
        });
    };

    // ToDo::useMemo化
    /**福岡県の市町村を取得[API] */
    useEffect(() => {
        const area = "福岡県";
        axios
            .get(
                `http://geoapi.heartrails.com/api/json?method=getCities&prefecture=${area}`
            )
            .then((res) => {
                const location = res.data.response.location;
                const cityList = location.map((obj, index) => {
                    return {
                        id: index,
                        label: obj.city,
                        value: obj.city,
                        cityKana: obj.city_kana,
                    };
                });
                setCityListOptions(cityList);
            });
    }, []);

    useEffect(() => {
        if (!displayImage && imageArray.length > 0) {
            dispatch(
                setTouristAreaRegisterData({
                    ...touristAreaRegisterData,
                    displayImage: imageArray[0],
                })
            );
        }
    }, [imageArray]);

    //TODO::カテゴリは後ほどDBから取得するように変更予定
    const categoryOptions = [
        { id: 0, label: "絶景", value: "superbView", color: "#6927FF" },
        { id: 1, label: "宿泊", value: "lodging", color: "#0000FF" },
        { id: 2, label: "運動", value: "motion", color: "#00FFFF" },
        { id: 3, label: "飲食", value: "meal", color: "#FF00FF" },
    ];

    /**郵便番号にて住所特定[API]*/
    const onClickPostalSearchButton = async () => {
        if (errors.postal?.message) return;
        if (!postal) {
            setError("touristAreaPostal", {
                type: "notExist",
                message: "郵便番号が入力されていません",
            });
            return;
        }
        await axios
            .get(
                `http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${postal}`
            )
            .then((res) => {
                const setCity = cityListOptions.find(
                    (item) => item.value === res.data.response.location[0].city
                );
                if (!setCity) {
                    setError("touristAreaPostal", {
                        type: "notExist",
                        message: "入力された郵便番号は福岡県内に存在しません",
                    });
                    return;
                }
                const setTown = res.data.response.location[0].town;
                clearErrors([
                    "touristAreaPostal",
                    "touristAreaCity",
                    "touristAreaNumberAddress",
                ]);
                dispatch(
                    setTouristAreaRegisterData({
                        ...touristAreaRegisterData,
                        cityListSelectValue: setCity,
                        numberAddress: setTown !== "（その他）" ? setTown : "",
                    })
                );
            })
            .catch(() => {
                setError("touristAreaPostal", {
                    type: "notExist",
                    message: "入力された郵便番号は存在しません",
                });
            });
    };

    const onFileInputChange = (e) => {
        const files = e.target.files;
        if (!validationChecker.imageFile(files)) {
            setError("imageArray", {
                type: "notImage",
                message: "画像を選択してください",
            });
            return;
        }
        const imageFileObj = funcs.createImageFilePath(files);
        if (
            imageArray.some((image) => image.fileName === imageFileObj.fileName)
        ) {
            setError("imageArray", {
                type: "notSelectSameImage",
                message: "同じ名前のファイルは選択できません",
            });
            e.target.value = "";
            return;
        }
        const setArray = [...imageArray, imageFileObj];
        setImageFileArray([...imageFileArray, files[0]]);
        clearErrors("imageArray");
        dispatch(
            setTouristAreaRegisterData({
                ...touristAreaRegisterData,
                imageArray: setArray,
            })
        );
        e.target.value = "";
    };

    const onClickDeleteFileButton = (image) => {
        if (displayImage.fileName === image.fileName) {
            setError("deleteImage", {
                type: "notDeleteSelectingImage",
                message: "選択中の画像は削除できません",
            });
            return;
        }
        const onAfterDeleteFileImageArray = imageArray.filter(
            (_image) => _image.fileName !== image.fileName
        );
        funcs.deleteImageFilePath(image);
        dispatch(
            setTouristAreaRegisterData({
                ...touristAreaRegisterData,
                imageArray: onAfterDeleteFileImageArray,
            })
        );
    };

    return (
        <div className="w-[80%] max-w-[40rem]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="w-full min-w-[19rem] h-[48rem] rounded-lg border border-gray-800 bg-gray-100 p-2 overflow-auto">
                    <div className="mb-3">
                        <label
                            htmlFor="touristAreaName"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900 text-black"
                        >
                            ➤観光名所（名称）
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaName?.message}
                        </div>
                        <input
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="例）博多駅"
                            value={touristAreaName}
                            {...register("touristAreaName", {
                                required: "入力されていません",
                                maxLength: {
                                    value: 30,
                                    message: "30文字以内で入力してください",
                                },
                                onChange: (e) => {
                                    clearErrors("touristAreaName");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            touristAreaName: e.target.value,
                                        })
                                    );
                                },
                            })}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="touristAreaPostal"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900 text-black"
                        >
                            ➤郵便番号（- ハイフン不要）
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaPostal?.types?.integer ||
                                errors.touristAreaPostal?.message}
                        </div>
                        <div className="flex">
                            <input
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                placeholder="例）0000000"
                                value={postal}
                                {...register("touristAreaPostal", {
                                    required: "入力されていません",
                                    minLength: {
                                        value: 7,
                                        message:
                                            "半角数字の7文字で入力してください",
                                    },
                                    maxLength: {
                                        value: 7,
                                        message:
                                            "半角数字の7文字で入力してください",
                                    },
                                    validate: {
                                        touristAreaPostal: (value) =>
                                            validationChecker.integer(value) ||
                                            "半角数字の7文字で入力してください",
                                    },
                                    onChange: (e) => {
                                        clearErrors("postal");
                                        dispatch(
                                            setTouristAreaRegisterData({
                                                ...touristAreaRegisterData,
                                                postal: e.target.value,
                                            })
                                        );
                                    },
                                })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onClickPostalSearchButton();
                                    }
                                }}
                            />
                            <button
                                className="w-32 ml-3 bg-blue-700 hover:bg-blue-600 text-white rounded px-2 py-2"
                                onClick={() => {
                                    onClickPostalSearchButton();
                                }}
                            >
                                住所検索
                            </button>
                        </div>
                    </div>
                    <div className="flex w-full mb-2">
                        <div className="w-1/2">
                            <label
                                htmlFor="touristAreaCity"
                                className="ml-1 mb-2 text-sm font-medium text-gray-900"
                            >
                                ➤市町村・区
                            </label>
                            <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                                必須
                            </span>
                            <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                                {errors.touristAreaCity?.message}
                            </div>
                            <SelectBox
                                onChange={(e) => {
                                    clearErrors("touristAreaCity");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            cityListSelectValue: e,
                                        })
                                    );
                                }}
                                options={cityListOptions}
                                value={cityListSelectValue}
                                isSearchable={true}
                                placeholder="市町村"
                                getOptionValue={(option) =>
                                    option.label + option.cityKana
                                }
                            />
                        </div>
                        <div className="ml-3 w-1/2">
                            <label
                                htmlFor="touristAreaNumberAddress"
                                className="ml-1 mb-2 text-sm font-medium text-gray-900"
                            >
                                ➤字・番地
                            </label>
                            <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                                必須
                            </span>
                            <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                                {errors.touristAreaNumberAddress?.message}
                            </div>
                            <input
                                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                placeholder="例）〇〇1-1-1"
                                value={numberAddress}
                                {...register("touristAreaNumberAddress", {
                                    validate: {
                                        touristAreaNumberAddress: (value) => {
                                            clearErrors(
                                                "touristAreaNumberAddress"
                                            );
                                            return numberAddress || value
                                                ? true
                                                : "入力されていません";
                                        },
                                    },
                                    onChange: (e) => {
                                        clearErrors("touristAreaNumberAddress");
                                        dispatch(
                                            setTouristAreaRegisterData({
                                                ...touristAreaRegisterData,
                                                numberAddress: e.target.value,
                                            })
                                        );
                                    },
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="touristAreaOtherAddress"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤その他住所
                        </label>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaOtherAddress?.message}
                        </div>
                        <input
                            id="touristAreaOtherAddress"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="例）建物・マンション名"
                            value={otherAddress}
                            onChange={(e) => {
                                dispatch(
                                    setTouristAreaRegisterData({
                                        ...touristAreaRegisterData,
                                        otherAddress: e.target.value,
                                    })
                                );
                            }}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="touristAreaPhoneNumber"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤電話番号（- ハイフン不要）
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaPhoneNumber?.message}
                        </div>
                        <input
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="例）00000000000"
                            value={phoneNumber}
                            {...register("touristAreaPhoneNumber", {
                                required: "入力されていません",
                                validate: {
                                    touristAreaPhoneNumber: (value) =>
                                        validationChecker.phoneNumber(value) ||
                                        "半角数字で電話番号を入力してください",
                                },
                                onChange: (e) => {
                                    clearErrors("touristAreaPhoneNumber");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            phoneNumber: e.target.value,
                                        })
                                    );
                                },
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="imageArray"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤画像　※複数選択可能
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.imageArray?.message}
                        </div>
                        <input
                            hidden={true}
                            id="file_input"
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                onFileInputChange(e);
                            }}
                        />
                        <button
                            type="button"
                            className="ml-1 block text-white bg-sky-400 hover:bg-sky-200 font-medium rounded-full text-sm px-3 p-2 text-center mb-2"
                            onClick={fileUpload}
                        >
                            画像をアップロード
                        </button>
                        <label
                            hidden={imageArray.length === 0}
                            htmlFor="selectImage"
                            className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤表示する画像を選択してください
                        </label>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.deleteImage?.message}
                        </div>
                        {imageArray.map((image, i) => {
                            const defaultOptionObj = {
                                id: image.fileName,
                                type: "radio",
                                name: "selectDisplayImage",
                                value: image.fileName,
                                className:
                                    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2",
                                onChange: (e) => {
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            displayImage: imageArray.find(
                                                (image) =>
                                                    image.fileName ===
                                                    e.target.value
                                            ),
                                        })
                                    );
                                },
                            };
                            const setOptionObj =
                                i !== 0
                                    ? defaultOptionObj
                                    : {
                                          ...defaultOptionObj,
                                          defaultChecked: true,
                                      };
                            return (
                                <div
                                    className="flex items-center ml-4"
                                    key={image.fileName}
                                >
                                    <input {...setOptionObj} />
                                    <label
                                        htmlFor="defaultRadio"
                                        className="w-80 ml-2 text-sm font-medium text-gray-900 truncate"
                                    >
                                        {image.fileName}
                                    </label>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 p-1 cursor-pointer"
                                        onClick={() => {
                                            onClickDeleteFileButton(image);
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="touristAreaCategories"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900 text-black"
                        >
                            ➤カテゴリ
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaCategories?.message}
                        </div>
                        <SelectBox
                            onChange={(e) => {
                                clearErrors("touristAreaCategories");
                                dispatch(
                                    setTouristAreaRegisterData({
                                        ...touristAreaRegisterData,
                                        categoryListSelectValue: e,
                                    })
                                );
                            }}
                            options={categoryOptions}
                            value={categoryListSelectValue}
                            isMulti={true}
                            placeholder="カテゴリ"
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="touristAreaCatchPhrase"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900 text-black"
                        >
                            ➤キャッチフレーズ
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaCatchPhrase?.message}
                        </div>
                        <input
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="例）福岡最大級のステーション！！"
                            value={touristAreaCatchPhrase}
                            {...register("touristAreaCatchPhrase", {
                                required: "入力されていません",
                                maxLength: {
                                    value: 30,
                                    message: "30文字以内で入力してください",
                                },
                                onChange: (e) => {
                                    clearErrors("touristAreaCatchPhrase");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            touristAreaCatchPhrase:
                                                e.target.value,
                                        })
                                    );
                                },
                            })}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="touristAreaDetail"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤観光地説明
                        </label>
                        <span className="ml-1 mb-1 text-sm border-1 border-red-400 bg-red-300 text-white rounded pl-1 pr-1">
                            必須
                        </span>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaDetail?.message}
                        </div>
                        <textarea
                            rows="4"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="観光地の説明文を入力してください"
                            value={touristAreaDetail}
                            {...register("touristAreaDetail", {
                                required: "入力されていません",
                                maxLength: {
                                    value: 500,
                                    message: "500文字以内で入力してください",
                                },
                                onChange: (e) => {
                                    clearErrors("touristAreaDetail");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            touristAreaDetail: e.target.value,
                                        })
                                    );
                                },
                            })}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="touristAreaRelationUrl"
                            className="ml-1 mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤関連サイトURL
                        </label>
                        <div className="ml-3 mb-1 text-sm font-medium text-red-600">
                            {errors.touristAreaRelationUrl?.message}
                        </div>
                        <input
                            type="text"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                            placeholder="例）https://mappi.com/"
                            value={relationUrl}
                            {...register("touristAreaRelationUrl", {
                                validate: {
                                    touristAreaRelationUrl: (value) =>
                                        validationChecker.url(value) ||
                                        value === ""
                                            ? true
                                            : "正しいURLを入力してください",
                                },
                                onChange: (e) => {
                                    clearErrors("touristAreaRelationUrl");
                                    dispatch(
                                        setTouristAreaRegisterData({
                                            ...touristAreaRegisterData,
                                            relationUrl: e.target.value,
                                        })
                                    );
                                },
                            })}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-3 mb-3">
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded text-sm"
                        onClick={handleSubmit(onSubmit, onError)}
                    >
                        下書き保存
                    </button>
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-sm"
                        onClick={handleSubmit(onSubmit, onError)}
                    >
                        投稿
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TouristAreaRegisterInputForm;
