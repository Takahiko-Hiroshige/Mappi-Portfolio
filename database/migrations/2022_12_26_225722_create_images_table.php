<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id')->unique('id')->comment('ID');
            $table->string('image_name', 100)->comment('画像名');
            $table->string('image_path', 100)->comment('画像Path');
            $table->boolean('image_display_flg')->default(false)->comment('メイン画像フラグ');
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
        Schema::dropIfExists('images');
    }
}
