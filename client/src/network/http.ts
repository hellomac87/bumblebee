import { AuthErrorEventBus } from '../context/authContext';

export interface HttpClientImpl {
    fetch<T extends any>(url: string, options: any): Promise<T>;
}

export default class HttpClient implements HttpClientImpl {
    private baseUrl: string;
    private authErrorEventBus: AuthErrorEventBus;
    constructor(baseUrl: string, authErrorEventBus: AuthErrorEventBus) {
        this.baseUrl = baseUrl;
        this.authErrorEventBus = authErrorEventBus;
    }

    async fetch<T extends any>(url: string, options: any): Promise<T> {
        const res = fetch(`${this.baseUrl}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        });

        let data: any;
        try {
            data = (await res).json();
        } catch (error) {
            console.error(error);
        }

        if ((await res).status > 299 || (await res).status < 200) {
            const message = data && data.message ? data.message : 'Something went wrong!';
            const error = new Error(message);
            if ((await res).status === 401) {
                this.authErrorEventBus.notify(error);
            }
            throw error;
        }

        return data;
    }
}
