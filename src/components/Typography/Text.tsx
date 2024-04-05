export default function Text({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <p
      className={`whitespace-break-spaces font-normal text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </p>
  );
}
