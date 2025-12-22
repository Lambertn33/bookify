<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Client;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'names' => 'Admin',
                'email' => 'admin@books-store.com',
                'password' => Hash::make('password123'),
                'role' => User::ADMIN,
                'auth-type' => User::WEB_AUTH,
            ],
            [
                'names' => 'Client',
                'email' => 'client@books-store.com',
                'password' => Hash::make('password123'),
                'role' => User::CLIENT,
                'auth-type' => User::MOBILE_AUTH,
            ],
        ];

       foreach ($users as $user) {
            $createdUser = User::create($user);
            if ($createdUser->role == User::CLIENT) {
                Client::create([
                    'user_id' => $createdUser->id,
                    'address' => '123 Main St',
                    'city' => 'Riyadh',
                    'balance' => 10000,
                    'phone' => '250788112233',
                ]);
            }
        }
    }
}
