import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جملة DZ – B2B Wholesale Algeria",
  description: "منصة البيع بالجملة الجزائرية – تواصل مع أفضل الموردين والمصانع",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#060A12", height: "100%", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
