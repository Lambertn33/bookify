<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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
        User::create($user);
       }
    }
}
