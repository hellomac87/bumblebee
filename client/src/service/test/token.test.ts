import TokenStorage from '../token';

describe('token storage', () => {
    let tokenStorage: TokenStorage;

    beforeEach(() => {
        tokenStorage = new TokenStorage();
    });
    test('saveToken', () => {
        tokenStorage.saveToken('token');
        expect(tokenStorage.getToken()).toBe('token');
    });

    test('clear token', () => {
        tokenStorage.saveToken('token');
        tokenStorage.clearToken();
        expect(tokenStorage.getToken()).toBe('');
    });
});
