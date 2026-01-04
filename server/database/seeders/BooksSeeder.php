<?php

namespace Database\Seeders;

use App\Jobs\UploadBookCover;
use App\Jobs\UploadBookPdf;
use App\Models\Book;
use App\Models\BookCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BooksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Storage::disk('s3')->deleteDirectory('books');
        Storage::disk('s3')->deleteDirectory('covers');
       
        $categories = BookCategory::all()->pluck('id', 'name');
        
        $books = [
            [
                'category' => 'Fiction',
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'description' => 'A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.',
                'price' => 12.99,
                'stock' => 500,
                'published_year' => 1925,
                'cover_image' => 'the-great-gatsby.jpeg',
                'book_path' => 'book-2.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'All the Light We Cannot See',
                'author' => 'Anthony Doerr',
                'description' => 'A beautiful, stunningly ambitious novel about a blind French girl and a German boy whose paths collide in occupied France as both try to survive the devastation of World War II.',
                'price' => 15.99,
                'stock' => 450,
                'published_year' => 2014,
                'cover_image' => 'all-the-lights-we-cannot-see.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'The Covenant of Water',
                'author' => 'Abraham Verghese',
                'description' => 'A stunning and magisterial new epic of love, faith, and medicine, set in Kerala, South India, following three generations of a family seeking the answers to a strange secret.',
                'price' => 18.99,
                'stock' => 400,
                'published_year' => 2023,
                'cover_image' => 'covenant-of-water.jpeg',
                'book_path' => 'book-2.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'The Deluge',
                'author' => 'Stephen Markley',
                'description' => 'An epic novel about climate change, political extremism, and the fight for a better future, following a cast of characters through the next two decades.',
                'price' => 19.99,
                'stock' => 350,
                'published_year' => 2023,
                'cover_image' => 'the-deluge.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'A Million to One',
                'author' => 'Tony Faggioli',
                'description' => 'A gripping thriller about a man who must overcome impossible odds to save what matters most.',
                'price' => 14.99,
                'stock' => 300,
                'published_year' => 2020,
                'cover_image' => 'a-million-to-one.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Call of the Maze',
                'author' => 'Unknown Author',
                'description' => 'An intriguing mystery novel that takes readers through a complex labyrinth of secrets and discoveries.',
                'price' => 13.99,
                'stock' => 250,
                'published_year' => 2021,
                'cover_image' => 'call-of-the-maze.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Daughters of Men',
                'author' => 'Unknown Author',
                'description' => 'A powerful story exploring the relationships and bonds between women across generations.',
                'price' => 16.99,
                'stock' => 280,
                'published_year' => 2022,
                'cover_image' => 'daughters-of-men.jpeg',
                'book_path' => 'book-2.pdf',
            ],
            [
                'category' => 'History',
                'title' => 'Embers of the Republic',
                'author' => 'Unknown Author',
                'description' => 'A historical examination of the foundations and evolution of democratic institutions.',
                'price' => 17.99,
                'stock' => 320,
                'published_year' => 2021,
                'cover_image' => 'embers-of-the-republic.jpg',
                'book_path' => 'book-2.pdf',
            ],
            [
                'category' => 'Non-Fiction',
                'title' => 'Journaling with Faith',
                'author' => 'Unknown Author',
                'description' => 'A guide to spiritual reflection and personal growth through the practice of faith-based journaling.',
                'price' => 11.99,
                'stock' => 420,
                'published_year' => 2022,
                'cover_image' => 'Journaling-with-faith.webp',
                'book_path' => 'book-2.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Pride and Pressure',
                'author' => 'Unknown Author',
                'description' => 'A contemporary novel exploring themes of identity, expectations, and the weight of societal pressures.',
                'price' => 15.99,
                'stock' => 380,
                'published_year' => 2023,
                'cover_image' => 'pride-and-pressure.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Sugar Run',
                'author' => 'Mesha Maren',
                'description' => 'A gritty, atmospheric novel about a woman released from prison who must navigate a changed world while confronting her past.',
                'price' => 14.99,
                'stock' => 330,
                'published_year' => 2019,
                'cover_image' => 'sugar-run.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Summer of Us',
                'author' => 'Unknown Author',
                'description' => 'A heartwarming coming-of-age story set during a transformative summer that changes everything.',
                'price' => 13.99,
                'stock' => 360,
                'published_year' => 2022,
                'cover_image' => 'summer-of-us.jpeg',
                'book_path' => 'call-of-the-maze.pdf',
            ],
            [
                'category' => 'Fiction',
                'title' => 'Tess of the Road',
                'author' => 'Rachel Hartman',
                'description' => 'A fantasy novel following a young woman who embarks on a journey of self-discovery and adventure.',
                'price' => 16.99,
                'stock' => 290,
                'published_year' => 2018,
                'cover_image' => 'tess-of-the-road.webp',
                'book_path' => 'book-2.pdf',
            ],
        ];

        foreach ($books as $bookData) {
            $categoryId = $categories[$bookData['category']] ?? $categories->first();
            
            $coverImageFilename = null;
            if (isset($bookData['cover_image'])) {
                $uploadJob = new UploadBookCover($bookData['cover_image']);
                $coverImageFilename = $uploadJob->handle();
                
                if (!$coverImageFilename) {
                    $this->command->warn("Failed to upload cover image for: {$bookData['title']}");
                }
            }

            if (isset($bookData['book_path'])) {
                $uploadJob = new UploadBookPdf($bookData['book_path']);
                $bookPdfFilename = $uploadJob->handle();
                
                if (!$bookPdfFilename) {
                    $this->command->warn("Failed to upload book PDF for: {$bookData['title']}");
                }
            }
            Book::create([
                'category_id' => $categoryId,
                'title' => $bookData['title'],
                'author' => $bookData['author'],
                'description' => $bookData['description'],
                'price' => $bookData['price'],
                'stock' => $bookData['stock'],
                'cover_image' => $coverImageFilename,
                'book_path' => $bookPdfFilename,
                'published_year' => $bookData['published_year'],
            ]);
            
            $this->command->info("Created book: {$bookData['title']}");
        }
    }
}
