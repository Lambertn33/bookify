<?php

namespace App\Filament\Resources\Clients\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ClientsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->withCount(['books', 'orders']))
            ->columns([
                TextColumn::make('user.names')
                    ->label('Names')
                    ->searchable()->sortable(),
                TextColumn::make('address')
                    ->label('Address')
                    ->searchable()->sortable(),
                TextColumn::make('city')
                    ->label('City')
                    ->searchable()->sortable(),
                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()->sortable(),
                TextColumn::make('books_count')
                    ->label('Total Purchased Books')
                    ->counts('books')
                    ->sortable(),
                TextColumn::make('orders_count')
                    ->label('Total Orders')
                    ->counts('orders')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Joined Date')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                // EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    // DeleteBulkAction::make(),
                ]),
            ]);
    }
}
