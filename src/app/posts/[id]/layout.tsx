export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <section className="px-4">{children}</section>;
}
