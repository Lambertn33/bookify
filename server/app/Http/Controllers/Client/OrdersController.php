<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Book;
use App\Models\Client;
use App\Models\User;
use App\Services\NotificationsService;
use Filament\Actions\Action;
use App\Filament\Resources\Orders\OrderResource;


class OrdersController extends Controller
{
    public function createOrder(Request $request)
    {
        $request->headers->set('Accept', 'application/json');
        $user = auth()->user();
        $client = $user->client;
        $total = 0;
        
        if (!$client) {
            return response()->json([
                'message' => 'Client not found',
            ], 404);
        }
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.book_id' => 'required|integer|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);
        
        foreach ($request->items as $item) {
            $book = Book::find($item['book_id']);
            if (!$book) {
                return response()->json([
                    'message' => "Book not found: {$item['book_id']}",
                ], 404);
            }

            if ($book->stock < $item['quantity']) {
                return response()->json([
                    'message' => "Book stock not enough: {$book->title} - {$book->stock} < {$item['quantity']}",
                ], 422);
            }
            $total += $book->price * $item['quantity'];
        }

        $newOrder = Order::create([
            'client_id' => $client->id, 
            'total' => $total,
            'status' => Order::PENDING,
        ]);

        foreach ($request->items as $index => $item) {
            $book = Book::find($item['book_id']);
            $newOrder->books()->attach($item['book_id'], [
                'quantity' => $item['quantity'],
                'unit_price' => $book->price,
                'total_price' => $book->price * $item['quantity'],
            ]);
        }
        (new NotificationsService)->sendNotification('New Order Made', "New order has been created by {$user->name}", [
            Action::make('View Order')
                ->url(OrderResource::getUrl('view', ['record' => $newOrder]))
                ->label('View Order')
                ->markAsRead()
                ->color('primary'),
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $newOrder->load('books'),
        ], 201);
    }

    public function cancelOrder(Request $request, Order $order)
    {
        $request->headers->set('Accept', 'application/json');
        $user = auth()->user();
        $client = $user->client;

        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
            ], 404);
        }

        if ($order->client_id !== $client->id) {
            return response()->json([
                'message' => 'You are not authorized to cancel this order',
            ], 403);
        }

        if ($order->status !== Order::PENDING) {
            return response()->json([
                'message' => 'Order is not pending',
            ], 400);
        }

        $order->update(['status' => Order::CANCELLED]);
        (new NotificationsService)->sendNotification('Order Cancelled', "Order # {$order->id} has been cancelled by {$user->name}", [
            Action::make('View Order')
                ->url(OrderResource::getUrl('view', ['record' => $order]))
                ->label('View Cancelled Order')
                ->markAsRead()
                ->color('primary'),
        ]);
        return response()->json([
            'message' => 'Order cancelled successfully',
            'order' => $order,
        ], 200);
    }
}
