import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '../constants/routes';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='A space to create anything I want to make' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>A space to create anything I want to make</h1>

                <ul className={styles.list}>
                    <li>
                        <Link href={routes.giphy}>
                            <a className={styles.giphy}>giphy</a>
                        </Link>
                    </li>
                </ul>
            </main>
        </div>
    );
};

export default Home;
