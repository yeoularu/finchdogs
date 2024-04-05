export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-center gap-4 px-4 mb-4">
            {children}
        </section>
    );
}
