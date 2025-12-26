<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BookCategory;

class BooksCategoriesController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        
        $categories = BookCategory::select('id', 'name')
            ->paginate($perPage, ['*'], 'page', $page);
            
        return response()->json([
            'categories' => $categories,
        ]);
    }
}
