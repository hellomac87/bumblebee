import HttpClient from './../network/http';
import PostService from '../service/post';

export function usePost(httpService: HttpClient) {
    const postService = new PostService(httpService);

    const addPost = async (text: string) => {
        await postService.createPost(text);
        // error handling
    };

    const removePost = async (postId: string) => {
        await postService.deletePost(postId);
    };

    const getPosts = async () => {
        return await postService.getPosts();
    };

    return { addPost, getPosts, removePost };
}

export default usePost;
