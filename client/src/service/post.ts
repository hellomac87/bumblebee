import { HttpImpl } from './../network/http';
import { Post } from '../../types/posts';

export default class PostService {
    private http: HttpImpl;
    constructor(http: HttpImpl) {
        this.http = http;
    }

    async getPosts(username?: string): Promise<Post[]> {
        const query = username ? `?username=${username}` : '';
        return await this.http.fetch(`/posts${query}`, {
            method: 'GET',
        });
    }

    async postPost(text: string): Promise<Post> {
        return await this.http.fetch(`/posts`, {
            method: 'POST',
            body: JSON.stringify({ text, username: 'dobby', name: 'Dobby' }),
        });
    }

    async updatePost(postId: string, text: string): Promise<Post> {
        return await this.http.fetch(`/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ text }),
        });
    }

    async deletePost(postId: string) {
        return await this.http.fetch(`/posts/${postId}`, {
            method: 'DELETE',
        });
    }

    async getPostById(postId: string): Promise<Post> {
        return await this.http.fetch(`/posts/${postId}`, {
            method: 'GET',
        });
    }
}
