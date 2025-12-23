<?php

namespace App\Filament\Resources\Books\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Jobs\DeleteBookFile;

class BooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->reorderable('title')
            ->reorderable('author')
            ->reorderable('category.name')
            ->reorderable('price')
            ->reorderable('stock')
            ->reorderable('published_year')
            ->columns([

                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('author')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category.name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('price')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('stock')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('published_year')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make()
                    ->before(function ($record) {
                        DeleteBookFile::dispatch($record->book_path);
                        DeleteBookFile::dispatch($record->cover_image);
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(function ($records) {
                            foreach ($records as $record) {
                                if ($record->book_path) {
                                    DeleteBookFile::dispatch($record->book_path);
                                }
                                
                                if ($record->cover_image) {
                                    DeleteBookFile::dispatch($record->cover_image);
                                }
                            }
                        }),
                ]),
            ]);
    }
}
