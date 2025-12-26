<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BooksController extends Controller
{
        public function index(Request $request)
        {
            $perPage = $request->query('per_page', 10);
            $page = $request->query('page', 1);
            $categoryId = $request->query('category_id');
            $search = $request->query('search');
            
            $books = Book::query();
            
            if ($categoryId) {
                $books->where('category_id', $categoryId);
            }
            
            if ($search) {
                $books->where(function ($query) use ($search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhere('author', 'like', '%' . $search . '%');
                });
            }
            
            $books = $books->with('category:id,name')
                ->select('id', 'category_id', 'title', 'author', 'price', 'cover_image')
                ->paginate($perPage, ['*'], 'page', $page);

            $books->getCollection()->transform(function ($book) {
                $book->cover_image_url = $book->getCoverImageUrlAttribute();
                return $book;
            });
                
            return response()->json([
                'books' => $books,
            ]);
        }
}
