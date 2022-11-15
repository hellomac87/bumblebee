import { useForm } from 'react-hook-form';
import styles from './SignUp.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/context/authContext';

type FormInputs = {
    username: string;
    name: string;
    email: string;
    password: string;
    ['password-confirm']?: string;
    url?: string;
};

function SignUpPage() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormInputs>();
    const { signUp } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        delete data['password-confirm'];
        await signUp(data);
        router.replace('/posts');
    });
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>signup</h1>
            <form onSubmit={onSubmit} autoComplete={'false'}>
                <div className={styles.inputWrap}>
                    <input {...register('username')} placeholder={'username'} type={'text'} autoComplete={'off'} />
                </div>
                <div className={styles.inputWrap}>
                    <input {...register('name')} placeholder={'name'} type={'text'} />
                </div>
                <div className={styles.inputWrap}>
                    <input {...register('email')} placeholder={'email@example.com'} type={'email'} />
                </div>
                <div className={styles.inputWrap}>
                    <input {...register('password')} placeholder={'password'} type={'password'} autoComplete={'off'} />
                </div>
                <div className={styles.inputWrap}>
                    <input
                        {...register('password-confirm')}
                        placeholder={'password-confirm'}
                        type={'password'}
                        autoComplete={'off'}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <input {...register('url')} placeholder={'url'} />
                </div>

                <button className={styles.submit} type={'submit'}>
                    submit
                </button>
            </form>
        </div>
    );
}

export default SignUpPage;
