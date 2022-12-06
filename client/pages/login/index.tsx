import { useForm } from 'react-hook-form';
import { useAuth } from '../../src/context/authContext';

type LogInInput = {
    username: string;
    password: string;
};

function LogInPage() {
    const { register, handleSubmit } = useForm<LogInInput>();
    const { user, logIn } = useAuth();
    const onSubmit = handleSubmit(async (data) => {
        try {
            await logIn(data.username, data.password);
        } catch (e) {
            console.log(e);
        }
    });

    console.log(user);
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
        </div>
    );
}

export default LogInPage;
