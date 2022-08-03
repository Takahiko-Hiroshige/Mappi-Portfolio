import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MainTable from "../components/MainTable";
import PostForm from "../components/PostForm";

//スタイルの定義
const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            margin: theme.spacing(9),
            padding: theme.spacing(3),
        },
    })
);

//ヘッダーのコンテンツ用の配列定義
const headerList = ["名前", "タスク内容", "編集", "完了"];

const Home = () => {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);
    //フォームの入力値を管理するステートの定義
    const [formData, setFormData] = useState({ name: "", content: "" });

    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    }, []);

    const getPostsData = () => {
        axios
            .get("/api/posts")
            .then((response) => {
                setPosts(response.data); //バックエンドから返ってきたデータでposts(setPosts)を更新する
                console.log(response.data); //取得データ確認用のconsole.log()
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    };

    //入力がされたら（都度）入力値を変更するためのfunction
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    };

    const createPost = async () => {
        //空だと弾く
        if (formData == "") {
            return;
        }
        //入力値を投げる
        await axios
            .post("/api/post/create", {
                name: formData.name,
                content: formData.content,
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempPosts = posts;
                tempPosts.push(res.data);
                setPosts(tempPosts);
                setFormData("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //空配列として定義する // 配列にobjectをpushしている
    let rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: (
                <Button color="secondary" variant="contained">
                    編集
                </Button>
            ),
            deleteBtn: (
                <Button color="primary" variant="contained">
                    完了
                </Button>
            ),
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                            {/*関数を呼び出す*/}
                            <PostForm
                                data={formData}
                                btnFunc={createPost}
                                inputChange={inputChange}
                            />
                        </Card>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
