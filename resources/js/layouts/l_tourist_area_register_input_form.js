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
 *import components
 */
import SelectBox from "../components/common/c_select_box.js";

const TouristAreaRegisterInputForm = (props) => {
    const {
        displayImage,
        setDisplayImage,
        imageArray,
        setImageArray,
        touristAreaName,
        setTouristAreaName,
        touristAreaCatchPhrase,
        setTouristAreaCatchPhrase,
        touristAreaDeTail,
        setTouristAreaDeTail,
        categoryListSelectValue,
        setCategoryListSelectValue,
    } = props;

    const area = "福岡県";
    const [cityListSelectValue, setCityListSelectValue] = useState([]);
    const [cityListOptions, setCityListOptions] = useState([]);
    const [postal, setPostal] = useState("");
    const [numberAddress, setNumberAddress] = useState("");
    const [otherAddress, setOtherAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [
        isHiddenNotFoundAddressErrorMessage,
        setIsHiddenNotFoundAddressErrorMessage,
    ] = useState(true);
    const [notFoundAddressErrorMessage, setNotFoundAddressErrorMessage] =
        useState("");
    const [
        isHiddenInputSameFileErrorMessage,
        setIsHiddenInputSameFileErrorMessage,
    ] = useState(true);
    const [inputSameFileErrorMessage, setInputSameFileErrorMessage] =
        useState("");
    const [isHiddenDeleteFileErrorMessage, setIsHiddenDeleteFileErrorMessage] =
        useState(true);
    const [deleteFileErrorMessage, setDeleteFileErrorMessage] = useState("");

    const inputRef = useRef(null);

    // 福岡県の市町村を取得[API]
    useEffect(() => {
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
    const onClickPostalButton = () => {
        if (postal === "") {
            setIsHiddenNotFoundAddressErrorMessage(false);
            setNotFoundAddressErrorMessage("郵便番号が入力されていません");
            return;
        }
        axios
            .get(
                `http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${postal}`
            )
            .then((res) => {
                const setCity = cityListOptions.find(
                    (item) => item.value === res.data.response.location[0].city
                );
                if (!setCity) {
                    setIsHiddenNotFoundAddressErrorMessage(false);
                    setNotFoundAddressErrorMessage(
                        "入力された郵便番号は福岡県内に存在しません"
                    );
                    return;
                }
                setCityListSelectValue(setCity);
                const setTown = res.data.response.location[0].town;
                if (setTown !== "（その他）") {
                    setNumberAddress(setTown);
                }
                setIsHiddenNotFoundAddressErrorMessage(true);
            })
            .catch(() => {
                setIsHiddenNotFoundAddressErrorMessage(false);
                setNotFoundAddressErrorMessage(
                    "入力された郵便番号は存在しません"
                );
            });
    };

    const onClickSelectDisplayRadioButton = (e) => {
        const setImage = imageArray.find(
            (image) => image.fileName === e.target.value
        );
        setDisplayImage(setImage);
    };

    const onFileInputChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const fileObject = e.target.files[0];
        const fileName = fileObject.name.replace("C:\fakepath", "");
        if (imageArray.some((image) => image.fileName === fileName)) {
            setIsHiddenInputSameFileErrorMessage(false);
            setInputSameFileErrorMessage("同じ名前のファイルは選択できません");
            e.target.value = "";
            return;
        }
        setImageArray([
            ...imageArray,
            {
                fileName: fileName,
                filePath: window.URL.createObjectURL(fileObject),
            },
        ]);
        setIsHiddenInputSameFileErrorMessage(true);
        setIsHiddenDeleteFileErrorMessage(true);
        e.target.value = "";
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
        setIsHiddenInputSameFileErrorMessage(true);
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
        };
        // console.warn(submitDataObj);
    };
    return (
        <div className="w-[90%] h-full">
            <div className="flex justify-center h-10 mb-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 mt-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                </svg>
                <h3 className="p-2 text-stone-900 w-60">観光地登録</h3>

                <div className="flex w-full justify-end">
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={onClickSubmitButton()}
                    >
                        下書き保存
                    </button>
                    <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        onClick={onClickSubmitButton()}
                    >
                        投稿
                    </button>
                </div>
            </div>
            <div className="w-full h-[43rem] rounded-lg border border-gray-800 bg-gray-100 p-2 overflow-scroll">
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
                <div className="flex">
                    <div className="w-68 mb-2">
                        <div className="flex">
                            <label
                                htmlFor="postCode"
                                className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                            >
                                ➤郵便番号（- ハイフン不要）
                            </label>
                        </div>
                        <input
                            type="tel"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                            placeholder="例）0000000"
                            required
                            onChange={(e) => {
                                setPostal(e.target.value);
                                setIsHiddenNotFoundAddressErrorMessage(true);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    onClickPostalButton();
                                }
                            }}
                        />
                    </div>
                    <div className="ml-3">
                        <button
                            className="w-32 bg-blue-700 hover:bg-blue-600 text-white rounded px-4 py-2 mt-7"
                            onClick={() => onClickPostalButton()}
                        >
                            住所検索
                        </button>
                    </div>
                </div>
                <p
                    hidden={isHiddenNotFoundAddressErrorMessage}
                    className="ml-3 mb-3 text-sm font-medium text-red-600"
                >
                    {notFoundAddressErrorMessage}
                </p>
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
                        placeholder="例）建物・マンション名　〇号室"
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
                    <input
                        type="tel"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）00000000000"
                        required
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
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
                        className="text-white bg-sky-400 hover:bg-sky-200 font-medium rounded-full text-sm px-5 p-2 text-center mb-2"
                        onClick={fileUpload}
                    >
                        画像をアップロード
                    </button>
                    <p
                        hidden={isHiddenInputSameFileErrorMessage}
                        className="ml-3 mb-3 text-sm font-medium text-red-600"
                    >
                        {inputSameFileErrorMessage}
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
                                    className="w-1/2 ml-2 text-sm font-medium text-gray-900 truncate"
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
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤関連サイトURL
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                        placeholder="例）https://mappi.com/"
                        required
                        onChange={(e) => {
                            setOtherAddress(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TouristAreaRegisterInputForm;
