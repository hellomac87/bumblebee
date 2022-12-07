export interface TokenStorageImpl {
    saveToken(token: string): void;
    getToken(): string;
    clearToken(): void;
}

const TOKEN = 'token';

export default class TokenStorage implements TokenStorageImpl {
    saveToken(token: string) {
        localStorage.setItem(TOKEN, token);
    }

    getToken(): string {
        return localStorage.getItem(TOKEN) ?? '';
    }

    clearToken() {
        localStorage.removeItem(TOKEN);
    }
}
