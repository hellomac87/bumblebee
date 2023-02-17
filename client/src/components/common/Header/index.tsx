import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from 'src/context/authContext';

import styles from './Header.module.css';

type Props = {};

function Header({}: Props) {
    const { push } = useRouter();
    const { user } = useAuth();
    const handleClickLogo = () => {};

    const routeToCreatePost = () => {
        push('/posts/new');
    };

    return (
        <header className={styles.container}>
            <div className={styles.userBlock}>
                <div className={styles.avatar}>
                    <img src={'https://www.gravatar.com/avatar/b67dbffa04ea073ccb4c6884dbaa9dae?d=retro'} />
                </div>
                <div className={styles.signBlockWrap}>
                    <div className={styles.signBlock}>
                        <div className={styles.signedInAs}>Signed in as</div>
                        <div className={styles.signOut}>Sign out</div>
                    </div>

                    <div className={styles.userName}>{user?.username}</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
