<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTouristAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tourist_areas', function (Blueprint $table) {
            $table->increments('id')->unique('id')->comment('ID');
            $table->string('tourist_area_name', 30)->comment('観光地名称');
            $table->string('tourist_area_catchphrase', 100)->comment('キャッチフレーズ');
            $table->string('tourist_area_detail', 1000)->comment('観光地詳細');
            $table->integer('tourist_area_postal')->comment('郵便番号');
            $table->string('tourist_area_city', 30)->comment('市町村');
            $table->string('tourist_area_number_address', 100)->comment('字・番地');
            $table->string('tourist_area_other_address', 100)->nullable()->comment('その他住所');
            $table->string('tourist_area_phone_number',17)->comment('電話番号')->change();
            $table->string('tourist_area_relation_url', 100)->nullable()->comment('関連サイト');
            $table->string('tourist_area_category_ids', 100)->comment('カテゴリ※カンマ区切り文字列')->change();
            $table->foreign('tourist_area_image_id')->references('id')->on('images')->nullable()->comment('imagesテーブルのid')->change();
            $table->timestamps();
            $table->softDeletes()->comment('論理削除フラグ');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tourist_areas');
    }
}
