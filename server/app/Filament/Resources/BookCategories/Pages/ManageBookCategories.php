<?php

namespace App\Filament\Resources\BookCategories\Pages;

use App\Filament\Resources\BookCategories\BookCategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageBookCategories extends ManageRecords
{
    protected static string $resource = BookCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false) // Hide "Create & create another" button
        ];
    }
    
}
