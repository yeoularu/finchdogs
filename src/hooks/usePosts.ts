import likeCountAtom from '@/atoms/likeCount';
import { Post } from '@/types/post';
import { fromNow } from '@/utils/dayjs';
import { supabase } from '@/utils/supabaseClient';
import { useAtomValue } from 'jotai';
import useSWRInfinite from 'swr/infinite';

const getKey = (_: number, previousPageData: Post[] | null) => {
    if (previousPageData && !previousPageData.length) return null;

    const lastId = previousPageData ? previousPageData.at(-1)?.id : '';
    return { name: 'content_summaries:infinite', lastId };
};

const fetcher = async ({ lastId }: { lastId: string }): Promise<Post[]> => {
    let query = supabase
        .from('content_summaries')
        .select('*')
        .order('id', { ascending: false })
        .limit(10);

    if (lastId) {
        query = query.lt('id', lastId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
};

export default function usePosts() {
    const { data, isLoading, isValidating, error, size, setSize } =
        useSWRInfinite(getKey, fetcher, {
            revalidateFirstPage: false,
        });
    const likeCountMap = useAtomValue(likeCountAtom);
    const posts = data
        ? data.flatMap((page) =>
              page.map((post) => ({
                  ...post,
                  fromNow: fromNow(post.inserted_at),
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
