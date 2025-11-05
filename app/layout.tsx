// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initTheme = `(function(){
    try {
      var s = localStorage.getItem('theme');
      var d = s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var c = document.documentElement.classList;
      d ? c.add('dark') : c.remove('dark');
    } catch(e) {}
  })();`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initTheme }} />
      </head>
      <body className="bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
