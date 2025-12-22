<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Component;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class Login extends BaseLogin
{
    public function getHeading(): string | \Illuminate\Contracts\Support\Htmlable | null
    {
        return 'Welcome Back';
    }

    public function getSubheading(): string | \Illuminate\Contracts\Support\Htmlable | null
    {
        return 'Sign in to your account to continue';
    }

    protected function getEmailFormComponent(): Component
    {
        return TextInput::make('email')
            ->label('Email address')
            ->email()
            ->required()
            ->autocomplete('username')
            ->autofocus()
            ->extraInputAttributes(['tabindex' => 1]);
    }

    protected function getPasswordFormComponent(): Component
    {
        return TextInput::make('password')
            ->label('Password')
            ->hint(filament()->hasPasswordReset() ? new HtmlString(Blade::render('<x-filament::link :href="filament()->getRequestPasswordResetUrl()" tabindex="3"> {{ __(\'filament-panels::auth/pages/login.actions.request_password_reset.label\') }}</x-filament::link>')) : null)
            ->password()
            ->revealable(filament()->arePasswordsRevealable())
            ->autocomplete('current-password')
            ->required()
            ->extraInputAttributes(['tabindex' => 2]);
    }

    protected function getRememberFormComponent(): Component
    {
        return Checkbox::make('remember')
            ->label('Remember me');
    }

    /**
     * Override this method to add custom logic before authentication
     * This runs before the user credentials are validated
     */
    protected function beforeAuthenticate(array $data): void
    {
        // Example: Log login attempt
        Log::info('Login attempt', ['email' => $data['email']]);
    }

    /**
     * Override this method to add custom logic after successful authentication
     * This runs after the user is authenticated but before the response is returned
     */
    protected function afterAuthenticate(Authenticatable $user, array $data): void
    {
        // Example: Update last login timestamp
        // $user->update(['last_login_at' => now()]);
        
        // Example: Log successful login
        Log::info('User logged in successfully', [
            'user_id' => $user->getAuthIdentifier(),
            'email' => $data['email'],
        ]);
        
        // Example: Send notification
        // $user->notify(new \App\Notifications\LoginNotification());
    }

    /**
     * Override this method to customize the authentication process
     * You can add custom validation, checks, or modify the flow
     */
    public function authenticate(): ?LoginResponse
    {
        // Get form data
        $data = $this->form->getState();
        
        // Run custom logic before authentication
        $this->beforeAuthenticate($data);
        
        // Check if user is a web user before attempting authentication
        $user = User::where('email', $data['email'])->first();
        if ($user && $user->isMobileUser()) {
            throw ValidationException::withMessages([
                'data.email' => 'This account is for mobile app access only. Please use the mobile app to login.',
            ]);
        }
        
        // Call parent authenticate method which handles the actual authentication
        $response = parent::authenticate();
        
        // If authentication was successful, verify the user is a web user
        if ($response) {
            $authenticatedUser = filament()->auth()->user();
            if ($authenticatedUser) {
                // Double-check: ensure authenticated user is a web user
                if ($authenticatedUser instanceof User && $authenticatedUser->isMobileUser()) {
                    // Logout the user immediately
                    filament()->auth()->logout();
                    throw ValidationException::withMessages([
                        'data.email' => 'This account is for mobile app access only. Please use the mobile app to login.',
                    ]);
                }
                
                // Run custom logic after authentication
                $this->afterAuthenticate($authenticatedUser, $data);
            }
        }
        
        return $response;
    }

    /**
     * Override this method to customize how credentials are extracted from form data
     */
    protected function getCredentialsFromFormData(array $data): array
    {
        // You can modify credentials here if needed
        // For example, normalize email to lowercase
        return [
            'email' => strtolower($data['email']),
            'password' => $data['password'],
        ];
    }

    /**
     * Override this method to customize the validation failure exception
     */
    protected function throwFailureValidationException(): never
    {
        // You can customize the error message
        throw ValidationException::withMessages([
            'data.email' => 'These credentials do not match our records.',
        ]);
    }
}

