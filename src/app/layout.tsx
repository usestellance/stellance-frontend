import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stellance",
    template: "%s | Stellance",
  },
  description:
    "Do business worldwide, receive money without restrictions. A simple payment process helps you get paid on time. Provide multiple payment options that your customers can choose from to make their payment securely. Stellance partners with trusted payment networks to offer fiat off-ramps in supported regions",
  keywords: [
    "global payments",
    "international business",
    "payment processing",
    "fiat off-ramp",
    "cross-border payments",
    "online payments",
    "payment gateway",
    "Stellance",
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
      {/* <head>
        <script src="https://accounts.google.com/gsi/client" async defer />
      </head> */}
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
