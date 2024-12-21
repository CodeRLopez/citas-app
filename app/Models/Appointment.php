<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{

    protected $fillable = [
        'start',
        'end',
        'title',
        'status',
        'time',
        'user_id'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
