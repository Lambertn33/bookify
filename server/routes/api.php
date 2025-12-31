<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BooksCategoriesController;
use App\Http\Controllers\Client\BooksController;
use App\Http\Controllers\Client\AuthController;

Route::get('/categories', [BooksCategoriesController::class, 'index']);
Route::prefix('books')->group(function () {
    Route::get('/', [BooksController::class, 'index']);
    Route::get('/{id}', [BooksController::class, 'show']);
});

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', 'logout');
    });
});
