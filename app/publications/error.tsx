"use client";

type PublicationsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicationsError({ reset }: PublicationsErrorProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Unable to load Publications</h1>
        <p className="text-lg text-gray-700 mb-6">
          The publications page could not be loaded. Please try again.
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
