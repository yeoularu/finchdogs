export default function Headline({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {children}
        </h5>
    );
}
