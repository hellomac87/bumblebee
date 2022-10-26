export interface HttpClientImpl {
    fetch(url: string, options: any): Promise<any>;
}

export default class HttpClient implements HttpClientImpl {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetch(url: string, options: any): Promise<any> {
        const res = fetch(`${this.baseUrl}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        let data: any;
        try {
            data = (await res).json();
        } catch (error) {
            console.error(error);
        }

        if ((await res).status > 299 || (await res).status < 200) {
            const message = data && data.message ? data.message : 'Something went wrong!';
            throw new Error(message);
        }

        return data;
    }
}
