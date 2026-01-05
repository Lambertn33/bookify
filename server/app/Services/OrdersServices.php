<?php

namespace App\Services;

use App\Models\Order;
use Filament\Actions\Action;
use App\Filament\Resources\Orders\OrderResource;
use App\Services\NotificationsService;

class OrdersServices
{
    public function approveAndShipOrder(int $orderId)
    {
        $order = Order::with('books')->with('client')->find($orderId);
        $client = $order->client;
        
        if (!$order) {
            throw new \Exception('Order not found');
        }
        $order->books->each(function ($book) {
            $book->update(['stock' => $book->stock - $book->pivot->quantity]);
        });
        $order->update(['status' => Order::CONFIRMED]);

        $client->update(['balance' => $client->balance - $order->total]);
    }
}