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
type SignUpResponse = Pick<User, 'username'> & {
    token: string;
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
        return await this.http.fetch(`${this.servicePath}`, {
            method: 'POST',
            body,
        });
    }

    async login(body: LoginRequest): Promise<LoginResponse> {
        return await this.http.fetch(`${this.servicePath}`, {
            method: 'POST',
            body,
        });
    }

    async me(): Promise<MeResponse> {
        return await this.http.fetch(`${this.servicePath}`, {
            method: 'GET',
        });
    }
}
