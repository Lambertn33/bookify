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
            'Programming',
            'Database',
            'Web Development',
            'Mobile Development',
            'Machine Learning',
            'Artificial Intelligence',
            'Data Science',
            'Cybersecurity',
            'Network Security',
        ];
        $descriptions = [
            'Fiction books are stories that are not based on real events.',
            'Non-Fiction books are stories that are based on real events.',
            'Biography books are stories about the life of a person.',
            'History books are stories about the past.',
            'Science books are stories about science.',
            'Technology books are stories about technology.',
            'Programming books are stories about programming.',
            'Database books are stories about databases.',
            'Web Development books are stories about web development.',
            'Mobile Development books are stories about mobile development.',
            'Machine Learning books are stories about machine learning.',
            'Artificial Intelligence books are stories about artificial intelligence.',
            'Data Science books are stories about data science.',
            'Cybersecurity books are stories about cybersecurity.',
            'Network Security books are stories about network security.',
        ];
        foreach ($categories as $index => $category) {
            BookCategory::create([
                'name' => $category,
                'description' => $descriptions[$index],
            ]);
        }
    }   
}
