import React from "react";

import styles from "./Header.module.css";

type Props = {};

function Header({}: Props) {
  return (
    <header className={styles.container}>
      <div>post.com</div>
      <div>menu?</div>
    </header>
  );
}

export default Header;
