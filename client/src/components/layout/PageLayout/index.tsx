import { PropsWithChildren } from 'react';
import styles from './PageLayout.module.css';

type Props = {};

function PageLayout({ children }: PropsWithChildren<Props>) {
    return <div className={styles.container}>{children}</div>;
}

export default PageLayout;
