'use client';

import activeReadMoreAtom from '@/atoms/activeReadMore';
import PostCard from '@/components/PostCard';
import SourceAvatar from '@/components/SourceAvatar';
import SpinnerText from '@/components/SpinnerText';
import Text from '@/components/Typography/Text';
import useLike from '@/hooks/useLike';
import usePostsBySourceName from '@/hooks/usePostsBySourceName';
import { Source } from '@/types/source';
import { supabase } from '@/utils/supabaseClient';
import { useAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';

export default function Page({
    params: { name },
}: Readonly<{
    params: { name: string };
}>) {
    const decodedName = decodeURIComponent(name);

    const { posts, isLoading, isValidating, error, size, setSize } =
        usePostsBySourceName(decodedName);
    const { isLiked, incrementLikeCount, decrementLikeCount } = useLike();
    const [activeReadMore, setActiveReadMore] = useAtom(activeReadMoreAtom);
    const isReadMoreActive = (id: number) => activeReadMore.includes(id);
    const readMore = (id: number) => {
        setActiveReadMore((prev) => [...prev, id]);
    };

    const { data: sourceData, error: sourceDataError } = useSWR(
        decodedName,
        async (name: string): Promise<Source> => {
            const { data, error } = await supabase
                .from('sources')
                .select('*')
                .eq('name', name)
                .single();

            if (error) throw new Error(error.message);
            return data;
        },
    );

    const { ref } = useInView({
        threshold: 0,
        rootMargin: '1200px',
        onChange: (inView) => {
            if (inView) {
                setSize(size + 1);
            }
        },
    });

    if (error || sourceDataError) return <Text>Error occurred</Text>;
    if (isLoading) return <SpinnerText text="최신 데이터를 가져오는 중..." />;

    return (
        <>
            <div className="flex items-center gap-2">
                <SourceAvatar og_source={decodedName} className="w-10 h-10" />
                <Text className="text-2xl font-semibold">
                    {sourceData?.name}
                </Text>
            </div>
            <div className="mx-4 max-w-xl">
                <Text className="">{sourceData?.description}</Text>
            </div>

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
