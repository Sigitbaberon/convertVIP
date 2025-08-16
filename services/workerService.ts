// The absolute endpoint for the Cloudflare Worker.
const WORKER_ENDPOINT = 'https://convertapi.raxnetglobal.workers.dev/';

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
    // Use 'no-cors' mode to prevent the browser from blocking the request due to CORS policy.
    // This is a "fire-and-forget" call, so we don't need to inspect the response,
    // which would be opaque anyway.
    await fetch(WORKER_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    // With 'no-cors', we can't check the response status. We just assume it was sent if no network error occurred.
    console.log('Conversion data sent to worker.');
    
  } catch (error) {
    // This will catch network errors (e.g., the user is offline).
    console.error('Failed to send data to worker:', error);
  }
}
