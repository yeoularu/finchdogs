import imageRatioMapAtom from '@/atoms/imageRatio';
import { useAtom } from 'jotai';
import Image from 'next/image';

export default function ImageAutoRatio({
    src,
    alt = 'image',
}: Readonly<{
    src: string;
    alt: string;
}>) {
    const [imageRatioMap, setImageRatioMap] = useAtom(imageRatioMapAtom);
    const imageRatio = imageRatioMap.get(src);
    const handleImageLoad = (e: any) => {
        if (imageRatio) return;

        const target = e.target as HTMLImageElement;
        const ratio = target.naturalWidth / target.naturalHeight;

        sessionStorage.setItem(src, ratio.toString());
        setImageRatioMap(new Map([...Array.from(imageRatioMap), [src, ratio]]));
    };

    return (
        <figure
            className={`relative w-full`}
            style={{ aspectRatio: imageRatio ?? 1 }}
        >
            <Image
                src={src}
                alt={alt}
                className="h-auto w-full rounded-md"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={handleImageLoad}
            />
        </figure>
    );
}
