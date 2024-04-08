'use client';

import activeReadMoreAtom from '@/atoms/activeReadMore';
import realtimePostsAtom from '@/atoms/realtimePosts';
import PostCard from '@/components/PostCard';
import SpinnerText from '@/components/SpinnerText';
import Text from '@/components/Typography/Text';
import NewPostCardWrapper from '@/features/NewPostCardWrapper';
import useLike from '@/hooks/useLike';
import usePosts from '@/hooks/usePosts';
import useRealtimePosts from '@/hooks/useRealtimePosts';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';

export default function Page() {
    const { posts, isLoading, isValidating, error, size, setSize } = usePosts();
    useRealtimePosts();
    const realtimePosts = useAtomValue(realtimePostsAtom);

    const { isLiked, incrementLikeCount, decrementLikeCount } = useLike();
    const [activeReadMore, setActiveReadMore] = useAtom(activeReadMoreAtom);
    const isReadMoreActive = (id: number) => activeReadMore.includes(id);
    const readMore = (id: number) => {
        setActiveReadMore((prev) => [...prev, id]);
    };

    const { ref } = useInView({
        threshold: 0,
        rootMargin: '1200px',
        onChange: (inView) => {
            if (inView) {
                setSize(size + 1);
            }
        },
    });

    if (error) return <Text>Error occurred</Text>;
    if (isLoading) return <SpinnerText text="최신 데이터를 가져오는 중..." />;

    return (
        <>
            {realtimePosts.map((post) => (
                <NewPostCardWrapper id={post.id} key={post.id}>
                    <PostCard
                        isReadMoreActive={isReadMoreActive(post.id)}
                        readMore={() => readMore(post.id)}
                        isLiked={isLiked(post.id)}
                        like={incrementLikeCount}
                        unlike={decrementLikeCount}
                        {...post}
                    />
                </NewPostCardWrapper>
            ))}
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    isReadMoreActive={isReadMoreActive(post.id)}
                    readMore={() => readMore(post.id)}
                    isLiked={isLiked(post.id)}
                    like={incrementLikeCount}
                    unlike={decrementLikeCount}
                    {...post}
                />
            ))}

            <div ref={ref}>
                {isValidating && (
                    <SpinnerText text="다음 데이터를 가져오는 중..." />
                )}
            </div>
        </>
    );
}
