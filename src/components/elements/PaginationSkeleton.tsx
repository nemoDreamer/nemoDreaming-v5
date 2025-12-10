export default function PaginationSkeleton() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 font-mono text-sm text-gray-500 mb-8">
      <div className="px-2 py-1">← Previous</div>
      <div className="text-xs">Page x of x (x items)</div>
      <div className="px-2 py-1">Next →</div>
    </div>
  );
}
