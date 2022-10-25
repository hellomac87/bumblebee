import { GetServerSideProps } from 'next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { baseUrl } from '../../../src/constant/service';
import HttpClient from '../../../src/network/http';
import PostService from '../../../src/service/post';
import { Post } from '../../../types/posts';

type Props = {
    postId: string;
};

function EditPostPage({ postId }: Props) {
    const httpClient = new HttpClient(baseUrl);
    const postService = new PostService(httpClient);

    const [post, setPost] = useState<Post | null>(null);

    const fetchPostById = async (postId: string) => {
        if (!postId) return;
        const data = await postService.getPostById(postId);

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
        console.log(post);
        const data = await postService.updatePost(postId, post.text);

        setPost(data);
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
