// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "My Site",
  description: "Launched on Railway",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
