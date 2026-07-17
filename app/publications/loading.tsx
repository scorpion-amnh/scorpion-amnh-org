export default function PublicationsLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="h-12 w-56 animate-pulse rounded bg-gray-200 mb-8" />
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-16 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
