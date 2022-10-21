<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    // postの一覧を表示する
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }


    public function create(Request $request)
    {
        // 一時保存されたUploadedFileの取得

        clock($request);
        $image = $request->file('image');
        // ファイルの保存と保存されたファイルのパス取得
        $path = '';
        if (isset($image)) {
            // storage/app/public/imagesへAPIで送信された画像ファイルを配置
            $path = $image->store('public/images/');
        }

        $post = new Post;
        $post->name = $request->taskName;
        $post->content = $request->content;
        $post->fileName = $path;
        $post->save();
        return response()->json($post, 200);
    }
}
//Storage::put('images/sushi.png', $image);
