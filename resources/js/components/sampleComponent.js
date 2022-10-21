import React from "react";

/**
 * APIの呼び出しのMock
 */
const callAPIMock = async () => {
    const sampleResponse = '{"username": "marsquai", "age": 120}';
    return JSON.parse(sampleResponse);
};

/**
 * サンプルコンポーネント
 * ユーザーデータを取得して情報を表示する
 *
 */
const SampleComponent = () => {
    const [userData, setUserData] =
        (React.useState < UserData) | (undefined > undefined);
    callAPIMock().then((data) => {
        setUserData(data);
    });
    if (userData) {
        // 想定しているデータと違う構造であるため必ずエラーが発生する
        return (
            <div>
                <div>{userData.user.name}</div>
                <div>{userData.user.age}</div>
            </div>
        );
    } else {
        return <div>データ取得中</div>;
    }
};

export default SampleComponent;
