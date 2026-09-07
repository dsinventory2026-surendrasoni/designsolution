// app/reviews/page.js
import ReviewsClient from "./ReviewsClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Client Reviews & Ratings | DS Group of Companies",
  description:
    "Read genuine Google reviews and testimonials from our clients. Discover why DS Group of Companies is trusted for luxury residences, commercial spaces, and turnkey construction in Gurugram.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/reviews",
  },
  openGraph: {
    title: "Client Reviews & Ratings | DS Group of Companies",
    description:
      "Read genuine Google reviews and testimonials from our clients. Discover why DS Group of Companies is trusted for luxury residences, commercial spaces, and turnkey construction in Gurugram.",
    url: "https://www.dsgroupofcompanies.in/reviews",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Ratings | DS Group of Companies",
    description:
      "Read genuine Google reviews and testimonials from our clients. Discover why DS Group of Companies is trusted for luxury residences, commercial spaces, and turnkey construction in Gurugram.",
  },
};

export default function ReviewsPage() {
  return <ReviewsClient siteConfig={staticConfig} />;
}
