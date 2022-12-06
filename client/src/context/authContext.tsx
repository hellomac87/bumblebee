import { createContext, createRef, PropsWithChildren, useContext, useEffect, useState } from 'react';
import AuthService from '../service/auth';

interface SignUpBody {
    username: string;
    password: string;
    name: string;
    email: string;
    url?: string;
}

interface AuthContextInterface {
    user: AuthState | null;
    signUp(body: SignUpBody): Promise<void>;
    logIn(username: string, password: string): Promise<void>;
    logOut(): Promise<void>;
}

interface AuthProviderProps {
    authService: AuthService;
    authErrorEventBus: AuthErrorEventBus;
}

interface AuthState {
    username: string;
}

const AuthContext = createContext({} as AuthContextInterface);
const contextRef = createRef();

export function AuthProvider(props: PropsWithChildren<AuthProviderProps>) {
    const [user, setUser] = useState<AuthState | null>(null);
    const { authService } = props;

    useEffect(() => {
        props.authErrorEventBus.listen((err: any) => {
            console.log(err);
            setUser(null);
        });
    }, [props.authErrorEventBus]);

    useEffect(() => {
        if (user) {
            authService
                .me()
                .then((data) => {
                    setUser(data);
                })
                .catch(console.error);
        }
    }, [authService]);

    const signUp = async (body: SignUpBody) => {
        const data = await authService.signup(body);
        setUser(data);
    };

    const logIn = async (username: string, password: string) => {
        const data = await authService.login({ username, password });
        setUser(data);
    };

    const logOut = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }} {...props}>
            {props.children}
        </AuthContext.Provider>
    );
}
export class AuthErrorEventBus {
    private callback: any;

    listen(callback: any) {
        this.callback = callback;
    }

    notify(error: any) {
        this.callback(error);
    }
}
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
