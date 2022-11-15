import {
    createContext,
    createRef,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import AuthService from '../service/auth';

interface SignUpBody {
    username: string;
    password: string;
    name: string;
    email: string;
    url?: string;
}

interface AuthContextInterface {
    user: AuthState | undefined;
    signUp(body: SignUpBody): Promise<void>;
    logIn(username: string, password: string): Promise<void>;
    logOut(): Promise<void>;
}

interface AuthProviderProps {
    authService: AuthService;
}

interface AuthState {
    username: string;
    token: string;
}

const AuthContext = createContext({} as AuthContextInterface);
const contextRef = createRef();

export function AuthProvider(props: PropsWithChildren<AuthProviderProps>) {
    const [user, setUser] = useState<AuthState | undefined>(undefined);
    const { authService } = props;

    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    useEffect(() => {
        authService.me().then((data) => {
            setUser(data);
        });
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
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }} {...props}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
