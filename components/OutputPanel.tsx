import React, { useState, useEffect, useMemo } from 'react';
import type { ConversionResult, ConversionSuccess, ConversionError } from '../types';
import { CopyIcon, CheckIcon, InfoIcon, WarningIcon, SuccessIcon, XCircleIcon, LoaderIcon, InspectIcon, DownloadIcon, LogoIcon } from './icons';

interface OutputPanelProps {
  yamlOutput: string;
  error: string;
  results: ConversionResult[];
  isLoading: boolean;
  onSelectConfig: (config: ConversionSuccess) => void;
  selectedConfig: ConversionSuccess | null;
}

type ActiveTab = 'yaml' | 'log';

export function OutputPanel({ yamlOutput, error, results, isLoading, onSelectConfig, selectedConfig }: OutputPanelProps): React.ReactNode {
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('yaml');

  const { successes, failures } = useMemo(() => ({
    successes: results.filter(r => r.success).length,
    failures: results.filter(r => !r.success).length,
  }), [results]);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);
  
  useEffect(() => {
    if (results.length > 0 && successes === 0 && failures > 0) {
      setActiveTab('log');
    } else if (successes > 0) {
      setActiveTab('yaml');
    }
  }, [results, successes, failures]);

  const handleCopy = () => {
    if (yamlOutput) {
      navigator.clipboard.writeText(yamlOutput).then(() => {
        setCopySuccess(true);
      });
    }
  };
  
  const handleDownload = () => {
    if (!yamlOutput) return;
    const blob = new Blob([yamlOutput], { type: 'application/x-yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raxnet-config-${Date.now()}.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const TabButton: React.FC<{tabId: ActiveTab, children: React.ReactNode}> = ({ tabId, children }) => (
      <button 
          onClick={() => setActiveTab(tabId)}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${activeTab === tabId ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
      >
          {children}
      </button>
  );

  return (
    <div className="flex flex-col bg-gray-900/50 rounded-xl border border-blue-500/20 p-5 backdrop-blur-lg shadow-2xl shadow-black/30 min-h-[500px]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 bg-gray-950/50 p-1 rounded-lg">
            <TabButton tabId="yaml">YAML Output</TabButton>
            <TabButton tabId="log">Conversion Log</TabButton>
        </div>
        {yamlOutput && activeTab === 'yaml' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Download as .yaml file"
            >
              <DownloadIcon />
              Download
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md transition duration-200 text-sm"
              title="Copy to clipboard"
            >
              {copySuccess ? <CheckIcon /> : <CopyIcon />}
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
      <div className="flex-grow w-full bg-gray-950/70 border border-blue-500/30 rounded-md relative overflow-hidden">
        {isLoading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-900/80 z-10">
                <LoaderIcon className="w-12 h-12"/>
                <p className="text-gray-400 mt-3">Processing configurations...</p>
            </div>
        )}
        
        {activeTab === 'yaml' && (
          <>
            {error && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <WarningIcon className="w-12 h-12 text-red-400 mb-2"/>
                    <p className="text-red-400 font-semibold">Conversion Failed</p>
                    <p className="text-gray-400 text-sm">{error}</p>
                </div>
            )}
            {!error && !yamlOutput && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-4">
                    <div className="p-4 bg-gray-900 rounded-full border border-blue-500/30">
                        <LogoIcon className="w-16 h-16 opacity-30" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300">Ready to Convert</h3>
                    <p className="text-gray-500 max-w-sm">
                        Your generated YAML file will be displayed here, ready to be copied or downloaded.
                    </p>
                </div>
            )}
            {yamlOutput && !isLoading && (
                <pre className="h-full w-full overflow-auto p-4 m-0">
                  <code className="font-mono text-sm text-gray-300 whitespace-pre">
                    {yamlOutput}
                  </code>
                </pre>
            )}
          </>
        )}
        
        {activeTab === 'log' && (
            <>
            {results.length === 0 && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <InfoIcon className="w-12 h-12 text-blue-400 mb-2"/>
                    <p className="text-gray-400">The conversion log will appear here after processing.</p>
                </div>
            )}
            {results.length > 0 && !isLoading && (
                <ul className="h-full overflow-auto p-3 space-y-2">
                   {results.map((result, index) => {
                       const { success } = result;
                       const original = result.original.length > 40 ? `${result.original.substring(0, 37)}...` : result.original;
                       const message = success ? (result as ConversionSuccess).config.name : (result as ConversionError).error;
                       const isSelected = success && selectedConfig?.original === result.original;

                       return (
                           <li key={index} 
                               className={`flex items-start gap-3 p-2 rounded-md text-sm transition-all duration-200 animate-slide-in-stagger ${success ? 'bg-green-500/10 hover:bg-green-500/20 cursor-pointer' : 'bg-red-500/10'} ${isSelected ? '!bg-blue-500/30 ring-2 ring-blue-400' : ''}`}
                               onClick={() => success && onSelectConfig(result as ConversionSuccess)}
                               style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {success ? <SuccessIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> : <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                                <div className="flex-grow">
                                    <p className={`font-semibold ${success ? 'text-green-300' : 'text-red-300'}`}>{message}</p>
                                    <p className="text-gray-400 font-mono text-xs truncate" title={result.original}>{original}</p>
                                </div>
                                {success && <InspectIcon className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5 group-hover:text-gray-300"/>}
                           </li>
                       )
                   })}
                </ul>
            )}
            </>
        )}
      </div>
      {results.length > 0 && !isLoading && (
          <div className="mt-4 p-3 bg-gray-950/50 border border-blue-500/30 rounded-md text-sm">
            <h3 className="font-semibold mb-2 text-gray-300">Conversion Summary</h3>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-green-400">
                    <SuccessIcon className="w-5 h-5" />
                    <span>{successes} Succeeded</span>
                 </div>
                 <div className="flex items-center gap-2 text-red-400">
                    <WarningIcon className="w-5 h-5" />
                    <span>{failures} Failed</span>
                 </div>
            </div>
          </div>
      )}
    </div>
  );
}