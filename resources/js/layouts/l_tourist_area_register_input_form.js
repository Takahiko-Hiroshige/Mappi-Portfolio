/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
/**
 *ReduxTools
 */
import { useDispatch } from "react-redux";
import { setTouristAreaRegisterData } from "../redux/slices/tourist_area_register_data_slice.js";
/**
 *import components
 */
import SelectBox from "../components/common/c_select_box.js";

const TouristAreaRegisterInputForm = () => {
    const [imageArray, setImageArray] = useState([]);
    const [displayImage, setDisplayImage] = useState("");
    const [touristAreaName, setTouristAreaName] = useState("");
    const [touristAreaCatchPhrase, setTouristAreaCatchPhrase] = useState("");
    const [touristAreaDeTail, setTouristAreaDeTail] = useState("");
    const [categoryListSelectValue, setCategoryListSelectValue] = useState([]);
    const [cityListSelectValue, setCityListSelectValue] = useState([]);
    const [cityListOptions, setCityListOptions] = useState([]);
    const [postal, setPostal] = useState("");
    const [numberAddress, setNumberAddress] = useState("");
    const [otherAddress, setOtherAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [relationUrl, setRelationUrl] = useState("");
    // 画像エラー
    const [isHiddenInputFileErrorMessage, setIsHiddenInputFileErrorMessage] =
        useState(true);
    const [inputFileErrorMessage, setInputFileErrorMessage] = useState("");
    const [isHiddenDeleteFileErrorMessage, setIsHiddenDeleteFileErrorMessage] =
        useState(true);
    const [deleteFileErrorMessage, setDeleteFileErrorMessage] = useState("");
    // 郵便番号エラー
    const [isHiddenPostalErrorMessage, setisHiddenPostalErrorMessage] =
        useState(true);
    const [postalErrorMessage, setPostalErrorMessage] = useState("");
    // 電話番号エラー
    const [
        isHiddenPhoneNumberErrorMessage,
        setIsHiddenPhoneNumberErrorMessage,
    ] = useState(true);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

    const inputRef = useRef(null);

    // 各state更新すると同時にStoreを更新
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setTouristAreaRegisterData({
                imageArray,
                touristAreaName,
                touristAreaCatchPhrase,
                touristAreaDeTail,
                categoryListSelectValue,
                cityListSelectValue,
                cityListOptions,
                postal,
                numberAddress,
                otherAddress,
                phoneNumber,
                relationUrl,
            })
        );
    }, [
        imageArray,
        touristAreaName,
        touristAreaCatchPhrase,
        touristAreaDeTail,
        categoryListSelectValue,
        cityListSelectValue,
        cityListOptions,
        postal,
        numberAddress,
        otherAddress,
        phoneNumber,
        relationUrl,
    ]);

    // 福岡県の市町村を取得[API]
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
            setDisplayImage(imageArray[0]);
        }
    }, [imageArray]);

    //TODO::カテゴリは後ほどDBから取得するように変更予定
    const categoryOptions = [
        { label: "絶景", value: "superbView", color: "#6927FF" },
        { label: "宿泊", value: "Lodging", color: "#0000FF" },
        { label: "運動", value: "exercise", color: "#00FFFF" },
        { label: "飲食", value: "eatingAndDrinking", color: "#FF00FF" },
    ];

    // 郵便番号にて住所特定[API]
    const onClickPostalButton = (e) => {
        if (e.target.value === "") {
            setisHiddenPostalErrorMessage(false);
            setPostalErrorMessage("郵便番号が入力されていません");
            return;
        }
        if (!/^[0-9]+$/.test(e.target.value)) {
            setisHiddenPostalErrorMessage(false);
            setPostalErrorMessage("半角数字のみ入力してください");
            return;
        }
        axios
            .get(
                `http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${e.target.value}`
            )
            .then((res) => {
                const setCity = cityListOptions.find(
                    (item) => item.value === res.data.response.location[0].city
                );
                if (!setCity) {
                    setisHiddenPostalErrorMessage(false);
                    setPostalErrorMessage(
                        "入力された郵便番号は福岡県内に存在しません"
                    );
                    return;
                }
                setPostal(e.target.value);
                setCityListSelectValue(setCity);
                const setTown = res.data.response.location[0].town;
                if (setTown !== "（その他）") {
                    setNumberAddress(setTown);
                }
                setisHiddenPostalErrorMessage(true);
            })
            .catch(() => {
                setisHiddenPostalErrorMessage(false);
                setPostalErrorMessage("入力された郵便番号は存在しません");
            });
    };

    const onClickSelectDisplayRadioButton = (e) => {
        const setImage = imageArray.find(
            (image) => image.fileName === e.target.value
        );
        setDisplayImage(setImage);
    };

    const onFileInputChange = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const fileObject = e.target.files[0];
        if (!/image/.test(fileObject.type)) {
            setIsHiddenInputFileErrorMessage(false);
            setInputFileErrorMessage("画像以外のファイルは選択できません");
            return;
        }
        const fileName = fileObject.name.replace("C:\fakepath", "");
        if (imageArray.some((image) => image.fileName === fileName)) {
            setIsHiddenInputFileErrorMessage(false);
            setInputFileErrorMessage("同じ名前のファイルは選択できません");
            e.target.value = "";
            return;
        }
        const setArray = [
            ...imageArray,
            {
                fileName: fileName,
                filePath: window.URL.createObjectURL(fileObject),
            },
        ];
        setImageArray(setArray);
        setIsHiddenInputFileErrorMessage(true);
        setIsHiddenDeleteFileErrorMessage(true);
        e.target.value = "";
    };

    const setNumberState = (
        e,
        setState,
        setErrorMessage,
        setIsHiddenErrorMessage
    ) => {
        if (/^[0-9]+$/.test(e.target.value)) {
            setState(e.target.value);
            setIsHiddenErrorMessage(true);
        } else {
            setErrorMessage("半角数字のみ入力してください");
            setIsHiddenErrorMessage(false);
        }
    };

    const onClickDeleteFileButton = (image) => {
        if (displayImage.fileName === image.fileName) {
            setIsHiddenDeleteFileErrorMessage(false);
            setDeleteFileErrorMessage("選択中の画像は削除できません");
            return;
        }
        const onAfterDeleteFileImageArray = imageArray.filter(
            (_image) => _image.fileName !== image.fileName
        );
        URL.revokeObjectURL(image.filePath);
        setImageArray([...onAfterDeleteFileImageArray]);
        setIsHiddenDeleteFileErrorMessage(true);
        setIsHiddenInputFileErrorMessage(true);
    };

    const fileUpload = () => {
        inputRef.current.click();
    };

    //TODO::バリデーションチェック・登録機能実装要
    const onClickSubmitButton = () => {
        const submitDataObj = {
            touristAreaName,
            postal,
            cityListSelectValue,
            numberAddress,
            otherAddress,
            phoneNumber,
            displayImage,
            imageArray,
            categoryListSelectValue,
            touristAreaCatchPhrase,
            touristAreaDeTail,
            relationUrl,
        };
        // console.warn(submitDataObj);
    };
    return (
        <div className="w-[80%] max-w-[40rem]">
            <div className="w-full min-w-[19rem] h-[48rem] rounded-lg border border-gray-800 bg-gray-100 p-2 overflow-auto">
                <div className="mb-3">
                    <label
                        htmlFor="touristAreaName"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                        ➤観光名所（名称）
                    </label>
                    <input
                        type="text"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）博多駅"
                        required
                        onChange={(e) => {
                            setTouristAreaName(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="postCode"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                        ➤郵便番号（- ハイフン不要）
                    </label>
                    <p
                        hidden={isHiddenPostalErrorMessage}
                        className="ml-3 mb-1 text-sm font-medium text-red-600"
                    >
                        {postalErrorMessage}
                    </p>
                    <div className="flex">
                        <input
                            type="tel"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                            placeholder="例）0000000"
                            required
                            onChange={(e) => {
                                e.target.value === ""
                                    ? setisHiddenPostalErrorMessage(true)
                                    : setNumberState(
                                          e,
                                          setPostal,
                                          setPostalErrorMessage,
                                          setisHiddenPostalErrorMessage
                                      );
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onClickPostalButton(e);
                                }
                            }}
                        />
                        <button
                            className="w-32 ml-3 bg-blue-700 hover:bg-blue-600 text-white rounded px-2 py-2"
                            onClick={() => onClickPostalButton(e)}
                        >
                            住所検索
                        </button>
                    </div>
                </div>
                <div className="flex w-full mb-2">
                    <div className="w-1/2">
                        <label
                            htmlFor="touristAreaName"
                            className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤市町村・区
                        </label>
                        <SelectBox
                            setSelectValue={setCityListSelectValue}
                            options={cityListOptions}
                            value={cityListSelectValue}
                            isMulti={false}
                            isSearchable={true}
                            placeholder="市町村"
                            getOptionValue={(option) =>
                                option.label + option.cityKana
                            }
                        />
                    </div>
                    <div className="ml-3 w-1/2">
                        <label
                            htmlFor="touristAreaName"
                            className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤字・番地
                        </label>
                        <input
                            type="text"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                            placeholder="例）〇〇1-1-1"
                            required
                            value={numberAddress}
                            onChange={(e) => {
                                setNumberAddress(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="w-full mb-3">
                    <label
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤その他住所
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）建物・マンション名"
                        required
                        onChange={(e) => {
                            setOtherAddress(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full mb-3">
                    <label
                        htmlFor="phoneNumber"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤電話番号（- ハイフン不要）
                    </label>
                    <p
                        hidden={isHiddenPhoneNumberErrorMessage}
                        className="ml-3 mb-1 text-sm font-medium text-red-600"
                    >
                        {phoneNumberErrorMessage}
                    </p>
                    <input
                        type="tel"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）00000000000"
                        required
                        onChange={(e) => {
                            e.target.value === ""
                                ? setIsHiddenPhoneNumberErrorMessage(true)
                                : setNumberState(
                                      e,
                                      setPhoneNumber,
                                      setPhoneNumberErrorMessage,
                                      setIsHiddenPhoneNumberErrorMessage
                                  );
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="phoneNumber"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤画像　※複数選択可能
                    </label>
                    <input
                        hidden={true}
                        id="file_input"
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={onFileInputChange}
                    />
                    <button
                        type="button"
                        className="ml-1 text-white bg-sky-400 hover:bg-sky-200 font-medium rounded-full text-sm px-3 p-2 text-center mb-2"
                        onClick={fileUpload}
                    >
                        画像をアップロード
                    </button>
                    <p
                        hidden={isHiddenInputFileErrorMessage}
                        className="ml-3 mb-3 text-sm font-medium text-red-600"
                    >
                        {inputFileErrorMessage}
                    </p>
                    <label
                        hidden={imageArray.length === 0}
                        htmlFor="selectImage"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤表示する画像を選択してください
                    </label>
                    <p
                        hidden={isHiddenDeleteFileErrorMessage}
                        className="ml-3 mb-1 text-sm font-medium text-red-600"
                    >
                        {deleteFileErrorMessage}
                    </p>
                    {imageArray?.map((image, i) => {
                        const defaultOptionObj = {
                            id: image.fileName,
                            type: "radio",
                            name: "selectDisplayImage",
                            value: image.fileName,
                            className:
                                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2",
                            onChange: (e) => {
                                onClickSelectDisplayRadioButton(e);
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
                                    onClick={() =>
                                        onClickDeleteFileButton(image)
                                    }
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
                        htmlFor="touristAreaName"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤カテゴリ
                    </label>
                    <SelectBox
                        setSelectValue={setCategoryListSelectValue}
                        options={categoryOptions}
                        value={categoryListSelectValue}
                        isMulti={true}
                        isSearchable={false}
                        placeholder="カテゴリ"
                    />
                </div>
                <div className="w-full mb-3">
                    <label
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                        ➤キャッチフレーズ
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）福岡最大級のステーション！！"
                        required
                        onChange={(e) => {
                            setTouristAreaCatchPhrase(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full mb-3">
                    <label
                        htmlFor="touristDetail"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤観光地説明
                    </label>
                    <textarea
                        id="touristDetail"
                        rows="4"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="観光地の説明文を入力してください"
                        required
                        onChange={(e) => {
                            setTouristAreaDeTail(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full mb-3">
                    <label
                        htmlFor="touristAreaRelationUrl"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤関連サイトURL
                    </label>
                    <input
                        type="text"
                        id="touristAreaRelationUrl"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）https://mappi.com/"
                        required
                        onChange={(e) => {
                            setRelationUrl(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-3 mb-3">
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded text-sm"
                    onClick={onClickSubmitButton()}
                >
                    下書き保存
                </button>
                <button
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-sm"
                    onClick={onClickSubmitButton()}
                >
                    投稿
                </button>
            </div>
        </div>
    );
};

export default TouristAreaRegisterInputForm;
