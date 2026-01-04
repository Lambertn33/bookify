<?php

namespace App\Services;

use Filament\Notifications\Notification;
use App\Models\User;

class NotificationsService
{
    public function sendNotification($title, $message, $actions = [])
    {
       $admin = User::where('role', User::ADMIN)->first();
       return $admin->notify(Notification::make()
            ->title($title)
            ->body($message)
            ->actions($actions)
            ->toDatabase());
    }
}