<?php

namespace App\Http\Requests\Admin\List;

use Illuminate\Foundation\Http\FormRequest;

class ListUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'requred|string|max:255|min:1',
            'description' => 'nullable|string'
        ];
    }
}
