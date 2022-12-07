import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../src/context/authContext';

import usePost from '../../../src/hook/usePost';
import HttpClient from '../../../src/network/http';

type Props = {
    httpService: HttpClient;
};

function NewPostPage({ httpService }: Props) {
    const router = useRouter();
    const { addPost } = usePost(httpService);
    const { user } = useAuth();

    const [text, setText] = useState<string>('');

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;

        setText(value);
    };

    const handleSubmit = async () => {
        if (!text) return;

        await addPost(text);

        router.replace('/posts');
    };

    if (!user) return null;

    return (
        <div>
            <textarea value={text} onChange={handleChangeText} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    );
}

export default NewPostPage;
