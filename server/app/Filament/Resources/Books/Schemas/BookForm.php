<?php

namespace App\Filament\Resources\Books\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use App\Models\BookCategory;

class BookForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make([
                    Select::make('category_id')
                    ->label('Category')
                    ->options(BookCategory::all()->pluck('name', 'id'))
                    ->required(),
                TextInput::make('title')
                    ->label('Title')
                    ->required(),
                TextInput::make('author')
                    ->label('Author')
                    ->required(),
                TextInput::make('price')
                    ->label('Price')
                    ->numeric()
                    ->required(),
                TextInput::make('stock')
                    ->label('Stock')
                    ->numeric()
                    ->minValue(0)
                    ->required(),
                TextInput::make('published_year')
                    ->label('Published Year')
                    ->minValue(1900)
                    ->maxValue(date('Y'))
                    ->numeric()
                    ->required(),
                FileUpload::make('cover_image')
                    ->label('Cover Image')
                    ->required(),
                FileUpload::make('book_path')
                    ->label('Book Path')
                    ->required(),
            ])
            ->columns(2)
            ->columnSpanFull()
        ]);
    }
}
