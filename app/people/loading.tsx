export default function PeopleLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="h-12 w-48 animate-pulse rounded bg-gray-200 mb-8" />
        <div className="h-24 animate-pulse rounded bg-gray-100 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="h-64 animate-pulse rounded bg-gray-100" />
          <div className="lg:col-span-3 space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-32 animate-pulse rounded bg-gray-100" />
            <div className="h-32 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
