<?php

namespace App\Filament\Resources\Orders\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Order;
use Filament\Support\Icons\Heroicon;

class OrdersOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Orders', Order::count())
                ->description('Total number of orders')
                ->descriptionIcon(Heroicon::ShoppingCart)
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('info'),
            Stat::make('Pending Orders', Order::where('status', Order::PENDING)->count())
                ->description('Number of pending orders')
                ->descriptionIcon(Heroicon::Clock)
                ->chart([2, 6, 10, 3, 2, 8, 17])
                ->color('warning'),
            Stat::make('Confirmed Orders', Order::where('status', Order::CONFIRMED)->count())
                ->description('Number of confirmed orders')
                ->descriptionIcon(Heroicon::CheckCircle)
                ->chart([12, 6, 1, 13, 2, 28, 7])
                ->color('success'),
            Stat::make('Cancelled Orders', Order::where('status', Order::CANCELLED)->count())
                ->description('Number of cancelled orders')
                ->descriptionIcon(Heroicon::XCircle)
                ->chart([2, 6, 10, 3, 2, 8, 17])
                ->color('danger'),
        ];
    }
}
