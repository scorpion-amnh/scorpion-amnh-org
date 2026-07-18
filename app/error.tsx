"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-6">
          An unexpected error occurred while loading this page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
