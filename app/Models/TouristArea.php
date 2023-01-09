<?php

namespace App\Models;

use App\Http\Controllers\Api\TouristAreaController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * PostControllerから呼び出される
 */

/**
 * 他の名前を明示的に指定しない限り、クラス名を複数形の「スネークケース」にしたものが、
 * テーブル名として使用
 * テーブル名指定方法 => protected $table = 'table_name'
 * プライマリキー指定方法 => protected $primsryKey = "primsryKeyName"
 */

class TouristArea extends Model
{
    use HasFactory;
}
