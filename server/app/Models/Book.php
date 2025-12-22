<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'category_id',
        'title', 
        'description', 
        'author', 
        'price', 
        'stock', 
        'cover_image', 
        'book_path', 
        'published_year',
        'is_active',
    ];

    /**
     * Get the category that owns the Book
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * The orders that belong to the Book
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_items', 'book_id', 'order_id')
        ->withPivot('quantity', 'unit_price', 'total_price');
    }
    
    public function isStockAlmostEmpty(): bool
    {
        return $this->stock <= 10;
    }

    public function isStockEmpty(): bool
    {
        return $this->stock == 0;
    }
}
