'use client';

import activeReadMoreAtom from '@/atoms/activeReadMore';
import PostCard from '@/components/PostCard';
import SpinnerText from '@/components/SpinnerText';
import Text from '@/components/Typography/Text';
import useLike from '@/hooks/useLike';
import usePostsByIds from '@/hooks/usePostsByIds';
import { Button } from 'flowbite-react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
    const [isHydrating, setIsHydrating] = useState(true);

    useEffect(() => {
        setIsHydrating(false);
    }, []);

    const [activeReadMore, setActiveReadMore] = useAtom(activeReadMoreAtom);

    const isReadMoreActive = (id: number) => activeReadMore.includes(id);
    const readMore = (id: number) => setActiveReadMore((prev) => [...prev, id]);

    const { likedPostsIds, isLiked, incrementLikeCount, decrementLikeCount } =
        useLike();
    const initialLikedPostsIds = useRef<number[]>(likedPostsIds);

    const { posts, isLoading, error } = usePostsByIds(
        initialLikedPostsIds.current,
    );

    const postsMap = new Map(posts.map((post) => [post.id, post]));

    const sortedPosts = initialLikedPostsIds.current
        .slice()
        .reverse()
        .map((id) => postsMap.get(id))
        .filter((post) => post !== undefined);

    if (error) {
        return <Text>Error occurred.</Text>;
    }
    if (isHydrating || isLoading) {
        return <SpinnerText text="최신 데이터를 가져오는 중..." />;
    }

    if (!sortedPosts.length) {
        return (
            <>
                <Text>좋아한 글이 없습니다.</Text>
                <Link href="/home">
                    <Button>홈으로</Button>
                </Link>
            </>
        );
    }

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
