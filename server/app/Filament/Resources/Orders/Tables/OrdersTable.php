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
use Filament\Actions\Action;
use App\Services\OrdersServices;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->label('Order Code')->sortable()->searchable()->icon(Heroicon::Identification),
                TextColumn::make('client.user.name')
                    ->label('Client Name')->sortable()->searchable()->icon(Heroicon::User),
                TextColumn::make('total')
                    ->label('Total Amount')
                    ->money('USD')->sortable()->icon(Heroicon::CurrencyDollar),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        Order::PENDING => 'warning',
                        Order::CONFIRMED => 'success',
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
                ViewAction::make(),
                Action::make('approveAndShip')
                    ->label('Approve and Ship')
                    ->color('success')
                    ->icon(Heroicon::CheckCircle)
                    ->action(function (Order $order) {
                        (new OrdersServices)->approveAndShipOrder($order->id);
                    })
                    ->visible(fn (Order $order): bool => $order->status === Order::PENDING)
                    ->requiresConfirmation()
                    ->modalDescription('Are you sure you want to approve and ship this order?')
                    ->modalHeading('Approve and Ship Order')
                    ->modalSubmitActionLabel('Approve and Ship')
                    ->modalCancelActionLabel('Cancel'),

                // EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
