import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CloseIcon, LoaderIcon, WarningIcon } from './icons';

interface QrScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onClose: () => void;
}

const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };
let html5QrCode: Html5Qrcode | null = null;

export function QrScanner({ onScanSuccess, onClose }: QrScannerProps): React.ReactNode {
    const videoRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!videoRef.current) return;

        html5QrCode = new Html5Qrcode(videoRef.current.id);

        const startScanner = async () => {
            try {
                const cameras = await Html5Qrcode.getCameras();
                if (cameras && cameras.length) {
                    await html5QrCode.start(
                        { facingMode: "environment" },
                        qrConfig,
                        (decodedText) => {
                            onScanSuccess(decodedText);
                        },
                        (errorMessage) => {
                            // handle scan failure, usually better to ignore
                        }
                    );
                    setError('');
                } else {
                     setError("No camera found on this device.");
                }
            } catch (err) {
                 setError(err instanceof Error ? err.message : "Failed to start QR scanner.");
            } finally {
                setIsLoading(false);
            }
        };

        startScanner();

        return () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().catch(err => console.error("Failed to stop QR scanner:", err));
            }
        };
    }, [onScanSuccess]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative bg-gray-900 border border-blue-500/30 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close QR scanner"
                >
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold text-center mb-4 text-gray-100">Scan QR Code</h2>
                
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-950">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <LoaderIcon className="w-12 h-12" />
                            <p className="mt-2 text-gray-400">Initializing camera...</p>
                        </div>
                    )}
                     {error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                           <WarningIcon className="w-10 h-10 text-red-400 mb-2"/>
                           <p className="text-red-400 font-semibold">Camera Error</p>
                           <p className="text-gray-400 text-sm">{error}</p>
                        </div>
                    )}
                    <div id="qr-reader" ref={videoRef} style={{ width: "100%", height: "100%" }} />
                </div>
                <p className="text-center text-sm text-gray-400 mt-4">
                    Position the QR code within the frame.
                </p>
            </div>
        </div>
    );
}