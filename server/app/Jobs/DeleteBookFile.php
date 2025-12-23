<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DeleteBookFile implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public string $path)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Storage::disk('s3')->delete($this->path);
        Log::info('File deleted from S3: ' . $this->path);
    }
}
