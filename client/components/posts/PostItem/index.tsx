import React from "react";
import { Post } from "../../../types/posts";

import styles from "./PostItem.module.css";

type Props = {
  post: Post;
};

function PostItem({ post }: Props) {
  return (
    <li className={styles.container}>
      <div>{post.title}</div>
      <img src={post.imageUrl} />
      <div>{post.body}</div>
    </li>
  );
}

export default PostItem;
