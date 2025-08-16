// A relative endpoint for the Cloudflare Worker.
// This assumes the Worker is served on the same domain as the Pages site.
const WORKER_ENDPOINT = '/api/log-conversion';

/**
 * Sends the conversion result to a Cloudflare Worker.
 * This is a "fire-and-forget" function; it does not block the UI
 * and handles its own errors silently in the console.
 *
 * @param content The string content (e.g., YAML output) to send.
 */
export async function sendToWorker(content: string): Promise<void> {
  if (!content) {
    return;
  }

  try {
    const response = await fetch(WORKER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      // Log the error but don't bother the user with it.
      console.error(`Worker request failed: ${response.status} ${response.statusText}`);
      const responseBody = await response.text();
      console.error('Worker response:', responseBody);
    } else {
        // Optional: log success for debugging purposes.
        console.log('Successfully logged conversion to worker.');
    }
  } catch (error) {
    // Log network or other fetch-related errors.
    console.error('Failed to send data to worker:', error);
  }
}
