<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    const STATUSES = [
        'PENDING',
        'PAID',
        'CANCELLED',
    ];

    const PENDING = self::STATUSES[0];
    const PAID = self::STATUSES[1];
    const CANCELLED = self::STATUSES[2];
    
    protected $fillable = [
        'client_id',
        'total',
        'status'
    ];

    /**
     * The books that belong to the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'order_items', 'order_id', 'book_id')
            ->withPivot('quantity', 'unit_price', 'total_price');
    }

    /**
     * Get the client that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
