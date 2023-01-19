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
/**
 *import components
 */
import images from "/var/www/html/public/images/justin-hu-ljGiASOhUOU-unsplash.jpg";

const top = () => {
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

    const mainFeaturedPost = {
        title: "Welcome to Fukuoka!",
        description: "～福岡をEnjoy～",
        image: images,
    };

    return (
        <div>
            <MainFeaturedPost post={mainFeaturedPost} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default top;
