import { Outfit, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * metadataBase is critical — it resolves all relative image URLs for OG/Twitter tags.
 * Without it, Next.js cannot generate absolute OG image URLs.
 */
export const metadata = {
  metadataBase: new URL("https://www.dsgroupofcompanies.in"),
  title: {
    default: "DS Group of Companies | Premium Real Estate in Gurugram",
    template: "%s | DS Group of Companies",
  },
  description:
    "Explore premium residential apartments, commercial spaces, freehold plots and real estate investment opportunities in Gurugram with DS Group of Companies. 18+ years of engineering excellence.",
  keywords: [
    "DS Group of Companies",
    "real estate in Gurugram",
    "real estate in Gurgaon",
    "property in Gurugram",
    "property consultant Gurugram",
    "residential property Gurugram",
    "commercial property Gurugram",
    "plots in Gurugram",
    "new projects Gurugram",
    "Sector 85 Gurugram",
  ],
  authors: [{ name: "DS Group of Companies", url: "https://www.dsgroupofcompanies.in" }],
  creator: "DS Group of Companies",
  publisher: "DS Group of Companies",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in",
  },
  openGraph: {
    title: "DS Group of Companies | Premium Real Estate in Gurugram",
    description:
      "Discover luxury residential apartments, Grade-A commercial spaces, freehold plots and expert real estate solutions in Gurugram with DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DS Group of Companies — Premium Real Estate in Gurugram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Group of Companies | Premium Real Estate in Gurugram",
    description:
      "Premium residential, commercial and plot properties in Gurugram. Enquire with DS Group of Companies today.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body
        className="font-sans antialiased text-slate-900"
        style={{ fontFamily: "var(--font-plus-jakarta), var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
