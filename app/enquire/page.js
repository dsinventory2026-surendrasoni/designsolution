import EnquireClient from "@/components/EnquireClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Property Enquiry & Site Visit Booking | DS Group of Companies Gurgaon",
  description:
    "Send your property requirements to DS Group of Companies. Get expert advisory for residential flats, commercial properties, plots, and pre-launch projects across Gurgaon and Sector 85.",
  keywords: [
    "property enquiry Gurgaon",
    "book site visit Gurgaon",
    "property dealer contact Gurgaon",
    "real estate consultant enquiry",
    "DS Group of Companies enquiry",
    "Sector 85 Gurgaon property consultation",
  ],
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/enquire",
  },
  openGraph: {
    title: "Property Enquiry & Site Visit Booking | DS Group of Companies Gurgaon",
    description:
      "Send your property requirements to DS Group of Companies. Direct builder pricing, zero brokerage advisory, and verified listings.",
    url: "https://www.dsgroupofcompanies.in/enquire",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Property Enquiry — DS Group of Companies Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Enquiry & Site Visit Booking | DS Group of Companies Gurgaon",
    description:
      "Get expert property advisory and book private site visits across Gurgaon with DS Group of Companies.",
    images: ["https://www.dsgroupofcompanies.in/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function EnquirePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Enquire", href: "/enquire" },
  ]);

  return (
    <>
      <JsonLd schema={[breadcrumbSchema].filter(Boolean)} />
      <EnquireClient />
    </>
  );
}
