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
  title: "Enquire About Properties in Gurugram | DS Group of Companies",
  description:
    "Submit your property enquiry to DS Group of Companies. Tell us your requirements for residential apartments, commercial spaces, plots, or turnkey construction in Gurugram. Our advisor will contact you within 30 minutes.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/enquire",
  },
  openGraph: {
    title: "Enquire About Properties in Gurugram | DS Group of Companies",
    description:
      "Reach out to DS Group of Companies for personalised property advice, site visit bookings, price insights, and real estate consultation in Gurugram.",
    url: "https://www.dsgroupofcompanies.in/enquire",
    type: "website",
  },
  twitter: {
    title: "Enquire About Properties in Gurugram | DS Group of Companies",
    description:
      "Get expert property advice from DS Group of Companies. Residential, commercial, plots and construction projects in Gurugram.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnquireLayout({ children }) {
  return children;
}
