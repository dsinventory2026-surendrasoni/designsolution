// app/prelaunch/ninezero/page.js
import PrelaunchClient from "@/components/PrelaunchClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "NINEZERO LIV 90 Pre-Launch Sector 90 Gurgaon | DS Group of Companies",
  description:
    "Explore NINEZERO LIV 90 in Sector 90 Gurgaon — Premium 3BHK + 3T residences across 4.5 acres. Pre-launch consultation and booking assistance by DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon.",
  keywords: [
    "NINEZERO LIV 90",
    "pre launch projects in Gurgaon",
    "Sector 90 Gurgaon properties",
    "property dealer in Sector 90 Gurgaon",
    "property consultant in Gurgaon",
    "DS Group of Companies",
    "flats in Sector 90 Gurgaon",
  ],
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/prelaunch/ninezero",
  },
  openGraph: {
    title: "NINEZERO LIV 90 Pre-Launch Sector 90 Gurgaon | DS Group of Companies",
    description:
      "Explore NINEZERO LIV 90 in Sector 90 Gurgaon — Premium 3BHK + 3T residences. Pre-launch booking with DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in/prelaunch/ninezero",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/prelaunch/ninezero_exterior_1786780397467.jpg",
        width: 1200,
        height: 675,
        alt: "NINEZERO LIV 90 Pre-Launch Sector 90 Gurgaon — DS Group of Companies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NINEZERO LIV 90 Pre-Launch Sector 90 Gurgaon | DS Group of Companies",
    description:
      "Premium 3BHK residences in Sector 90 Gurgaon. Explore with DS Group of Companies.",
    images: ["/images/prelaunch/ninezero_exterior_1786780397467.jpg"],
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
};

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Pre-Launch", href: "/prelaunch" },
  { name: "NINEZERO | LIV 90", href: "/prelaunch/ninezero" },
]);

export default function NineZeroPage() {
  return (
    <>
      <JsonLd schema={[breadcrumb].filter(Boolean)} />
      <PrelaunchClient siteConfig={staticConfig} />
    </>
  );
}

