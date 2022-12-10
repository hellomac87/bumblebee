import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../src/components/common/Header';
import PostItem from '../../src/components/posts/PostItem';
import PostList from '../../src/components/posts/PostList';
import { useAuth } from '../../src/context/authContext';
import usePost from '../../src/hook/usePost';
import HttpClient from '../../src/network/http';
import { Post } from '../../types/posts';

type Props = {
    httpService: HttpClient;
};

function PostsPage({ httpService }: Props) {
    const router = useRouter();
    const [posts, setPosts] = useState<null | Post[]>(null);
    const { user } = useAuth();
    const { getPosts, removePost } = usePost(httpService);

    const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
    };

    const handleClickEdit = (postId: string) => () => {
        router.push(`/posts/edit/${postId}`);
    };

    const handleClickDelete = (postId: string) => async () => {
        const isDelete = window.confirm('deletePost?');
        if (isDelete) {
            await removePost(postId);
            alert('delete post!');
            await fetchPosts();
        }
    };

    useEffect(() => {
        void fetchPosts();
    }, []);

    if (!user) null;

    return (
        <div>
            <Header />
            <PostList>
                {posts?.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onClickEdit={handleClickEdit(post.id)}
                        onClickDelete={handleClickDelete(post.id)}
                    />
                ))}
            </PostList>
        </div>
    );
}

export default PostsPage;
