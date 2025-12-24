<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookCategory;

class BooksCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Fiction',
            'Non-Fiction',
            'Biography',
            'History',
            'Science',
            'Technology',
        ];
        $descriptions = [
            'Fiction books are stories that are not based on real events.',
            'Non-Fiction books are stories that are based on real events.',
            'Biography books are stories about the life of a person.',
            'History books are stories about the past.',
            'Science books are stories about science.',
            'Technology books are stories about technology.',
        ];
        foreach ($categories as $index => $category) {
            BookCategory::create([
                'name' => $category,
                'description' => $descriptions[$index],
            ]);
        }
    }   
}
