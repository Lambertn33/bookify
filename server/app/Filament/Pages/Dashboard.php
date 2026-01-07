<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function getHeaderWidgets(): array
    {
        return [
            // \App\Filament\Widgets\OrdersOverviewWidget::class,
            // \App\Filament\Widgets\BooksStatsWidget::class,
            // \App\Filament\Widgets\ClientsStatsWidget::class,
            // \App\Filament\Widgets\RevenueWidget::class,
        ];
    }
}

