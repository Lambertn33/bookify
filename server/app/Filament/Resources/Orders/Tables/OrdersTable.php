<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use App\Models\Order;
use App\Filament\Resources\Orders\OrderResource;
use Filament\Support\Icons\Heroicon;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('client.user.name')
                    ->label('Client Name')->sortable()->searchable()->icon(Heroicon::User),
                TextColumn::make('client.user.email')
                    ->label('Client Email')->sortable()->searchable()->icon(Heroicon::Envelope),
                TextColumn::make('total')
                    ->label('Total Amount')
                    ->money('USD')->sortable()->icon(Heroicon::CurrencyDollar),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        Order::PENDING => 'warning',
                        Order::PAID => 'success',
                        Order::CANCELLED => 'danger',
                    })->sortable()->icon(Heroicon::CheckCircle),
                TextColumn::make('created_at')
                    ->label('Ordering Date')
                    ->dateTime('d-m-Y')->sortable()->icon(Heroicon::Calendar),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make()
                // EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
