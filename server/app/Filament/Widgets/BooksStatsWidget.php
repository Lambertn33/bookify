<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Book;
use Filament\Support\Icons\Heroicon;

class BooksStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $totalBooks = Book::count();
        $lowStockBooks = Book::where('stock', '<=', 10)->where('stock', '>', 0)->count();
        $outOfStockBooks = Book::where('stock', 0)->count();

        return [
            Stat::make('Total Books', $totalBooks)
                ->description('All books in inventory')
                ->descriptionIcon(Heroicon::BookOpen)
                ->color('info'),
            Stat::make('Low Stock', $lowStockBooks)
                ->description('Books with stock ≤ 10')
                ->descriptionIcon(Heroicon::ExclamationTriangle)
                ->color('warning'),
            Stat::make('Out of Stock', $outOfStockBooks)
                ->description('Books with no stock')
                ->descriptionIcon(Heroicon::XCircle)
                ->color('danger'),
        ];
    }
}

