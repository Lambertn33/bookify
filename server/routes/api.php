<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BooksCategoriesController;
use App\Http\Controllers\Client\BooksController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/categories', [BooksCategoriesController::class, 'index']);
Route::prefix('books')->group(function () {
    Route::get('/', [BooksController::class, 'index']);
});
