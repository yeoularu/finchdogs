export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-4 px-4">
      {children}
    </section>
  );
}
