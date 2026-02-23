import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Site</h1>
        <p className="text-lg text-center mb-4">This is a modern, mobile-responsive landing page built with Next.js and Tailwind CSS.</p>
        <Image
          className="dark:invert"
          src="/images/00050.jpg"
          alt="Scorpion"
          width={800}
          height={533}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="text-2xl font-semibold">Main Content</h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This content is pulled from the old site backup.
          </p>
          <Link href="/about" className="text-blue-500 hover:underline">Learn more about us</Link>
        </div>
      </main>
    </div>
  );
}
