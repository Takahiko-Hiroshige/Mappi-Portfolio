/**
 * Testing page
 * 自由にお試しOKです
 * https://tailwindcss.com/docs/installation
 */
/**
 *import Library
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
/**
 *import components
 */
import MainTable from "../components/c_main_table";
import PostForm from "../components/c_post_form";
import Header from "../components/c_header";
import MainFeaturedPost from "../components/c_main_featured_post";
import images from "/var/www/html/public/images/justin-hu-ljGiASOhUOU-unsplash.jpg";

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
const headerList = ["名前", "タスク内容", "画像", "編集", "完了"];

const top = () => {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);

    //フォームの入力値を管理するステートの定義
    const [data, setData] = useState({
        taskName: "",
        content: "",
    });
    const [selectedFile, setSelectedFile] = useState();

    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        // useEffect内でAPI実施(関数を呼び出すのみ)
        getPostsData();
    }, []);
    const getPostsData = () => {
        axios.get("/api/posts").then((res) => {
            setPosts(res.data); //バックエンドから返ってきたデータでposts(setPosts)を更新する
        });
    };
    //入力がされたら（都度）入力値を変更するためのfunction
    const inputChange = (props) => {
        const { taskName, content } = props;
        const dataObj = {
            taskName: taskName,
            content: content,
        };
        setData(dataObj);
    };
    const createPost = async () => {
        const formData = new FormData();
        //TODO::画像ファイル以外はJSONで送信
        formData.append("image", selectedFile);
        formData.append("taskName", data.taskName);
        formData.append("content", data.content);
        // データの送信形式を設定（必須）multipart
        const config = { headers: { "content-type": "multipart/form-data" } };
        //入力値を投げる
        await axios.post("/api/post/create", formData, config).then((res) => {
            //戻り値をtodosにセット
            // const tempPosts = posts;
            // tempPosts.push(res.data);
            // setPosts(tempPosts);
            // setData("");
        });
    };

    const mainFeaturedPost = {
        title: "Welcome to Fukuoka!",
        description: "～福岡をEnjoy～",
        image: images,
        imageText: "main image description",
        linkText: "Amazon",
    };

    //空配列として定義する // 配列にobjectをpushしている
    let rows = [];
    const test = process.env.MIX_IMG_PATH;

    //postsの要素ごとにrowsで使える形式に変換する
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            img: <img src={String(test) + post.fileName} />,
            editBtn: (
                <Button className="w-72" color="secondary" variant="contained">
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
        <div>
            <MainFeaturedPost post={mainFeaturedPost} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <h2>●～Event Information～●</h2>
                            <Card className={classes.card}>
                                {/*関数を呼び出す*/}
                                <PostForm
                                    data={data}
                                    btnFunc={createPost}
                                    inputChange={inputChange}
                                    setSelectedFile={setSelectedFile}
                                />
                            </Card>
                            <Card className={classes.card}>
                                {/* テーブル部分の定義 */}
                                <MainTable
                                    headerList={headerList}
                                    rows={rows}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default top;
