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
 * Global Metadata Configuration for DS Group of Companies
 * Prioritizing brand dominance, Sector 85 Gurugram, luxury properties, and local search.
 */
export const metadata = {
  metadataBase: new URL("https://www.dsgroupofcompanies.in"),
  title: {
    default: "DS Group of Companies | Property Dealer & Real Estate Consultant in Gurgaon",
    template: "%s | DS Group of Companies",
  },
  description:
    "DS Group of Companies is a trusted property dealer and real estate consultant in Gurgaon. Explore residential flats, commercial properties, plots, new launches, pre-launch projects, and property investment opportunities across Gurgaon and New Gurgaon.",
  keywords: [
    // Primary Brand
    "DS Group of Companies",
    "DS Group",
    "DS Group Gurgaon",
    "DS Group of Companies Gurgaon",
    // Core Business Keywords
    "property dealer in Gurgaon",
    "property consultant in Gurgaon",
    "real estate consultant in Gurgaon",
    "best property dealer in Gurgaon",
    "real estate company in Gurgaon",
    "property dealer in New Gurgaon",
    "property consultant in New Gurgaon",
    // Property Types
    "residential property dealer Gurgaon",
    "commercial property dealer Gurgaon",
    "plot dealer Gurgaon",
    "flats for sale in Gurgaon",
    "flats for rent in Gurgaon",
    "property investment in Gurgaon",
    "new launch projects in Gurgaon",
    "pre launch projects in Gurgaon",
    // Key Sector Keywords
    "property dealer in Sector 85 Gurgaon",
    "property consultant in Sector 85 Gurgaon",
    "property dealer in Sector 89 Gurgaon",
    "property dealer in Sector 90 Gurgaon",
    "property dealer in Sector 92 Gurgaon",
    "property dealer in Sector 82 Gurgaon",
    "property dealer in Sector 82A Gurgaon",
    "property dealer in Sector 86 Gurgaon",
    "property dealer in Sector 93 Gurgaon",
    "property dealer in Sector 95 Gurgaon",
  ],
  authors: [{ name: "DS Group of Companies", url: "https://www.dsgroupofcompanies.in" }],
  creator: "DS Group of Companies",
  publisher: "DS Group of Companies",
  category: "Real Estate",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in",
  },
  openGraph: {
    title: "DS Group of Companies | Property Dealer & Real Estate Consultant in Gurgaon",
    description:
      "DS Group of Companies is a trusted property dealer and real estate consultant in Gurgaon offering residential flats, commercial properties, plots, new launches, and property consultation across Gurgaon and New Gurgaon.",
    url: "https://www.dsgroupofcompanies.in",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DS Group of Companies — Property Dealer and Real Estate Consultant in Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Group of Companies | Property Dealer & Real Estate Consultant in Gurgaon",
    description:
      "Trusted property dealer in Gurgaon. Explore residential, commercial, and plot properties with DS Group of Companies.",
    images: ["/images/logo.png"],
    creator: "@dsgroup_realty",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Gurugram",
    "geo.position": "28.4024;76.9696",
    "ICBM": "28.4024, 76.9696",
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
