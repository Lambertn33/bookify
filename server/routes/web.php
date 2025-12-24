<?php

use Illuminate\Support\Facades\Route;
use App\Models\Book;

Route::get('/', function () {
    $books = Book::all();
    return response()->json($books);
});

// Route::get('/books', function () {
//     $books = Book::all();
//     return view('books.index', compact('books'));
// });