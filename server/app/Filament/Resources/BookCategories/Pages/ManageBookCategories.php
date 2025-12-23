<?php

namespace App\Filament\Resources\BookCategories\Pages;

use App\Filament\Resources\BookCategories\BookCategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;
use Filament\Notifications\Notification;

class ManageBookCategories extends ManageRecords
{
    protected static string $resource = BookCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false)
                ->successNotification(
                    Notification::make()
                        ->title('Book category created successfully')
                        ->body('The book category has been created successfully.')
                        ->success()
                )
        ];
    }
    
}
