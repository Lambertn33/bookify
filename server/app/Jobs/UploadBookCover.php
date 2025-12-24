<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadBookCover implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $localImagePath,
        public ?string $s3Filename = null
        
    ) {
    }

    /**
     * Execute the job.
     * 
     * @return string|null The filename saved in S3, or null if upload failed
     */
    public function handle(): ?string
    {
        try {
            $fullLocalPath = public_path('covers/' . $this->localImagePath);
            
            if (!file_exists($fullLocalPath)) {
                Log::error('Local image not found: ' . $fullLocalPath);
                return null;
            }

            $filename = $this->s3Filename ?? $this->generateUniqueFilename($this->localImagePath);
            
            $fileContent = file_get_contents($fullLocalPath);
            
            $s3Path = 'covers/' . $filename;
            Storage::disk('s3')->put($s3Path, $fileContent, 'private');
            
            Log::info('Image uploaded to S3: ' . $s3Path);
            
            return $s3Path;
        } catch (\Exception $e) {
            Log::error('Failed to upload image to S3: ' . $e->getMessage(), [
                'local_path' => $this->localImagePath,
                'exception' => $e
            ]);
            return null;
        }
    }

    /**
     * Generate a unique filename for S3 using random string (matching Filament's FileUpload naming convention)
     */
    private function generateUniqueFilename(string $originalFilename): string
    {
        $extension = pathinfo($originalFilename, PATHINFO_EXTENSION);
        
        // Generate a random string
        // This creates filenames like: 01KD85CKD9KD14NH5CMYN5VAAD.jpg
        $randomString = Str::upper(Str::random(25));
        
        return $randomString . '.' . $extension;
    }
}

