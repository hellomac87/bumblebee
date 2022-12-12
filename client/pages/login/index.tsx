import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../src/context/authContext';

type LogInInput = {
    username: string;
    password: string;
};

function LogInPage() {
    const { replace } = useRouter();
    const { register, handleSubmit } = useForm<LogInInput>();
    const { logIn } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await logIn(data.username, data.password);
            replace('/posts');
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center px-6'>
            <h1 className='text-2xl mb-10'>{'Login'}</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col items-center'>
                <div className='w-full mb-2'>
                    <input type={'text'} {...register('username')} placeholder={'username'} />
                </div>
                <div className='w-full'>
                    <input type={'password'} {...register('password')} placeholder={'password'} />
                </div>
                <div className='w-full mt-4'>
                    <button type={'submit'}>LogIn</button>
                </div>
            </form>

            {/* <button onClick={() => logOut()} type='button'>
                logout
            </button> */}
        </div>
    );
}

export default LogInPage;
