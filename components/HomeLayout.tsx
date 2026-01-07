export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen max-w-8xl bg-gray-50 flex flex-col items-center justify-start pt-16">
      {children}
    </main>
  );
}
