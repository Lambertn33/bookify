<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{

    const ROLES = [
        'ADMIN',
        'CLIENT',
    ];

    const AUTH_TYPES = [
        'WEB',
        'MOBILE',
    ];

    const ADMIN = self::ROLES[0];
    const CLIENT = self::ROLES[1];
    const WEB_AUTH = self::AUTH_TYPES[0];
    const MOBILE_AUTH = self::AUTH_TYPES[1];
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'names',
        'email',
        'password',
        'role',
        'auth-type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's name attribute.
     * Filament expects a 'name' attribute, but we use 'names' in our database.
     * This accessor allows Filament to access the name via $user->name
     *
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->attributes['names'] ?? '';
    }

    /**
     * Set the name attribute (maps to 'names' in database).
     * This mutator allows setting name via $user->name = 'value'
     *
     * @param string $value
     * @return void
     */
    public function setNameAttribute(string $value): void
    {
        $this->attributes['names'] = $value;
    }

    /**
     * Get the auth type attribute.
     * The database column is 'auth-type' (with hyphen), but we access it as 'auth_type'
     *
     * @return string|null
     */
    public function getAuthTypeAttribute(): ?string
    {
        return $this->attributes['auth-type'] ?? null;
    }

    /**
     * Set the auth type attribute.
     *
     * @param string $value
     * @return void
     */
    public function setAuthTypeAttribute(string $value): void
    {
        $this->attributes['auth-type'] = $value;
    }

    /**
     * Check if user is a web user (can access Filament admin panel)
     *
     * @return bool
     */
    public function isWebUser(): bool
    {
        return $this->getAuthTypeAttribute() === self::WEB_AUTH;
    }

    /**
     * Check if user is a mobile user
     *
     * @return bool
     */
    public function isMobileUser(): bool
    {
        return $this->getAuthTypeAttribute() === self::MOBILE_AUTH;
    }

    /**
     * Determine if the user can access the Filament admin panel.
     * Only WEB users can access the admin panel.
     *
     * @param Panel $panel
     * @return bool
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // Only allow WEB users to access the admin panel
        return $this->isWebUser();
    }

    /**
     * Get the client associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function client(): HasOne
    {
        return $this->hasOne(Client::class, 'user_id', 'id');
    }
}
