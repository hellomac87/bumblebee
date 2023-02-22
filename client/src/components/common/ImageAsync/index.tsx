import { FC } from 'react';
import useImageLoaded from 'src/hooks/useImageLoaded';

interface ImageAsyncProps {
    src: string;
    renderFallback?: React.ReactNode;
}

function ImageAsync({ src, renderFallback }: ImageAsyncProps) {
    const { loaded, error } = useImageLoaded({ src });

    if (loaded && !error) return <img src={src} />;
    else return <>{renderFallback ?? null}</>;
}

export default ImageAsync;
