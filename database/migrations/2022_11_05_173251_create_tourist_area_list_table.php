<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTouristAreaListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tourist_area_list', function (Blueprint $table) {
            $table->increments('tourist_area_id');
            $table->string('tourist_area_name');
            $table->string('tourist_area_catchphrase');
            $table->string('tourist_area_detail');
            $table->string('tourist_area_postal');
            $table->string('tourist_area_prefecture');
            $table->string('tourist_area_city');
            $table->string('tourist_area_city_kana');
            $table->string('tourist_area_town');
            $table->string('tourist_area_town_kana');
            $table->string('tourist_area_other_address_info'); // 番地・建物名など
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tourist_area_list');
    }
}
