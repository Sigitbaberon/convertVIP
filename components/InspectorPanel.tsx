import React from 'react';
import type { ConversionSuccess } from '../types';
import { InspectIcon, CloseIcon } from './icons';

interface InspectorPanelProps {
  selectedConfig: ConversionSuccess | null;
  onClear: () => void;
}

const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
        return value ? <span className="text-green-400">true</span> : <span className="text-red-400">false</span>;
    }
    if (typeof value === 'object' && value !== null) {
        return <pre className="text-xs font-mono bg-gray-950 p-2 rounded-md mt-1">{JSON.stringify(value, null, 2)}</pre>;
    }
    return <span className="text-gray-200">{value}</span>;
}

export function InspectorPanel({ selectedConfig, onClear }: InspectorPanelProps): React.ReactNode {
  return (
    <div className="flex flex-col bg-gray-900/50 rounded-xl border border-blue-500/20 p-5 backdrop-blur-lg shadow-2xl shadow-black/30 min-h-[500px] sticky top-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <InspectIcon />
            Configuration Inspector
        </h2>
        {selectedConfig && (
            <button onClick={onClear} className="text-gray-400 hover:text-white transition-colors" title="Close inspector">
                <CloseIcon />
            </button>
        )}
      </div>
      
      {!selectedConfig && (
        <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-400 p-4 space-y-3">
            <InspectIcon className="w-16 h-16 text-blue-500/20"/>
            <h3 className="text-lg font-semibold text-gray-300">Inspector Panel</h3>
            <p className="text-sm text-gray-500 max-w-xs">
                For a deep dive into a specific configuration, click any successful item in the "Conversion Log" tab.
            </p>
        </div>
      )}

      {selectedConfig && (
        <div className="flex-grow overflow-auto pr-2 -mr-2">
           <div className="space-y-3">
               {Object.entries(selectedConfig.config).map(([key, value]) => (
                   <div key={key} className="grid grid-cols-3 gap-2 text-sm border-b border-gray-700/50 pb-2">
                       <span className="font-semibold text-blue-300 col-span-1">{key}</span>
                       <div className="font-mono col-span-2 break-all">
                           {renderValue(value)}
                       </div>
                   </div>
               ))}
           </div>
        </div>
      )}
    </div>
  );
}