import { Metadata } from 'next';
import { DocsSidebar } from './_components/DocsSidebar';
import { DocsHeader } from './_components/DocsHeader';

export const metadata: Metadata = {
  title: {
    template: '%s | PayDeck Docs',
    default: 'Documentation | PayDeck',
  },
  description: 'Complete documentation for PayDeck - the open-source Nexa cryptocurrency point-of-sale device.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <DocsHeader />
      <div className="flex max-w-[1400px] mx-auto pt-16 md:pt-20">
        <DocsSidebar />
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-12 lg:py-12">
          <div className="max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
