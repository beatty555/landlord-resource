import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Landlord Resource — Essential Resources for UK Landlords",
    template: "%s | Landlord Resource",
  },
  description:
    "Your one-stop hub for landlord guides, legal updates, templates, and property services. Stay informed and compliant with UK rental law.",
  keywords: ["landlord", "buy to let", "HMO", "rental property", "UK landlord guide", "tenancy", "legislation"],
  openGraph: {
    siteName: "Landlord Resource",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
