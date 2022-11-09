import React from "react";
import Button from "@material-ui/core/Button";

const indexForDev = () => {
    return (
        <div>
            <h1>≪ページ遷移≫</h1>
            <div className="m-3 flex">
                <Button variant="contained" href={`/home`}>
                    Homeページ
                </Button>
                <h4 className="ml-3">status::開発中 Devloper ➡ 廣重 野嶋</h4>
            </div>
            <div className="m-3 flex">
                <Button variant="contained" href={`/top`}>
                    Topページ
                </Button>
                <h4 className="ml-3">status::未着手 Devloper ➡ </h4>
            </div>
            <div className="m-3 flex">
                <Button variant="contained" href={`/searchBoxSample`}>
                    削除予定::searchBoxSampleページ
                </Button>
                <h4 className="ml-3">status::参考ページ Devloper ➡ 廣重</h4>
            </div>
        </div>
    );
};

export default indexForDev;
