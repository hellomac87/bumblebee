import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineCreate } from 'react-icons/md';
import { useAuth } from 'src/context/authContext';

import styles from './Header.module.css';

function Header() {
    const { push } = useRouter();
    const { user } = useAuth();

    return (
        <header className={styles.container}>
            <div className={styles.userBlock}>
                <div className={styles.avatar}>
                    <img src={'https://www.gravatar.com/avatar/b67dbffa04ea073ccb4c6884dbaa9dae?d=retro'} />
                </div>
                <div className={styles.signBlockWrap}>
                    <div className={styles.signBlock}>
                        <div className={styles.signedInAs}>{'Signed in as'}</div>
                        <div className={styles.signOut}>{'Sign out'}</div>
                    </div>

                    <div className={styles.userName}>{user?.username}</div>
                </div>
            </div>

            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <Link href={'/posts/new'}>
                        <a>
                            <MdOutlineCreate /> {'New Post'}
                        </a>
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
