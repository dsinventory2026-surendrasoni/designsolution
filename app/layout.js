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

export const metadata = {
  title: "DS Group of Companies | Premium Real Estate & Construction — Sector 85, Gurugram",
  description:
    "DS Group of Companies — Premier residential apartments, Grade-A commercial suites, freehold plots, and turnkey construction in Sector 85, Gurugram. 18+ years of engineering excellence. WhatsApp: +91 77430 00070.",
  keywords: [
    "DS Group of Companies",
    "DS Group Real Estate",
    "Residential Flats Sector 85 Gurugram",
    "Commercial Office Sector 85",
    "Luxury Apartments Gurugram",
    "Plots Sector 85",
    "Turnkey Construction Gurugram",
    "Luxury Real Estate",
    "Real Estate Developer Haryana",
  ],
  openGraph: {
    title: "DS Group of Companies | Engineering Excellence, Building Timeless Luxury",
    description:
      "Discover luxury residential, commercial, plots, and turnkey construction by DS Group of Companies — Sector 85, Gurugram.",
    url: "https://dsgroupofcompanies.com",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Group of Companies | Premium Real Estate",
    description: "Engineering Excellence. Building Timeless Luxury.",
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
