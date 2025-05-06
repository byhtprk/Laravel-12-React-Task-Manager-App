<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $guarted = [];

    public function list(): BelongsTo
    {
        return $this->belongsTo(Liste::class);
    }
}
