import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '좋아한 글',
};
export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-center gap-4 px-4 mb-4">
            {children}
        </section>
    );
}
