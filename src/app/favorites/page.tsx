'use client';

import activeReadMoreAtom from '@/atoms/activeReadMore';
import PostCard from '@/components/PostCard';
import SpinnerText from '@/components/SpinnerText';
import Text from '@/components/Typography/Text';
import useLike from '@/hooks/useLike';
import usePostsByIds from '@/hooks/usePostsByIds';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';

export default function Page() {
    const [initialLikedPostsIds, setInitialLikedPostsIds] = useState<number[]>(
        [],
    );
    const { likedPostsIds, isLiked, incrementLikeCount, decrementLikeCount } =
        useLike();
    const [activeReadMore, setActiveReadMore] = useAtom(activeReadMoreAtom);

    useEffect(() => {
        setInitialLikedPostsIds(likedPostsIds);
    }, []);

    const isReadMoreActive = (id: number) => activeReadMore.includes(id);
    const readMore = (id: number) => setActiveReadMore((prev) => [...prev, id]);
    const { posts, isLoading, error } = usePostsByIds(initialLikedPostsIds);
    const sortedPosts = useMemo(() => {
        const postsMap = new Map(posts.map((post) => [post.id, post]));
        return initialLikedPostsIds
            .slice()
            .reverse()
            .map((id) => postsMap.get(id))
            .filter((post) => post !== undefined);
    }, [posts, initialLikedPostsIds]);

    if (error) {
        console.log(error);
        return <Text>Error occurred.</Text>;
    }
    if (isLoading || !posts.length)
        return <SpinnerText text="최신 데이터를 가져오는 중..." />;

    if (!likedPostsIds) return <Text>좋아요한 게시물이 없습니다.</Text>;

    return (
        <>
            {sortedPosts.map((post) => {
                if (!post) return null;
                return (
                    <PostCard
                        key={post.id}
                        isReadMoreActive={isReadMoreActive(post.id)}
                        readMore={() => readMore(post.id)}
                        isLiked={isLiked(post.id)}
                        like={incrementLikeCount}
                        unlike={decrementLikeCount}
                        {...post}
                    />
                );
            })}
        </>
    );
}
