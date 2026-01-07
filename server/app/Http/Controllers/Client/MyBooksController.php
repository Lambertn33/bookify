<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MyBooksController extends Controller
{
    public function getMyBooks(Request $request)
    {
        $request->headers->set('Accept', 'application/json');
        $user = auth()->user();
        $client = $user->client;
        $books = $client->books;
        $formattedBooks = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'cover_image_url' => $book->getCoverImageUrlAttribute(),
                'book_path_url' => $book->getBookPathSignedUrl(60), // 60 minutes expiration
            ];
        });
        return response()->json([
            'message' => 'Books fetched successfully',
            'books' => $formattedBooks,
        ], 200);
    }
}
