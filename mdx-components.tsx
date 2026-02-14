import type { MDXComponents } from 'mdx/types';
import { Copy, Check, AlertTriangle, Info, Shield, Zap, Terminal } from 'lucide-react';
import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-sm bg-zinc-700 hover:bg-zinc-600 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-zinc-900 dark:text-white mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-4">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-green-600 dark:text-green-400 hover:underline font-medium"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-7">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-4 my-4 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 py-3 pr-4 rounded-r-sm">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className={className}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => {
      const codeContent = typeof children === 'object' && children !== null && 'props' in children
        ? String((children as any).props?.children || '')
        : String(children || '');
      
      return (
        <div className="relative group my-4">
          <pre className="overflow-x-auto p-4 rounded-sm bg-zinc-900 text-zinc-100 text-sm font-mono leading-relaxed">
            {children}
          </pre>
          <CopyButton text={codeContent} />
        </div>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-100 dark:bg-zinc-800">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900 dark:text-white">
        {children}
      </strong>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-sm my-6 max-w-full h-auto border border-zinc-200 dark:border-zinc-800"
      />
    ),
    // Custom components for callouts
    Warning: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            {title && <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">{title}</p>}
            <div className="text-amber-700 dark:text-amber-300 text-sm">{children}</div>
          </div>
        </div>
      </div>
    ),
    Danger: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            {title && <p className="font-semibold text-red-800 dark:text-red-200 mb-1">{title}</p>}
            <div className="text-red-700 dark:text-red-300 text-sm">{children}</div>
          </div>
        </div>
      </div>
    ),
    Note: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            {title && <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">{title}</p>}
            <div className="text-blue-700 dark:text-blue-300 text-sm">{children}</div>
          </div>
        </div>
      </div>
    ),
    Security: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            {title && <p className="font-semibold text-green-800 dark:text-green-200 mb-1">{title}</p>}
            <div className="text-green-700 dark:text-green-300 text-sm">{children}</div>
          </div>
        </div>
      </div>
    ),
    Tip: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            {title && <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1">{title}</p>}
            <div className="text-purple-700 dark:text-purple-300 text-sm">{children}</div>
          </div>
        </div>
      </div>
    ),
    Command: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="my-6 p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
          <Terminal className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 overflow-x-auto">
            {title && <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{title}</p>}
            <div className="text-zinc-700 dark:text-zinc-300 text-sm font-mono">{children}</div>
          </div>
        </div>
      </div>
    ),
    ...components,
  };
}
