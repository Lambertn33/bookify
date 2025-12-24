<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadBookPdf implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $localPdfPath,
        public ?string $s3Filename = null
        
    ) {
    }

    /**
     * Execute the job.
     * 
     * @return string|null The full S3 path (including 'books/' directory) saved in S3, or null if upload failed
     */
    public function handle(): ?string
    {
        try {
            $fullLocalPath = public_path('books/' . $this->localPdfPath);
            
            if (!file_exists($fullLocalPath)) {
                Log::error('Local PDF not found: ' . $fullLocalPath);
                return null;
            }

            $filename = $this->s3Filename ?? $this->generateUniqueFilename($this->localPdfPath);
            
            $fileContent = file_get_contents($fullLocalPath);
            
            $s3Path = 'books/' . $filename;
            Storage::disk('s3')->put($s3Path, $fileContent, 'private');
            
            Log::info('PDF uploaded to S3: ' . $s3Path);
            
            // Return the full S3 path (including 'books/' directory) so it can be stored directly in the database
            return $s3Path;
        } catch (\Exception $e) {
            Log::error('Failed to upload PDF to S3: ' . $e->getMessage(), [
                'local_path' => $this->localPdfPath,
                'exception' => $e
            ]);
            return null;
        }
    }

    /**
     * Generate a unique filename for S3 using random string
     */
    private function generateUniqueFilename(string $originalFilename): string
    {
        $extension = pathinfo($originalFilename, PATHINFO_EXTENSION);
        // This creates filenames like: 01KD85CMY8YKONZ3M5H19YTZ9B.pdf
        $randomString = Str::upper(Str::random(25));
        
        return $randomString . '.' . $extension;
    }
}

