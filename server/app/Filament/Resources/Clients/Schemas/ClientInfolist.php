<?php

namespace App\Filament\Resources\Clients\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\RepeatableEntry;
use App\Models\Order;
use Filament\Support\Icons\Heroicon;
use Filament\Support\Enums\FontWeight;

class ClientInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Client Information')
                    ->schema([
                        TextEntry::make('user.names')
                            ->label('Name')
                            ->icon(Heroicon::User)
                            ->weight(FontWeight::Bold),
                        TextEntry::make('user.email')
                            ->label('Email')
                            ->icon(Heroicon::Envelope)
                            ->weight(FontWeight::Bold),
                        TextEntry::make('phone')
                            ->label('Phone')
                            ->icon(Heroicon::Phone)
                            ->weight(FontWeight::Bold),
                        TextEntry::make('address')
                            ->label('Address')
                            ->icon(Heroicon::BuildingOffice)
                            ->weight(FontWeight::Bold),
                        TextEntry::make('city')
                            ->label('City')
                            ->icon(Heroicon::BuildingOffice)
                            ->weight(FontWeight::Bold),
                        TextEntry::make('created_at')
                            ->label('Joined Date')
                            ->icon(Heroicon::Calendar)
                            ->dateTime('d-m-Y'),
                    ])
                    ->columns(2),
                
                Section::make('Orders')
                    ->schema([
                        RepeatableEntry::make('orders')
                            ->label('Order History')
                            ->schema([
                                TextEntry::make('code')
                                    ->label('Order Code')
                                    ->weight(FontWeight::Bold),
                                TextEntry::make('status')
                                    ->label('Status')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        Order::PENDING => 'warning',
                                        Order::CONFIRMED => 'success',
                                        Order::CANCELLED => 'danger',
                                    }),
                                TextEntry::make('total')
                                    ->label('Total')
                                    ->money('USD'),
                                TextEntry::make('created_at')
                                    ->label('Order Date')
                                    ->dateTime('d-m-Y'),
                            ])
                            ->columns(4),
                    ])
                    ->columnSpanFull(),
                
                Section::make('Purchased Books')
                    ->schema([
                        RepeatableEntry::make('books')
                            ->label('Books')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Book Title')
                                    ->weight(FontWeight::Bold),
                                TextEntry::make('author')
                                    ->label('Author')
                                    ->weight(FontWeight::Bold),
                                TextEntry::make('price')
                                    ->label('Price')
                                    ->money('USD'),
                                TextEntry::make('category.name')
                                    ->label('Category'),
                            ])
                            ->columns(4),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}

