import likeCountAtom from '@/atoms/likeCount';
import { Post } from '@/types/post';
import { getFromNow } from '@/utils/dayjs';
import { supabase } from '@/utils/supabaseClient';
import { useAtomValue } from 'jotai';
import useSWRInfinite from 'swr/infinite';

const getKey = (previousPageData: Post[] | null, og_source: string) => {
    if (previousPageData && !previousPageData.length) return null;

    const lastId = previousPageData ? previousPageData.at(-1)?.id : '';
    return { name: 'content_summaries:infinite', og_source, lastId };
};

const fetcher = async ({
    lastId,
    og_source,
}: {
    lastId: string;
    og_source: string;
}): Promise<Post[]> => {
    let query = supabase
        .from('content_summaries')
        .select('*')
        .order('id', { ascending: false })
        .eq('og_source', og_source)
        .limit(10);

    if (lastId) {
        query = query.lt('id', lastId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
};

export default function usePostsBySourceName(og_source: string) {
    const { data, isLoading, isValidating, error, size, setSize } =
        useSWRInfinite(
            (_, previousPageData) => getKey(previousPageData, og_source),
            fetcher,
            {
                revalidateFirstPage: false,
            },
        );

    const likeCountMap = useAtomValue(likeCountAtom);

    const posts = data
        ? data.flatMap((page) =>
              page.map((post) => ({
                  ...post,
                  fromNow: getFromNow(post.inserted_at),
              })),
          )
        : [];

    posts.forEach((post) => {
        if (post) {
            const likeCount = likeCountMap.get(post.id);
            if (likeCount !== undefined) {
                post.like_count = likeCount;
            }
        }
    });

    return { posts, isLoading, isValidating, error, size, setSize };
}
