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
    default: "DS Group of Companies | Real Estate & Luxury Property in Sector 85 Gurgaon",
    template: "%s | DS Group of Companies",
  },
  description:
    "DS Group of Companies — Premier real estate developer, property finder & luxury property consultant in Sector 85 Gurgaon. Explore 2/3/4 BHK luxury flats, commercial office spaces, freehold plots & landmark projects in Gurugram.",
  keywords: [
    // Primary Brand Keywords
    "DS Group",
    "DS Group of Companies",
    "DS Group Properties",
    "DS Group Real Estate",
    "DS Group Gurgaon",
    "DS Group Sector 85 Gurgaon",
    "DS Group Property Consultant",
    "DS Group Property Finder",
    "DS Group Property Dealer Gurgaon",
    "DS Group Gurugram",
    // Primary Real Estate Keywords
    "Property Finder Sector 85 Gurgaon",
    "Best Property Dealer Sector 85 Gurgaon",
    "Best Property Consultant Sector 85 Gurgaon",
    "Real Estate Consultant Sector 85 Gurgaon",
    "Property Consultant Gurgaon",
    "Luxury Property in Gurgaon",
    "Luxury Property in Sector 85 Gurgaon",
    "Luxury Flats in Gurgaon",
    "Luxury Apartments in Gurgaon",
    "Property for Sale in Gurgaon",
    "Property for Sale in Sector 85 Gurgaon",
    "Residential Property Gurgaon",
    "Residential Property Sector 85 Gurgaon",
    "Commercial Property Gurgaon",
    "Commercial Property Sector 85 Gurgaon",
    "Property Investment Gurgaon",
    "Property Investment Sector 85 Gurgaon",
    "Ready To Move Flats Gurgaon",
    "Affordable Housing Gurgaon",
    // Project Specific Keywords
    "Godrej Air Sector 85 Gurgaon",
    "Godrej Air Gurgaon",
    "Pyramid Heights Sector 85 Gurgaon",
    "Pyramid Heights Gurgaon",
    "SS The Leaf Sector 85 Gurgaon",
    "Orris Aster Court Sector 85 Gurgaon",
    // Secondary Locations
    "Property Near Dwarka Expressway",
    "Golf Course Extension Road Real Estate",
    "New Gurgaon Properties",
    "Sector 84 Gurgaon",
    "Sector 83 Gurgaon",
    "Sector 86 Gurgaon",
  ],
  authors: [{ name: "DS Group of Companies", url: "https://www.dsgroupofcompanies.in" }],
  creator: "DS Group of Companies",
  publisher: "DS Group of Companies",
  category: "Real Estate",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in",
  },
  openGraph: {
    title: "DS Group of Companies | Luxury Real Estate & Property Finder in Sector 85 Gurgaon",
    description:
      "Explore premier residential apartments, commercial office spaces, freehold plots, and turnkey construction in Gurugram with DS Group of Companies. 18+ years of engineering excellence.",
    url: "https://www.dsgroupofcompanies.in",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DS Group of Companies — Real Estate Consultant Sector 85 Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Group of Companies | Real Estate in Sector 85 Gurgaon",
    description:
      "Premier luxury residential, commercial, and plot investments in Gurugram. Connect with DS Group of Companies today.",
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
    "geo.placename": "Gurugram, Sector 85",
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
