<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Force JSON response
        $request->headers->set('Accept', 'application/json');
        
        $request->validate([
            'names' => 'required|string|max:255',
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
            
            $user = User::where('email', $request->email)->first();

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
