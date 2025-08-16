
export interface BaseProxyConfig {
    name: string;
    type: 'vmess' | 'vless' | 'trojan';
    server: string;
    port: number;
    udp?: boolean;
    tls?: boolean;
    'skip-cert-verify'?: boolean;
    servername?: string;
}

export interface VmessProxyConfig extends BaseProxyConfig {
    type: 'vmess';
    uuid: string;
    alterId: number;
    cipher: string;
    network?: string;
    'ws-opts'?: {
        path?: string;
        headers?: { Host?: string };
    };
}

export interface VlessProxyConfig extends BaseProxyConfig {
    type: 'vless';
    uuid: string;
    network?: string;
    flow?: string;
    'ws-opts'?: {
        path?: string;
        headers?: { Host?: string };
    };
    grpc_opts?: {
        'grpc-service-name': string;
    }
}

export interface TrojanProxyConfig extends BaseProxyConfig {
    type: 'trojan';
    password: string;
    network?: string;
    'ws-opts'?: {
        path?: string;
        headers?: { Host?: string };
    };
}

export type ProxyConfig = VmessProxyConfig | VlessProxyConfig | TrojanProxyConfig;

export interface ConversionSuccess {
    success: true;
    config: ProxyConfig;
    original: string;
}

export interface ConversionError {
    success: false;
    error: string;
    original: string;
}

export type ConversionResult = ConversionSuccess | ConversionError;
