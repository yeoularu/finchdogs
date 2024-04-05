export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-start gap-4 px-4 mb-4 max-w-3xl m-auto">
            {children}
        </section>
    );
}
