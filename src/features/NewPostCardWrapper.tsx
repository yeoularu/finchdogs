import viewedNewPostIdsAtom from '@/atoms/viewedNewPostIds';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function NewPostCardWrapper({
    id,
    children,
}: Readonly<{
    id: number;
    children: React.ReactNode;
}>) {
    const [viewedPosts, setViewedPosts] = useAtom(viewedNewPostIdsAtom);

    const initialIsViewed = useRef(viewedPosts.includes(id));
    const [triggered, setTriggered] = useState(false);
    const animationDuration = 1200;

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                setViewedPosts((prev) => [...prev, id]);
                setTimeout(() => setTriggered(true), animationDuration);
            }
        },
    });

    if (initialIsViewed.current) return <>{children}</>;

    return (
        <div
            className={`rounded-lg ${!triggered && inView ? 'animate-blinkBorder' : ''}`}
            ref={ref}
        >
            {children}
        </div>
    );
}
