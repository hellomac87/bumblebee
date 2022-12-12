import { createContext, PropsWithChildren, useContext } from 'react';
import { Post } from '../../types/posts';
import PostService from '../service/post';

interface PostContextInterface {
    addPost(text: string): Promise<void>;
    removePost(postId: string): Promise<void>;
    getPosts: () => Promise<Post[]>;
    getPostById: (postId: string) => Promise<Post>;
    updatePost: (postId: string, text: string) => Promise<Post>;
}

interface AuthProviderProps {
    postService: PostService;
}

const PostContext = createContext({} as PostContextInterface);

export function PostProvider(props: PropsWithChildren<AuthProviderProps>) {
    const { postService } = props;

    const addPost = async (text: string) => {
        await postService.createPost(text);
    };

    const removePost = async (postId: string) => {
        await postService.deletePost(postId);
    };

    const getPosts = async () => {
        return await postService.getPosts();
    };

    const getPostById = async (postId: string) => {
        return await postService.getPostById(postId);
    };

    const updatePost = async (postId: string, text: string) => {
        return await postService.updatePost(postId, text);
    };

    return (
        <PostContext.Provider
            value={{
                addPost,
                removePost,
                getPosts,
                getPostById,
                updatePost,
            }}
            {...props}
        >
            {props.children}
        </PostContext.Provider>
    );
}

export const usePost = () => useContext(PostContext);
