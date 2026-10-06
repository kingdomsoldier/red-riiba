export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <span className="text-sm text-riiba-green-dark/60">
          Panel de administración
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-riiba-green-dark">Admin</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-riiba-orange/10 text-sm font-semibold text-riiba-orange">
          A
        </div>
      </div>
    </header>
  );
}