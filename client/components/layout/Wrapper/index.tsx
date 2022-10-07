import styles from "./Wrapper.module.css";

type Props = {
  children: React.ReactNode;
};

function Wrapper({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default Wrapper;
