import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import HttpClient from '../src/network/http';
import { baseUrl } from '../src/constant/service';
import AuthService from '../src/service/auth';
import { AuthErrorEventBus, AuthProvider } from '../src/context/authContext';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const authErrorEventBus = new AuthErrorEventBus();
const httpService = new HttpClient(baseUrl, authErrorEventBus);
const authService = new AuthService(httpService);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
            <Component {...pageProps} httpService={httpService} />
        </AuthProvider>
    );
}

export default MyApp;
