import { useState, useEffect, useRef } from 'react';

interface UseImageLoadedProps {
    src: string;
}

interface UseImageLoadedReturn {
    loaded: boolean;
    error: boolean;
}

const useImageLoaded = ({ src }: UseImageLoadedProps): UseImageLoadedReturn => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = src;
        } else {
            const img = new Image();
            imgRef.current = img;
            img.src = src;
        }

        const handleLoad = () => {
            setLoaded(true);
        };

        const handleError = () => {
            setError(true);
        };

        imgRef.current.addEventListener('load', handleLoad);
        imgRef.current.addEventListener('error', handleError);

        return () => {
            imgRef.current?.removeEventListener('load', handleLoad);
            imgRef.current?.removeEventListener('error', handleError);
        };
    }, [src]);

    return { loaded, error };
};

export default useImageLoaded;
