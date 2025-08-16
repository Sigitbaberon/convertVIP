import React, { useState } from 'react';
import { CloseIcon, LoaderIcon } from './icons';

interface ImportUrlModalProps {
    onImport: (content: string) => void;
    onClose: () => void;
}

export function ImportUrlModal({ onImport, onClose }: ImportUrlModalProps): React.ReactNode {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        if (!url.trim()) {
            setError('URL cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            
            try {
                // Subscription content is often a base64 encoded list of URIs
                const decoded = atob(text);
                onImport(decoded);
            } catch (e) {
                // If not base64, assume it's plain text (e.g., a list of URIs)
                onImport(text);
            }
            onClose();
        } catch (e) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to import from URL. ${message}. This could be a CORS issue.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-modal="true" role="dialog">
            <div className="relative bg-gray-900 border border-blue-500/30 rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-100">Import from URL</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Paste a subscription link to fetch and convert configurations.
                </p>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://example.com/subscription/link"
                        className="flex-grow bg-gray-950/70 border border-blue-500/30 rounded-md p-2 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        disabled={isLoading}
                    />
                    <button onClick={handleFetch} disabled={isLoading || !url} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-semibold rounded-md transition duration-200">
                        {isLoading ? <LoaderIcon className="w-5 h-5" /> : 'Fetch'}
                    </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                 <p className="text-xs text-gray-500 mt-4">
                    <strong>Note:</strong> Direct fetching from a browser may be blocked by the server's CORS policy. The target server must explicitly allow requests from this domain.
                </p>
            </div>
        </div>
    );
}