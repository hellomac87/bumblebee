import { TokenStorageImpl } from './token';
import { HttpClientImpl } from './../network/http';

interface User {
    id: string; // 사용자의 고유한 아이디
    username: string; // 사용자 닉네임 (아이디)
    password: string; // 사용자 비밀번호
    name: string; // 사용자 이름
    email: string; // 사용자 이메일
    url?: string; // (optional) // 사용자 프로파일 사진 URL
}

type SignUpRequest = Omit<User, 'id'>;
type SignUpResponse = {
    token: string;
    username: string;
};
type LoginRequest = Pick<User, 'username' | 'password'>;
type LoginResponse = Pick<User, 'username'> & {
    token: string;
};
type MeResponse = Pick<User, 'username'> & {
    token: string;
};

export default class AuthService {
    private http: HttpClientImpl;
    private servicePath: string = '/auth';

    constructor(http: HttpClientImpl) {
        this.http = http;
    }

    async signup(body: SignUpRequest): Promise<SignUpResponse> {
        const data = await this.http.fetch<SignUpResponse>(`${this.servicePath}/signup`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        return data;
    }

    async login(body: LoginRequest): Promise<LoginResponse> {
        const data = await this.http.fetch<LoginResponse>(`${this.servicePath}/login`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        return data;
    }

    async me(): Promise<MeResponse> {
        return await this.http.fetch<MeResponse>(`${this.servicePath}/me`, {
            method: 'GET',
        });
    }

    async logout() {
        console.log(document.cookie);
    }
}
