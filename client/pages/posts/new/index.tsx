import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { baseUrl } from '../../../src/constant/service';
import HttpClient from '../../../src/network/http';
import PostService from '../../../src/service/post';

type Props = {
    postId: string;
};

function NewPostPage({}: Props) {
    const httpClient = new HttpClient(baseUrl);
    const postService = new PostService(httpClient);

    const router = useRouter();
    const [text, setText] = useState<string>('');

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;

        setText(value);
    };

    const handleSubmit = async () => {
        if (!text) return;

        await postService.postPost(text);

        router.replace('/posts');
    };

    return (
        <div>
            <textarea value={text} onChange={handleChangeText} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    );
}

export default NewPostPage;
