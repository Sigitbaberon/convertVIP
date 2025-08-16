import React from 'react';

interface IconProps {
    className?: string;
}

export const LogoIcon = ({ className = "w-10 h-10" }: IconProps) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(56, 189, 248)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'rgb(34, 211, 238)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M50 2 A 48 48 0 0 1 98 50 L 85 50 A 35 35 0 0 0 50 15 Z" fill="url(#logoGradient)"/>
        <path d="M50 98 A 48 48 0 0 1 2 50 L 15 50 A 35 35 0 0 0 50 85 Z" fill="url(#logoGradient)" />
        <path d="M 2 50 A 48 48 0 0 1 50 2 L 50 15 A 35 35 0 0 0 15 50 Z" fill="url(#logoGradient)" transform="rotate(180 50 50)"/>
        <path d="M 98 50 A 48 48 0 0 1 50 98 L 50 85 A 35 35 0 0 0 85 50 Z" fill="url(#logoGradient)" transform="rotate(180 50 50)"/>
    </svg>
);


export const ConvertIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183A8.25 8.25 0 006.82 6.82l-3.182 3.182" />
  </svg>
);

export const ClearIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const LoaderIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(56, 189, 248)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'rgb(34, 211, 238)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <g>
            <path d="M50 2 A 48 48 0 0 1 98 50 L 85 50 A 35 35 0 0 0 50 15 Z" fill="url(#loaderGradient)" opacity="0.8"/>
            <path d="M50 98 A 48 48 0 0 1 2 50 L 15 50 A 35 35 0 0 0 50 85 Z" fill="url(#loaderGradient)" opacity="0.8"/>
            <path d="M 2 50 A 48 48 0 0 1 50 2 L 50 15 A 35 35 0 0 0 15 50 Z" fill="url(#loaderGradient)" opacity="0.8" transform="rotate(180 50 50)"/>
            <path d="M 98 50 A 48 48 0 0 1 50 98 L 50 85 A 35 35 0 0 0 85 50 Z" fill="url(#loaderGradient)" opacity="0.8" transform="rotate(180 50 50)"/>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" />
        </g>
    </svg>
);

export const CopyIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

export const CheckIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const InfoIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

export const WarningIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const SuccessIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const DocumentTextIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const QRIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a.75.75 0 01.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01-.75-.75V5.25a.75.75 0 01.75-.75zM3.75 18a.75.75 0 01.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75zm15.75-12a.75.75 0 00-.75.75v1.5c0 .414-.336.75-.75.75h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75zm-1.5 12a.75.75 0 01.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75zm-6-1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-3zM9 12a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5v15H3.75v-15z" />
    </svg>
);

export const InspectIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const GlobeIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

export const DownloadIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);