import React from 'react';
import { Post } from '../../../../types/posts';

import styles from './PostItem.module.css';

type Props = {
    post: Post;
    onClickEdit: () => void;
    onClickDelete: () => void;
};

function PostItem({ post, onClickEdit, onClickDelete }: Props) {
    return (
        <li className={styles.container}>
            <img src={post?.url} />
            <div className={styles.text}>{post.text}</div>

            <div className={styles.actions}>
                <button className={styles.edit} onClick={onClickEdit}>
                    edit
                </button>
                <button className={styles.delete} onClick={onClickDelete}>
                    delete
                </button>
            </div>
        </li>
    );
}

export default PostItem;
