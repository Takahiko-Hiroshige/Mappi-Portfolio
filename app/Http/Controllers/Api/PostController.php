<?php
//laravelでqueryを行う方法は大きく分けて2種類
// クエリビルダーとEloquent
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
        $image = $request->file("image");
        // ファイルの保存と保存されたファイルのパス取得
        $path = "";
        if (isset($image)) {
            // storage/app/public/imagesへAPIで送信された画像ファイルを配置
            $path = $image->store("public/images/");
            $submitPath = str_replace("public/", "", $path);
        }
        try {
            $post = new Post;
            $post->name = $request->taskName;
            $post->content = $request->content;
            $post->fileName = $submitPath;
            $post->save();
            return response()->json($post);
        } catch (\Exception $e) {
            $error_code = $e->getMessage();
            $error_message = $error_code;
            return response()->json(['error' => $error_message], $this->errorCode);
        }
    }
}
