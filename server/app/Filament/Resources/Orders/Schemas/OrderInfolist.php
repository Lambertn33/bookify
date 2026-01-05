<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\RepeatableEntry;
use App\Models\Order;
use Filament\Support\Icons\Heroicon;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\TextSize;

class OrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Order Information')
                    ->schema([
                        TextEntry::make('status')
                            ->label('Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                Order::PENDING => 'warning',
                                Order::PAID => 'success',
                                Order::CANCELLED => 'danger',
                            }),
                        TextEntry::make('total')
                            ->label('Total Amount')
                            ->icon(Heroicon::CurrencyDollar)
                            ->weight(FontWeight::Bold)
                            ->size(TextSize::Large)
                            ->money('USD'),
                        TextEntry::make('created_at')
                            ->label('Order Date')
                            ->icon(Heroicon::Calendar)
                            ->weight(FontWeight::Bold)
                            ->dateTime('d-m-Y'),
                    ])
                    ->columns(2),
                
                Section::make('Client Information')
                    ->schema([
                        TextEntry::make('client.user.name')->icon(Heroicon::User)->weight(FontWeight::Bold),
                        TextEntry::make('client.user.email')->icon(Heroicon::Envelope)->weight(FontWeight::Bold),
                        TextEntry::make('client.phone')->icon(Heroicon::Phone)->weight(FontWeight::Bold),
                        TextEntry::make('client.address')->icon(Heroicon::BuildingOffice)->weight(FontWeight::Bold),
                        TextEntry::make('client.city')->icon(Heroicon::BuildingOffice)->weight(FontWeight::Bold),
                    ])
                    ->columns(2),
                
                Section::make('Order Items')
                    ->schema([
                        RepeatableEntry::make('books')
                            ->label('Books')
                            ->schema([
                                TextEntry::make('title')
                                    ->weight(FontWeight::Bold)
                                    ->label('Book Title'),
                                TextEntry::make('author')
                                    ->weight(FontWeight::Bold)
                                    ->label('Author'),
                                TextEntry::make('pivot.quantity')
                                    ->weight(FontWeight::Bold)
                                    ->label('Quantity'),
                                TextEntry::make('pivot.unit_price')
                                    ->weight(FontWeight::Bold)
                                    ->label('Unit Price')
                                    ->money('USD'),
                                TextEntry::make('pivot.total_price')
                                    ->weight(FontWeight::Bold)
                                    ->label('Total Price')
                                    ->money('USD'),
                            ])
                            ->columns(5),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}

