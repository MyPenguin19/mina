export function PageHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h1 className="text-2xl font-semibold leading-8 tracking-tight">{title}</h1>
      <p className="mt-1 max-w-3xl text-secondary-body leading-5 text-secondary-text">{children}</p>
    </div>
  );
}
