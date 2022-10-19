import { Post } from '../../types/posts';

export default class PostService {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getPosts(username?: string): Promise<Post[]> {
        const query = username ? `?username=${username}` : '';
        const response = await fetch(`${this.baseUrl}/posts${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }

    async postPost(text: string): Promise<Post> {
        const response = await fetch(`${this.baseUrl}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, username: 'dobby', name: 'Dobby' }),
        });

        const data = await response.json();

        if (response.status !== 201) {
            throw new Error(data.message);
        }
        return data;
    }

    async updatePost(postId: string, text: string): Promise<Post> {
        const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (response.status !== 201) {
            throw new Error(data.message);
        }
        return data;
    }

    async deletePost(postId: string) {
        const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status !== 204) {
            throw new Error('error');
        }
    }

    async getPostById(postId: string): Promise<Post> {
        const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }
}
