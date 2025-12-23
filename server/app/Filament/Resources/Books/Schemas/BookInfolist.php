<?php

namespace App\Filament\Resources\Books\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Illuminate\Support\HtmlString;

class BookInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('category.name')
                    ->label('Category'),
                TextEntry::make('title'),
                TextEntry::make('author'),
                TextEntry::make('price')
                    ->money('USD'),
                TextEntry::make('stock'),
                TextEntry::make('published_year'),
                ImageEntry::make('cover_image')
                    ->label('Cover Image')
                    ->disk('s3')
                    ->defaultImageUrl(fn ($record) => $record?->getCoverImageSignedUrl(60))
                    ->height(200),
                TextEntry::make('book_path')
                    ->label('Book PDF')
                    ->formatStateUsing(function ($record) {
                        if (!$record?->book_path) {
                            return 'No file';
                        }
                        
                        // Use signed URL for private S3 access (expires in 1 hour)
                        $signedUrl = $record->getBookPathSignedUrl(60);
                        return new HtmlString('<a href="' . $signedUrl . '" target="_blank" class="text-primary-600 hover:underline">Download PDF</a>');
                    })
                    ->html(),
                TextEntry::make('description')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
