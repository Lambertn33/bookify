<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

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
        return $this->belongsTo(BookCategory::class, 'category_id');
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

    /**
     * The clients that belong to the Book
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'client_books', 'book_id', 'client_id');
    }

    /**
     * Get all of the reviews for the Client
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'book_id');
    }
    
    public function isStockAlmostEmpty(): bool
    {
        return $this->stock <= 10;
    }

    public function isStockEmpty(): bool
    {
        return $this->stock == 0;
    }

    /**
     * Get the full URL for the cover image
     *
     * @return string|null
     */
    public function getCoverImageUrlAttribute(): ?string
    {
        if (!$this->cover_image) {
            return null;
        }

        if (filter_var($this->cover_image, FILTER_VALIDATE_URL)) {
            return $this->cover_image;
        }

 
        return Storage::disk('s3')->url($this->cover_image);
    }

    /**
     * Get the full URL for the book PDF
     *
     * @return string|null
     */
    public function getBookPathUrlAttribute(): ?string
    {
        if (!$this->book_path) {
            return null;
        }

        // If it's already a full URL, return it
        if (filter_var($this->book_path, FILTER_VALIDATE_URL)) {
            return $this->book_path;
        }

        // Generate S3 URL (book_path already includes 'books/' directory)
        return Storage::disk('s3')->url($this->book_path);
    }

    /**
     * Get a signed URL for the cover image (expires in specified minutes)
     * Useful for private access
     *
     * @param int $expirationMinutes
     * @return string|null
     */
    public function getCoverImageSignedUrl(int $expirationMinutes = 60): ?string
    {
        if (!$this->cover_image) {
            return null;
        }

        // Generate signed URL for cover image
        $path = 'covers/' . $this->cover_image;
        return Storage::disk('s3')->temporaryUrl(
            $path,
            now()->addMinutes($expirationMinutes)
        );
    }

    /**
     * Get a signed URL for the book PDF (expires in specified minutes)
     * Useful for private downloads
     *
     * @param int $expirationMinutes
     * @return string|null
     */
    public function getBookPathSignedUrl(int $expirationMinutes = 60): ?string
    {
        if (!$this->book_path) {
            return null;
        }

        // book_path should now contain the full S3 path (e.g., 'books/filename.pdf')
        // But we'll handle both cases for backward compatibility
        $s3Path = str_starts_with($this->book_path, 'books/') 
            ? $this->book_path 
            : 'books/' . $this->book_path;

        // Generate signed URL (expires in specified minutes)
        return Storage::disk('s3')->temporaryUrl(
            $s3Path,
            now()->addMinutes($expirationMinutes)
        );
    }
}
