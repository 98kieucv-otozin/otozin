import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SearchBarSticky from "@/components/ui/SearchBarSticky";
import Footer from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { SkipLink } from "@/components/ui/Accessibility";

const nunito = Nunito({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MyApp - Modern Car Marketplace",
  description: "A modern, beautiful car marketplace built with Next.js and Tailwind CSS. Find your perfect car with our advanced search and filtering system.",
  keywords: ["cars", "vehicles", "marketplace", "nextjs", "tailwind"],
  authors: [{ name: "MyApp Team" }],
  creator: "MyApp",
  publisher: "MyApp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://myapp.com"),
  openGraph: {
    title: "MyApp - Modern Car Marketplace",
    description: "A modern, beautiful car marketplace built with Next.js and Tailwind CSS.",
    url: "https://myapp.com",
    siteName: "MyApp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyApp - Modern Car Marketplace",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyApp - Modern Car Marketplace",
    description: "A modern, beautiful car marketplace built with Next.js and Tailwind CSS.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={nunito.className} suppressHydrationWarning>
        <ErrorBoundary key="error-boundary">
          <SkipLink href="#main-content">Skip to main content</SkipLink>

          <div className="min-h-screen flex flex-col">
            <Header />
            <SearchBarSticky />

            <main id="main-content" className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
