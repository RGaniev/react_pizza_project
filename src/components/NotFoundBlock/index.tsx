import React from "react";

import styles from "./NotFoundBlock.module.scss";
import { Link } from "react-router-dom";

const NotFoundBlock: React.FC = () => {
  return (
    <>
      <h1 className={styles.root}>Такой страницы нет</h1>
      <Link
        to="/"
        className="button button--outline button--add go-back-btn"
        style={{ display: "block", width: 250, margin: "0 auto" }}
      >
        <span>Вернуться на главную</span>
      </Link>
    </>
  );
};

export default NotFoundBlock;
