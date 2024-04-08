import watchedNewPosts from '@/atoms/watchedNewPosts';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function NewPostCardWrapper({
    id,
    children,
}: Readonly<{
    id: number;
    children: React.ReactNode;
}>) {
    const [watchedPosts, setWatchedPosts] = useAtom(watchedNewPosts);
    const isInitiallyWatched = watchedPosts.includes(id);

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;

        if (inView && !isInitiallyWatched) {
            timer = setTimeout(() => {
                setWatchedPosts((prev) => [...prev, id]);
            }, 1200);
        }
        return () => clearTimeout(timer);
    }, [inView, isInitiallyWatched, setWatchedPosts, id]);

    return (
        <div
            className={`rounded-lg ${!isInitiallyWatched && inView ? 'animate-blinkBorder' : ''}`}
            ref={ref}
        >
            {children}
        </div>
    );
}
