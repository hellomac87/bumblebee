import { useForm } from 'react-hook-form';
import { useAuth } from '../../src/context/authContext';

type LogInInput = {
    username: string;
    password: string;
};

function LogInPage() {
    const { register, handleSubmit } = useForm<LogInInput>();
    const { user, logIn, logOut } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await logIn(data.username, data.password);
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type={'text'} {...register('username')} placeholder={'username'} />
                </div>
                <div>
                    <input type={'password'} {...register('password')} placeholder={'password'} />
                </div>
                <button type={'submit'}>LogIn</button>
            </form>

            <button onClick={() => logOut()}>logout</button>
        </div>
    );
}

export default LogInPage;
