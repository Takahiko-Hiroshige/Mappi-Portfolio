<?php
//laravelでqueryを行う方法は大きく分けて2種類
// クエリビルダーとEloquent
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TouristArea;
use App\Models\Image;

class TouristAreaController extends Controller
{
    // TouristAreaの一覧を表示する
    public function index()
    {
        $posts = TouristArea::all();
        return response()->json($posts, 200);
    }


    public function create(Request $request)
    {
        // 一時保存されたUploadedFileの取得

        clock($request);
        $imageArray = $request->file("imageArray");
        // ファイルの保存と保存されたファイルのパス取得
        $path = "";
        if (isset($imageArray)) {
            // storage/app/public/imagesへAPIで送信された画像ファイルを配置
            $path = $imageArray[0]->store("public/images/");
            $submitPath = str_replace("public/", "", $path);
        }
        try {
            $TouristArea = new TouristArea;
            $Image = new Image;
            $TouristArea->tourist_area_image_id = 0; //$request->displayImage;
            // $TouristArea->content = $request->imageArray;
            $TouristArea->tourist_area_name = $request->touristAreaName;
            $TouristArea->tourist_area_catchphrase = $request->touristAreaCatchPhrase;
            $TouristArea->tourist_area_detail = $request->touristAreaDetail;
            $TouristArea->tourist_area_city = $request->cityListSelectValue;
            $TouristArea->tourist_area_category_ids = $request->categoryListSelectValue;
            $TouristArea->tourist_area_postal = $request->postal;
            $TouristArea->tourist_area_number_address = $request->numberAddress;
            $TouristArea->tourist_area_other_address = $request->otherAddress;
            $TouristArea->tourist_area_phone_number = $request->phoneNumber;
            $TouristArea->tourist_area_relation_url = $request->relationUrl;
            // $TouristArea->fileName = $submitPath;
            $TouristArea->save();



            return response()->json($TouristArea);
        } catch (\Exception $e) {
            $error_code = $e->getMessage();
            $error_message = $error_code;
            return response()->json(['error' => $error_message], $this->$error_code);
        }
    }
}
