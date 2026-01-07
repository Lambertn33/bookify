<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientBook extends Model
{
    protected $fillable = [ 
        'client_id',
        'book_id',
    ];
}
