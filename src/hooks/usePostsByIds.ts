import likeCountAtom from '@/atoms/likeCount';
import { Post } from '@/types/post';
import { getFromNow } from '@/utils/dayjs';
import { supabase } from '@/utils/supabaseClient';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';

const fetcher = async (ids: number[]): Promise<Post[]> => {
    let query = supabase.from('content_summaries').select('*').in('id', ids);

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
};

export default function usePostsByIds(ids: number[]) {
    const { data, isLoading, error } = useSWR(ids, fetcher);

    const likeCountMap = useAtomValue(likeCountAtom);

    const posts = data
        ? data.map((post) => ({
              ...post,
              fromNow: getFromNow(post.inserted_at),
          }))
        : [];

    posts.forEach((post) => {
        if (post) {
            const likeCount = likeCountMap.get(post.id);
            if (likeCount !== undefined) {
                post.like_count = likeCount;
            }
        }
    });

    return { posts, isLoading, error };
}
