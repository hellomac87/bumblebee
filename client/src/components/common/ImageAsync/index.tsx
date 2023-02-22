import useImageLoaded from 'src/hooks/useImageLoaded';

interface ImageAsyncProps {
    src: string;
    fallback?: React.ReactNode;
}

function ImageAsync({ src, fallback }: ImageAsyncProps) {
    const { loaded } = useImageLoaded({ src });

    return loaded ? <img src={src} /> : fallback ?? null;
}

export default ImageAsync;
