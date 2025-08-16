import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Footer } from './components/Footer';
import { QrScanner } from './components/QrScanner';
import { InspectorPanel } from './components/InspectorPanel';
import { ImportUrlModal } from './components/ImportUrlModal';
import { processInput } from './services/converter';
import { sendToWorker } from './services/workerService';
import type { ConversionResult, ConversionSuccess } from './types';

const SAMPLE_DATA = `vmess://ewogICJ2IjogIjIiLAogICJwcyI6ICJleGFtcGxlLXZtZXNzIiwKICAiYWRkIjogIjE5Mi4xNjguMS4xIiwKICAicG9ydCI6ICI0NDMiLAogICJpZCI6ICIxMzgwNmFkYi0yMzY4LTRhY2YtYjgwNS00NWI5ZWMyNTI1ZDMiLAogICJhaWQiOiAiMCIsCiAgInNjeSI6ICJhdXRvIiwKICAibmV0IjogIndzIiwKICAidHlwZSI6ICJub25lIiwKICAiaG9zdCI6ICJleGFtcGxlLmNvbSIsCiAgInBhdGgiOiAiL3JheSIsCiAgInRscyI6ICJ0bHMiLAogICJzbmkiOiAiZXhhbXBsZS5jb20iCn0=
vless://13806adb-2368-4acf-b805-45b9ec2525d3@192.168.1.2:443?type=ws&security=tls&path=%2Fray&host=sub.example.com&sni=sub.example.com#example-vless
trojan://password@192.168.1.3:443?sni=another.example.com#example-trojan
vmess://ewogICJwcyI6ICJpbnZhbGlkLWNvbmZpZyIKfQ==`;

const APP_STORAGE_KEY = 'raxnet-tools-session-v1';

function App(): React.ReactNode {
  const [initialState] = useState(() => {
    try {
      const savedSession = localStorage.getItem(APP_STORAGE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (typeof parsed.inputText === 'string' && typeof parsed.outputText === 'string' && Array.isArray(parsed.results)) {
            return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load session state from localStorage", e);
    }
    return { inputText: '', outputText: '', results: [] };
  });

  const [inputText, setInputText] = useState<string>(initialState.inputText);
  const [outputText, setOutputText] = useState<string>(initialState.outputText);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ConversionResult[]>(initialState.results);
  const [selectedConfig, setSelectedConfig] = useState<ConversionSuccess | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const sessionState = { inputText, outputText, results };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(sessionState));
    } catch (e) {
       console.error("Failed to save session state to localStorage", e);
    }
  }, [inputText, outputText, results]);

  const handleConvert = useCallback(() => {
    if (!inputText.trim()) {
      setError('Input cannot be empty.');
      setOutputText('');
      setResults([]);
      setSelectedConfig(null);
      return;
    }
    setIsLoading(true);
    setError('');
    setOutputText('');
    setResults([]);
    setSelectedConfig(null);

    setTimeout(() => {
      try {
        const { yamlOutput, results: conversionResults } = processInput(inputText);
        const successfulConversions = conversionResults.filter(r => r.success).length;
        
        if (successfulConversions === 0 && conversionResults.length > 0) {
            setOutputText('');
            setError('No valid configurations found. Check the log for details.');
        } else if (conversionResults.length === 0) {
             setOutputText('');
             setError('Input cannot be empty.');
        } else {
            setOutputText(yamlOutput);
            setError('');
            // Fire-and-forget call to the Cloudflare Worker
            sendToWorker(yamlOutput);
        }
        setResults(conversionResults);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred during conversion.');
        setOutputText('');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setError('');
    setResults([]);
    setSelectedConfig(null);
  }, []);
  
  const handleLoadSample = useCallback(() => {
    setInputText(SAMPLE_DATA);
    setSelectedConfig(null);
  }, []);

  const handleScanSuccess = useCallback((decodedText: string) => {
      setInputText(prev => prev ? `${prev}\n${decodedText}` : decodedText);
      setIsScannerOpen(false);
  }, []);

  const handleImportFromUrl = useCallback((content: string) => {
    setInputText(prev => prev ? `${prev}\n${content}` : content);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-300 opacity-0 animate-fade-in">
      <Header />
      <main className="flex-grow w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
        <div className={`grid grid-cols-1 ${selectedConfig ? 'xl:grid-cols-3' : 'lg:grid-cols-2'} gap-6 items-start transition-all duration-500`}>
          <div className="xl:col-span-1">
            <InputPanel
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onConvert={handleConvert}
                onClear={handleClear}
                onLoadSample={handleLoadSample}
                onScan={() => setIsScannerOpen(true)}
                onImportUrl={() => setIsImportModalOpen(true)}
                isLoading={isLoading}
            />
          </div>
          <div className={`${selectedConfig ? 'xl:col-span-1' : 'lg:col-span-1'}`}>
              <OutputPanel
                yamlOutput={outputText}
                error={error}
                results={results}
                isLoading={isLoading}
                onSelectConfig={setSelectedConfig}
                selectedConfig={selectedConfig}
              />
          </div>
          {selectedConfig && (
            <div className="xl:col-span-1 animate-fade-in">
                <InspectorPanel
                    selectedConfig={selectedConfig}
                    onClear={() => setSelectedConfig(null)}
                />
            </div>
          )}
        </div>
      </main>
      <Footer />
      {isScannerOpen && (
          <QrScanner 
              onScanSuccess={handleScanSuccess}
              onClose={() => setIsScannerOpen(false)}
          />
      )}
      {isImportModalOpen && (
        <ImportUrlModal
          onImport={handleImportFromUrl}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;