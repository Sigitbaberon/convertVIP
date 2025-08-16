import React from 'react';
import { LogoIcon } from './icons';

export function Header(): React.ReactNode {
  return (
    <header className="text-center p-4 md:p-6 border-b border-blue-500/20 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-20">
      <div className="flex items-center justify-center gap-3">
        <LogoIcon className="w-10 h-10 md:w-12 md:h-12" />
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Raxnet Tools
        </h1>
      </div>
      <p className="text-gray-400 mt-2 text-sm md:text-base">
        Advanced VPN Configuration Converter (VMess, VLESS, Trojan, QR Code to YAML)
      </p>
    </header>
  );
}