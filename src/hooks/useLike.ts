import likeCountAtom from '@/atoms/likeCount';
import { supabase } from '@/utils/supabaseClient';
import { useAtom } from 'jotai';
import { useLocalStorage } from 'usehooks-ts';

export default function useLike() {
    const [value, setValue] = useLocalStorage<number[]>('liked_posts_id', []);

    const [likeCountMap, setLikeCountMap] = useAtom(likeCountAtom);

    const isLiked = (id: number) => value.includes(id);

    async function incrementLikeCount(id: number) {
        try {
            const { data, error } = await supabase.rpc('increment_like_count', {
                row_id: id,
            });
            if (error) {
                throw new Error('Failed to increment like count');
            }

            setValue([...value, id]);

            setLikeCountMap(new Map(likeCountMap).set(id, data));
        } catch (error) {
            throw new Error('Failed to increment like count');
        }
    }

    async function decrementLikeCount(id: number) {
        try {
            const { data, error } = await supabase.rpc('decrement_like_count', {
                row_id: id,
            });
            if (error) {
                throw new Error('Failed to decrement like count');
            }

            setValue([...value.filter((v) => v !== id)]);

            setLikeCountMap(new Map(likeCountMap).set(id, data));
        } catch (error) {
            throw new Error('Failed to decrement like count');
        }
    }

    return {
        isLiked,
        incrementLikeCount,
        decrementLikeCount,
        likedPostsIds: value,
    };
}
