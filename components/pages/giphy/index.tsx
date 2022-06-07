import { Gif, Carousel, Video } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { useAsync } from 'react-use';

import { useEffect, useState } from 'react';

const giphyFetch = new GiphyFetch('tcALTHWAwGf6akkBiy5c3j2EFB80LW3F');
const searchTerm = 'dogs';

function GifDemo() {
    const [gif, setGif] = useState<IGif | null>(null);
    useAsync(async () => {
        const { data } = await giphyFetch.gif('fpXxIjftmkk9y');
        setGif(data);
    }, []);
    return gif && <Gif gif={gif} width={200} />;
}

function VideoDemo() {
    const [gif, setGif] = useState<IGif | null>(null);
    useAsync(async () => {
        // we know this is a video clip
        const { data } = await giphyFetch.gif('D068R9Ziv1iCjezKzG');
        setGif(data);
    }, []);
    return gif && <Video gif={gif} width={200} muted />;
}

function CarouselDemo() {
    const fetchGifs = (offset: number) => giphyFetch.search(searchTerm, { offset, limit: 10 });
    return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
}

function Giphy() {
    return (
        <div className='h-screen bg-black'>
            <div className='mb-4'>
                <GifDemo />
            </div>

            <div>
                <VideoDemo />
            </div>

            <div>
                <CarouselDemo />
            </div>
        </div>
    );
}

export default Giphy;
