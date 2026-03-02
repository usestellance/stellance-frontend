import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stellance",
    template: "%s | Stellance",
  },
  description:
    "Stellance is a next-generation invoicing and payment platform built on the Stellar network. We help businesses, freelancers, and digital entrepreneurs send invoices, receive cross-border payments, and manage settlements instantly , without the friction of traditional banking systems. Whether you're serving clients locally or globally, Stellance makes getting paid simple, fast, and cost-effective.",
  keywords: [
    "global payments",
    "international business",
    "payment processing",
    "fiat off-ramp",
    "cross-border payments",
    "online payments",
    "payment gateway",
    "Stellance",
    "Stellar",
    "invoice",
    "invoices",
    "invoice platform",
  ],
  authors: [{ name: "Stellance" }],
  creator: "Stellance",
  metadataBase: new URL("https://usestellance.com"), // replace with actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usestellance.com",
    siteName: "Stellance",
    title: "Stellance — Do Business Worldwide",
    description:
      "Receive money without restrictions. Simple, secure, global payments for your business.",
    images: [
      {
        url: "/images/hero_preview.png", // add a 1200x630 image to your /public folder
        width: 1200,
        height: 630,
        alt: "Stellance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellance — Do Business Worldwide",
    description:
      "Receive money without restrictions. Simple, secure, global payments for your business.",
    images: ["/images/hero_preview.png"],
    creator: "@stellance", // replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
