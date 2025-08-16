import React from 'react';
import { ConvertIcon, ClearIcon, LoaderIcon, DocumentTextIcon, QRIcon, GlobeIcon } from './icons';

interface InputPanelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onConvert: () => void;
  onClear: () => void;
  onLoadSample: () => void;
  onScan: () => void;
  onImportUrl: () => void;
  isLoading: boolean;
}

export function InputPanel({ value, onChange, onConvert, onClear, onLoadSample, onScan, onImportUrl, isLoading }: InputPanelProps): React.ReactNode {
  return (
    <div className="flex flex-col bg-gray-900/50 rounded-xl border border-blue-500/20 p-5 backdrop-blur-lg shadow-2xl shadow-black/30 sticky top-28">
      <h2 className="text-lg font-semibold text-gray-100 mb-3">Input Configurations</h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your vmess://, vless://, or trojan:// links here, one per line. You can also scan a QR code or load a sample set."
        className="flex-grow w-full h-80 bg-gray-950/70 border border-blue-500/30 rounded-md p-3 text-gray-300 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
        spellCheck="false"
        disabled={isLoading}
      />
      <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
         <div className="flex items-center gap-3">
            <button
              onClick={onScan}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Scan QR Code"
            >
              <QRIcon />
              Scan QR
            </button>
            <button
              onClick={onImportUrl}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Import from URL"
            >
              <GlobeIcon />
              Import
            </button>
             <button
              onClick={onLoadSample}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Load sample configurations"
            >
              <DocumentTextIcon />
            </button>
            <button
              onClick={onClear}
              disabled={isLoading || !value}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-rose-600/80 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Clear all input"
            >
              <ClearIcon />
            </button>
         </div>
        <button
          onClick={onConvert}
          disabled={isLoading || !value}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-blue-800/50 disabled:to-cyan-900/50 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-md transition duration-200 shadow-lg shadow-blue-500/20"
          title="Convert input to YAML format"
        >
          {isLoading ? <LoaderIcon /> : <ConvertIcon />}
          {isLoading ? 'Converting...' : 'Convert to YAML'}
        </button>
      </div>
    </div>
  );
}