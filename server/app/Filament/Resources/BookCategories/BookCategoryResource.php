<?php

namespace App\Filament\Resources\BookCategories;

use App\Filament\Resources\BookCategories\Pages\ManageBookCategories;
use App\Models\BookCategory;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class BookCategoryResource extends Resource
{
    protected static ?string $model = BookCategory::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::RectangleGroup;

    protected static ?string $recordTitleAttribute = 'books categories';

    protected static ?string $navigationLabel = 'Book Categories';

    protected static string | UnitEnum | null $navigationGroup = 'Books';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->label('Book Category Name')
                    ->columnSpanFull(),

                Textarea::make('description')
                    ->rows(7)
                    ->required()
                    ->label('Book Category Description')
                    ->columnSpanFull(),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('description'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('books categories')
            ->modifyQueryUsing(fn ($query) => $query->withCount('books'))
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('books_count')
                    ->label('Number of Books')
                    ->counts('books')
                    ->sortable()
                    ->badge()
                    ->color(fn ($state): string => $state > 0 ? 'success' : 'gray'),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageBookCategories::route('/'),
        ];
    }
}
