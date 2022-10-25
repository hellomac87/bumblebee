import React from "react";
import styles from "./PostList.module.css";
type Props = {
  children: React.ReactNode;
};

function PostList({ children }: Props) {
  return <ul className={styles.container}>{children}</ul>;
}

export default PostList;
