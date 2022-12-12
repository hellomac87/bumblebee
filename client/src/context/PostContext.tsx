import { createContext, PropsWithChildren, useContext } from 'react';
import PostService from '../service/post';

interface PostContextInterface {}

interface AuthProviderProps {
    postService: PostService;
}

const PostContext = createContext({} as PostContextInterface);

export function PostProvider(props: PropsWithChildren<AuthProviderProps>) {
    const { postService } = props;

    return (
        <PostContext.Provider value={{}} {...props}>
            {props.children}
        </PostContext.Provider>
    );
}

export const usePost = () => useContext(PostContext);
