import '../styles/globals.css';
import type { AppProps } from 'next/app';
import HttpClient from '../src/network/http';
import { baseUrl } from '../src/constant/service';
import AuthService from '../src/service/auth';
import { AuthErrorEventBus, AuthProvider } from '../src/context/authContext';
import TokenStorage from '../src/service/token';
import PostService from '../src/service/post';

const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpService = new HttpClient(baseUrl, authErrorEventBus);
const authService = new AuthService(httpService, tokenStorage);
const postService = new PostService(httpService, tokenStorage);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
