<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Liste extends Model
{
    protected $guarded = [];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'list_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
