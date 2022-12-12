import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { usePost } from '../../../src/context/PostContext';
import { Post } from '../../../types/posts';

type Props = {
    postId: string;
};

function EditPostPage({ postId }: Props) {
    const { getPostById, updatePost } = usePost();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);

    const fetchPostById = async (postId: string) => {
        if (!postId) return;
        const data = await getPostById(postId);

        setPost(data);
    };

    useEffect(() => {
        void fetchPostById(postId);
    }, []);

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        if (!post) return;
        setPost({ ...post, text: value });
    };

    const handleSubmit = async () => {
        if (!post) return;

        const data = await updatePost(postId, post.text);

        setPost(data);
        router.replace('/posts');
    };

    return (
        <div>
            <img src={post?.url} />
            <textarea value={post?.text} onChange={handleChangeText} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    );
}

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { id } = query;

    return {
        props: {
            postId: id,
        },
    };
};
