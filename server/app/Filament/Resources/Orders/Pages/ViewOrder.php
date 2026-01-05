<?php

namespace App\Filament\Resources\Orders\Pages;

use App\Filament\Resources\Orders\OrderResource;
use Filament\Resources\Pages\ViewRecord;
use Filament\Actions\Action;
use Filament\Support\Icons\Heroicon;
use App\Models\Order;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    public function getTitle(): string
    {
        return 'Order Details';
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('Approve and Ship')
                ->color('success')
                ->icon(Heroicon::CheckCircle)
                ->action(function (Order $order) {
                    // $order->update(['status' => Order::APPROVED_AND_SHIPPED]);
                    dd($order);
                })
                ->visible(fn (Order $order): bool => $order->status === Order::PENDING)
                ->requiresConfirmation()
                ->modalDescription('Are you sure you want to approve and ship this order?')
                ->modalHeading('Approve and Ship Order')
                ->modalSubmitActionLabel('Approve and Ship')
                ->modalCancelActionLabel('Cancel'),
        ];
    }
}

