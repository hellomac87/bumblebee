import useImageLoaded from 'src/hooks/useImageLoaded';

interface ImageAsyncProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    renderFallback?: React.ReactNode;
}

function ImageAsync({ src, renderFallback, ...props }: ImageAsyncProps) {
    const { loaded, error } = useImageLoaded({ src });

    if (loaded && !error) return <img {...props} src={src} />;
    else return <>{renderFallback ?? null}</>;
}

export default ImageAsync;
