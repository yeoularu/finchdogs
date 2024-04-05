'use client';

import activeReadMoreAtom from '@/atoms/activeReadMore';
import PostCard from '@/components/PostCard';
import PostDetail from '@/components/PostDetail';
import SpinnerText from '@/components/SpinnerText';
import Text from '@/components/Typography/Text';
import useLike from '@/hooks/useLike';
import usePostById from '@/hooks/usePostById';
import usePosts from '@/hooks/usePosts';
import { useAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';

export default function Page({
    params: { id },
}: Readonly<{ params: { id: string } }>) {
    const {
        posts,
        isLoading: isPostsLoading,
        isValidating: isPostsValidating,
        error: postsError,
        size,
        setSize,
    } = usePosts();
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

    const existedPost = posts.find((post) => post.id === parseInt(id, 10));
    const {
        post: postById,
        isLoading,
        error,
    } = usePostById(existedPost ? undefined : id);
    const post = postById || existedPost;

    if (isLoading || isPostsLoading)
        return <SpinnerText text="데이터를 가져오는 중..." />;

    if (error || postsError) return <Text>Error occurred</Text>;
    if (!post) return <Text>포스트를 찾을 수 없습니다.</Text>;
    return (
        <>
            <PostDetail
                {...post}
                isLiked={isLiked(post.id)}
                like={incrementLikeCount}
                unlike={decrementLikeCount}
            />

            {posts
                .filter((item) => item.id !== post.id)
                .map((post) => (
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
                {isPostsValidating && (
                    <SpinnerText text="다음 데이터를 가져오는 중..." />
                )}
            </div>
        </>
    );
}
