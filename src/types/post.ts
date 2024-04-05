export interface Post {
    id: number;
    title: string;
    content: string;
    inserted_at: string;
    media_type: string;
    media_link?: string;
    og_link?: string;
    og_source?: string;
    og_created_at?: string;
    keywords?: string;
    like_count: number;

    // client-side only
    fromNow?: string;
}
