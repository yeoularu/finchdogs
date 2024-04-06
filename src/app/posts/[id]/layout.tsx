import { supabase } from '@/utils/supabaseClient';
import { Metadata } from 'next';

export async function generateMetadata({
    params: { id },
}: {
    params: { id: string };
}): Promise<Metadata> {
    try {
        const { data, error } = await supabase
            .from('content_summaries')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);

        return {
            title: data.title,
            description: data.content,
        };
    } catch (error) {
        throw new Error('Failed to fetch post data');
    }
}

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <section className="px-4">{children}</section>;
}
