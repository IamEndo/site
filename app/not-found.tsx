import Link from "next/link";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { Button } from "./_components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-neutral-950 pt-24 pb-16"
      >
        <div className="text-center px-6">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            404 Error
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Browse the docs</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
