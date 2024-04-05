import likeCountAtom from '@/atoms/likeCount';
import realtimePostsAtom from '@/atoms/realtimePosts';
import { Post } from '@/types/post';
import { fromNow } from '@/utils/dayjs';
import { supabase } from '@/utils/supabaseClient';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

export default function useRealtimePosts() {
    const [posts, setPosts] = useAtom(realtimePostsAtom);
    const likeCountMap = useAtomValue(likeCountAtom);

    useEffect(() => {
        const channel = supabase
            .channel('public:content_summaries')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'content_summaries',
                },
                (payload) => {
                    const post = {
                        ...payload.new,
                        fromNow: fromNow(payload.new.inserted_at),
                    } as Post;

                    setPosts((prev) => [post, ...prev]);
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [setPosts]);

    useEffect(() => {
        const updatedPosts = posts.map((post) => {
            const newLikeCount = likeCountMap.get(post.id) ?? 0;
            if (post.like_count !== newLikeCount) {
                return { ...post, like_count: newLikeCount };
            }
            return post;
        });

        const anyUpdated = updatedPosts.some(
            (post, index) => post.like_count !== posts[index].like_count,
        );
        if (anyUpdated) {
            setPosts(updatedPosts);
        }
    }, [likeCountMap]);
}
