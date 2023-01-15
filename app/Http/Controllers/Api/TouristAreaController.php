<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\TouristArea;
use App\Models\Image;
use App\Http\Requests\TouristAreaRegisterRequest;

class TouristAreaController extends Controller
{
    public function index()
    {
        $posts = TouristArea::all();
        return response()->json($posts, 200);
    }

    public function create(TouristAreaRegisterRequest $request)
    {
        clock($request);
        DB::beginTransaction();
        try {
            $TouristArea = new TouristArea;
            $TouristArea->tourist_area_name = $request->touristAreaName;
            $TouristArea->tourist_area_catchphrase = $request->touristAreaCatchPhrase;
            $TouristArea->tourist_area_detail = $request->touristAreaDetail;
            $TouristArea->tourist_area_city = $request->touristAreaCity;
            $TouristArea->tourist_area_categories = $request->touristAreaCategories;
            $TouristArea->tourist_area_postal = $request->touristAreaPostal;
            $TouristArea->tourist_area_number_address = $request->touristAreaNumberAddress;
            $TouristArea->tourist_area_other_address = $request->touristAreaOtherAddress;
            $TouristArea->tourist_area_phone_number = $request->touristAreaPhoneNumber;
            $TouristArea->tourist_area_relation_url = $request->touristAreaRelationUrl;
            $TouristArea->save();
            $lastInsertTouristAreaId = $TouristArea->id;

            $imageArray = $request->file("imageArray");
            foreach ($imageArray as $imageFile) {
                $imageFileOriginalName = $imageFile->getClientOriginalName();
                $path = "";
                $displayImage = "";
                $submitPath = "";
                $submitImageName = "";
                $isDisplayImage = false;

                $Image = new Image;
                $displayImage  = $request->displayImage;
                $path = $imageFile->store("public/images");
                $submitPath = str_replace("public/", "", $path);
                $submitImageName = str_replace("public/images/", "", $path);
                if ($imageFileOriginalName === $displayImage) {
                    $isDisplayImage = true;
                }
                $Image->image_relation_tabel = "tourist_areas";
                $Image->image_relation_id = $lastInsertTouristAreaId;
                $Image->image_name = $submitImageName;
                $Image->image_path = $submitPath;
                $Image->image_display_flg = $isDisplayImage;
                $Image->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            $errorCode = $e->getMessage();
            $errorMessage = $errorCode;
            return response()->json(['error' => $errorMessage], $this->$errorCode);
        }
    }
}
