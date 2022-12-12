import '../styles/globals.css';
import type { AppProps } from 'next/app';
import HttpClient from '../src/network/http';
import { baseUrl } from '../src/constant/service';
import AuthService from '../src/service/auth';
import PostService from '../src/service/post';
import { AuthErrorEventBus, AuthProvider } from '../src/context/authContext';
import { PostProvider } from '../src/context/PostContext';

const authErrorEventBus = new AuthErrorEventBus();
const httpService = new HttpClient(baseUrl, authErrorEventBus);
const authService = new AuthService(httpService);
const postService = new PostService(httpService);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
            <PostProvider postService={postService}>
                <Component {...pageProps} httpService={httpService} />
            </PostProvider>
        </AuthProvider>
    );
}

export default MyApp;
