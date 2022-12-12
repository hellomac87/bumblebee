import { useRouter } from 'next/router';
import { FaPlus, FaRegLaughBeam } from 'react-icons/fa';

import styles from './Header.module.css';

type Props = {};

function Header({}: Props) {
    const { push } = useRouter();
    const handleClickLogo = () => {};
    const handleClickNewButton = () => {
        push('/posts/new');
    };
    return (
        <header className={styles.container}>
            <FaRegLaughBeam size={24} onClick={handleClickLogo} />
            <FaPlus onClick={handleClickNewButton} className='cursor-pointer' size={24} />
        </header>
    );
}

export default Header;
