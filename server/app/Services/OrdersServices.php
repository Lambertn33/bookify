<?php

namespace App\Services;

use App\Models\Order;
use Filament\Actions\Action;
use App\Filament\Resources\Orders\OrderResource;
use App\Services\NotificationsService;
use App\Models\Client;

class OrdersServices
{
    public function approveAndShipOrder(int $orderId)
    {
        $order = Order::with('books')->with('client')->find($orderId);
        $client = $order->client;
        
        if (!$order) {
            throw new \Exception('Order not found');
        }
        $order->books->each(function ($book) use ($client) {
            $book->update(['stock' => $book->stock - $book->pivot->quantity]);
            $this->addBookToClient($client, $book->id);
        });
        
        $order->update(['status' => Order::CONFIRMED]);
    }

    public function addBookToClient(Client $client, int $bookId)
    {
        $client->books()->attach($bookId);
    }
}