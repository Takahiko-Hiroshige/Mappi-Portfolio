/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/20
 */

/**
 *import Library
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
/**
 *import components
 */
import SelectBox from "../components/common/c_select_box.js";

//削除(必須)
//URL.revokeObjectURL( objectUrl );//リロードしたら消えるから不要？

const TouristAreaRegisterInput = (props) => {
    const {
        imageArray,
        setImageArray,
        setTouristAreaName,
        setTouristAreaCatchPhrase,
        setTouristAreaDeTail,
        setCategoryListSelectValue,
        categoryListSelectValue,
    } = props;

    const area = "福岡県";
    const [cityListSelectValue, setCityListSelectValue] = useState([]);
    const [cityListOptions, setCityListOptions] = useState([]);
    const [postal, setPostal] = useState("");
    const [numberAddress, setNumberAddress] = useState("");
    const [otherAddress, setOtherAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isHiddenNotFoundAddressMessage, setIsHiddenNotFoundAddressMessage] =
        useState(true);
    const [notFoundAddressMessage, setNotFoundAddressMessage] = useState("");

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

    //TODO::カテゴリは後ほどDBから取得するように変更予定
    const categoryOptions = [
        { label: "絶景", value: "superbView", color: "#00FFFF" },
        { label: "宿泊", value: "Lodging", color: "#0000FF" },
        { label: "運動", value: "exercise", color: "#00FF00" },
        { label: "飲食", value: "eatingAndDrinking", color: "#FF00FF" },
    ];

    // 郵便番号にて住所特定[API]
    const onClickPostalButton = () => {
        if (postal === "") {
            setIsHiddenNotFoundAddressMessage(false);
            setNotFoundAddressMessage("郵便番号が入力されていません");
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
                    setIsHiddenNotFoundAddressMessage(false);
                    setNotFoundAddressMessage(
                        "入力された郵便番号は福岡県内に存在しません"
                    );
                    return;
                }
                setCityListSelectValue(setCity);
                const setTown = res.data.response.location[0].town;
                if (setTown !== "（その他）") {
                    setNumberAddress(setTown);
                }
                setIsHiddenNotFoundAddressMessage(true);
            })
            .catch(() => {
                setIsHiddenNotFoundAddressMessage(false);
                setNotFoundAddressMessage("入力された郵便番号は存在しません");
            });
    };

    const onFileInputChange = (e) => {
        if (!e.target.files) return;
        const fileObject = e.target.files[0];
        // 画像保存先のURLを生成し、useState()を更新
        setImageArray([...imageArray, window.URL.createObjectURL(fileObject)]);
    };
    return (
        <div>
            <div className="border-solid border border-gray-800 bg-gray-100 p-2">
                <h3>観光地登録</h3>
                <div className="mb-3">
                    <label
                        htmlFor="touristAreaName"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                        ➤観光名所
                    </label>
                    <input
                        type="text"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="例）0000000"
                            required
                            onChange={(e) => setPostal(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    onClickPostalButton();
                                }
                            }}
                        />
                    </div>
                    <div className="ml-3">
                        <button
                            className="bg-blue-700 hover:bg-blue-600 text-white rounded px-4 py-2 mt-7"
                            onClick={() => onClickPostalButton()}
                        >
                            住所検索
                        </button>
                    </div>
                    <div>
                        <p className="ml-3 block text-sm font-medium text-gray-900 mt-9">
                            郵便番号から住所検索
                        </p>
                    </div>
                </div>
                <p
                    hidden={isHiddenNotFoundAddressMessage}
                    className="ml-3 mb-3 text-sm font-medium text-red-600"
                >
                    {notFoundAddressMessage}
                </p>
                <div className="flex mb-2">
                    <div className="w-56">
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
                    <div className="w-96 ml-3">
                        <label
                            htmlFor="touristAreaName"
                            className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                        >
                            ➤字・番地
                        </label>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="例）〇〇1-1-1"
                            required
                            value={numberAddress}
                            onChange={(e) => {
                                setNumberAddress(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤その他住所
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="例）建物・マンション名　〇号室"
                        required
                        onChange={(e) => {
                            setOtherAddress(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="phoneNumber"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤電話番号（- ハイフン不要）
                    </label>
                    <input
                        type="tel"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-300"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        onChange={onFileInputChange}
                    />
                    {/* here */}
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
                <div className="mb-3">
                    <label
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                        ➤キャッチフレーズ
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="例）福岡最大級のステーション！！"
                        required
                        onChange={(e) => {
                            setTouristAreaCatchPhrase(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="touristDetail"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤観光地説明
                    </label>
                    <textarea
                        id="touristDetail"
                        rows="4"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="観光地の説明文を入力してください"
                        required
                        onChange={(e) => {
                            setTouristAreaDeTail(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="touristAreaCatchPhrase"
                        className="ml-1 block mb-2 text-sm font-medium text-gray-900"
                    >
                        ➤関連サイトURL
                    </label>
                    <input
                        type="text"
                        id="touristAreaCatchPhrase"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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

export default TouristAreaRegisterInput;
