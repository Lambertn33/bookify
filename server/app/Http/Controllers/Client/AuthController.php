<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;
use App\Services\NotificationsService;
use Filament\Actions\Action;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Force JSON response
        $request->headers->set('Accept', 'application/json');
        
        $request->validate([
            'names' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'names' => $request->names,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => User::CLIENT,
                'auth-type' => User::MOBILE_AUTH,
            ]);
            if ($user) {
                Client::create([
                    'user_id' => $user->id,
                    'address' => $request->address,
                    'city' => $request->city,
                    'phone' => $request->phone,
                    'balance' => 10000,
                ]);
                (new NotificationsService)->sendNotification('New System member registered', "A new system member has been registered: {$user->names}", [
                    Action::make('Mark as Read')
                        ->markAsRead()
                        ->color('primary'),
                ]);
                // automatically login the user
                return $this->login($request);
            } else {
                return response()->json(['message' => 'User creation failed'], 500);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Force JSON response
        $request->headers->set('Accept', 'application/json');
        
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        try {
            
            $user = User::with('client')->where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
            
            if (!$user->isMobileUser()) {
                return response()->json(['message' => 'This account is for web access only. Please use the admin panel to login.'], 403);
            }
            
            // Create API token for mobile authentication
            $token = $user->createToken('mobile-app-token')->plainTextToken;
            
            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'names' => $user->names,
                    'email' => $user->email,
                    'role' => $user->role,
                    'balance' => $user->client->balance,
                    'address' => $user->client->address,
                    'city' => $user->client->city,
                    'phone' => $user->client->phone,
                ],
                'token' => $token,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}
