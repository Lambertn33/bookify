<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BooksCategoriesController;
use App\Http\Controllers\Client\BooksController;
use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\OrdersController;

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

Route::prefix('orders')->middleware('auth:sanctum')->controller(OrdersController::class)->group(function () {
    Route::post('/', 'createOrder');
    Route::prefix('{order}')->group(function () {
        Route::put('/cancel', 'cancelOrder');
    });
});
