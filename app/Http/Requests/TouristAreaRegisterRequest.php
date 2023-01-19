<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TouristAreaRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'touristAreaName' => ['required', 'max:30'],
            'touristAreaCatchPhrase' => ['required', 'max:30'],
            'touristAreaDetail' => ['required', 'max:500'],
            'touristAreaCategories' => ['required'],
            'touristAreaCity' => ['required'],
            'touristAreaPostal' => ['required', 'digits:7'],
            'touristAreaNumberAddress' => ['required'],
            'touristAreaPhoneNumber' => ['required', 'regex:/^[0-9\-]+$/i', 'max:14'],
            'touristAreaRelationUrl' => ['url'],
        ];
    }

    public function messages()
    {
        return [
            'touristAreaName.required' => '入力されていません',
            'touristAreaName.max' => '30文字以内で入力してください',
            'touristAreaCatchPhrase.required' => '入力されていません',
            'touristAreaCatchPhrase.max' => '30文字以内で入力してください',
            'touristAreaDetail.required' => '入力されていません',
            'touristAreaDetail.max' => '500文字以内で入力してください',
            'touristAreaCategories.required' => '選択されていません',
            'touristAreaCity.required' => '選択されていません',
            'touristAreaPostal.required' => '郵便番号が入力されていません',
            'touristAreaPostal.digits' => '半角数字の7文字で入力してください',
            'touristAreaNumberAddress.required' => '入力されていません',
            'touristAreaPhoneNumber.required' => '入力されていません',
            'touristAreaPhoneNumber.regex' => '半角数字で電話番号を入力してください',
            'touristAreaPhoneNumber.max' => '半角数字で電話番号を入力してください',
            'touristAreaRelationUrl.url'  => '正しいURLを入力してください',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'status' => 400,
            'failedValidation' => true,
            'errors' => $validator->errors(),
        ], 200);
        throw new HttpResponseException($response);
    }
}
