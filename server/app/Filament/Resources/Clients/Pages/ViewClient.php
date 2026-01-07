<?php

namespace App\Filament\Resources\Clients\Pages;

use App\Filament\Resources\Clients\ClientResource;
use Filament\Resources\Pages\ViewRecord;

class ViewClient extends ViewRecord
{
    protected static string $resource = ClientResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        // Eager load relationships to avoid N+1 queries
        $this->record->load(['user', 'orders', 'books.category']);
        
        return $data;
    }

    public function getTitle(): string
    {
        return 'Client Details';
    }
}

