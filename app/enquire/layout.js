/**
 * app/enquire/layout.js
 *
 * Metadata wrapper for the /enquire route.
 *
 * The enquire page itself (page.js) is a "use client" component, which means it
 * cannot export `metadata` directly. This layout.js sits above it and provides
 * all the necessary SEO metadata for the enquire route.
 *
 * Google will use:
 * - title: "Enquire About Properties in Gurugram | DS Group of Companies"
 * - description: unique to this page
 * - canonical: /enquire
 */
export const metadata = {
  title: "Property Enquiry & Consultation in Gurgaon | DS Group of Companies",
  description:
    "Submit your property enquiry to DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon. Residential flats, commercial properties, plots, and investment consultation across Gurgaon and New Gurgaon.",
  keywords: [
    "property enquiry Gurgaon",
    "property consultant in Gurgaon",
    "property dealer in Gurgaon",
    "buy flat in Gurgaon",
    "DS Group of Companies",
    "commercial property Gurgaon enquiry",
    "plots in Gurgaon enquiry",
  ],
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/enquire",
  },
  openGraph: {
    title: "Property Enquiry & Consultation in Gurgaon | DS Group of Companies",
    description:
      "Connect with DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon for verified residential, commercial, and plot investments.",
    url: "https://www.dsgroupofcompanies.in/enquire",
    type: "website",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Property Enquiry - DS Group of Companies Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Enquiry & Consultation in Gurgaon | DS Group of Companies",
    description:
      "Get expert property advice from DS Group of Companies — property dealer in Gurgaon.",
    images: ["https://www.dsgroupofcompanies.in/images/logo.png"],
    creator: "@dsgroup_realty",
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

export default function EnquireLayout({ children }) {
  return children;
}
