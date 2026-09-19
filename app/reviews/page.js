// app/reviews/page.js
import ReviewsClient from "./ReviewsClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Client Reviews & Ratings | DS Group of Companies Gurgaon",
  description:
    "Read genuine Google reviews and client testimonials. Discover why DS Group of Companies is a trusted property dealer and real estate consultant in Gurgaon for residential flats, commercial properties, and plots.",
  keywords: [
    "DS Group reviews",
    "DS Group of Companies reviews",
    "property dealer reviews Gurgaon",
    "property consultant Gurgaon reviews",
    "DS Group Gurgaon customer feedback",
    "best real estate company Gurgaon",
  ],
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/reviews",
  },
  openGraph: {
    title: "Client Reviews & Ratings | DS Group of Companies Gurgaon",
    description:
      "Read genuine Google reviews and testimonials. Discover why DS Group of Companies is a trusted property dealer and real estate consultant in Gurgaon.",
    url: "https://www.dsgroupofcompanies.in/reviews",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Client Reviews - DS Group of Companies Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Ratings | DS Group of Companies Gurgaon",
    description:
      "Read genuine client testimonials and discover why DS Group of Companies is trusted in Gurgaon.",
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

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Client Reviews", href: "/reviews" },
]);

export default function ReviewsPage() {
  return (
    <>
      <JsonLd schema={[breadcrumb].filter(Boolean)} />
      <ReviewsClient siteConfig={staticConfig} />
    </>
  );
}

