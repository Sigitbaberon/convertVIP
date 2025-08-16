import React from 'react';

export function Footer(): React.ReactNode {
  return (
    <footer className="text-center p-6 text-xs text-gray-500 border-t border-blue-500/20 mt-8">
      <p>Raxnet Tools &copy; {new Date().getFullYear()}. Built for Cloudflare Pages.</p>
      <p className="mt-1">
        Your privacy is respected. All conversions happen locally in your browser.
      </p>
    </footer>
  );
}