import { supabase } from '@/utils/supabaseClient';
import { Metadata } from 'next';

export function generateMetadata({
    params: { name },
}: {
    params: { name: string };
}): Metadata {
    return {
        title: decodeURIComponent(name),
    };
}

export async function generateStaticParams() {
    try {
        const { data, error } = await supabase.from('sources').select('*');

        if (error) throw new Error(error.message);

        return data.map(({ name }) => ({ params: { name } }));
    } catch (error) {
        throw new Error('Failed to fetch post data');
    }
}

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-center gap-4 px-4">
            {children}
        </section>
    );
}
