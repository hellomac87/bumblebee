import HttpClient from './../network/http';
import PostService from '../service/post';

export function usePost(httpService: HttpClient) {
    const postService = new PostService(httpService);

    const addPost = async (text: string) => {
        await postService.createPost(text);
        // error handling
    };

    return { addPost };
}

export default usePost;
