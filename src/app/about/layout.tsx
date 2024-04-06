import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '사이트 정보',
};

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-start gap-4 px-4 mb-4 max-w-3xl m-auto">
            {children}
        </section>
    );
}
