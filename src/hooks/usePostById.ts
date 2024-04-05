import likeCountAtom from '@/atoms/likeCount';
import { Post } from '@/types/post';
import { fromNow } from '@/utils/dayjs';
import { supabase } from '@/utils/supabaseClient';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';

const fetcher = async ({ id }: { id: string | number }): Promise<Post> => {
    try {
        const { data, error } = await supabase
            .from('content_summaries')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch post data');
    }
};

export default function usePostById(id?: string | number) {
    const { data, error, isLoading } = useSWR(
        id ? { name: `content_summaries:id`, id } : null,
        fetcher,
    );

    const likeCountMap = useAtomValue(likeCountAtom);
    const post = data ? { ...data, fromNow: fromNow(data.inserted_at) } : null;

    if (post) {
        const likeCount = likeCountMap.get(post.id);
        if (likeCount !== undefined) {
            post.like_count = likeCount;
        }
    }

    return { post, isLoading, error };
}
