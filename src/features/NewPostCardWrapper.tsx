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
    });

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        // 화면에 보이면서 아직 watched 상태가 아니라면
        if (inView && !isInitiallyWatched) {
            // 애니메이션 지속 시간 후에 상태를 업데이트합니다.
            timer = setTimeout(() => {
                setWatchedPosts((prev) => [...prev, id]);
            }, 1200); // 500ms는 애니메이션 지속 시간으로 가정
        }
        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
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
