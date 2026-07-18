"use client";

type PeopleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PeopleError({ reset }: PeopleErrorProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Unable to load People</h1>
        <p className="mb-6">
          The people page could not be loaded. Please try again.
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
