// app/prelaunch/ninezero/page.js
import PrelaunchClient from "@/components/PrelaunchClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "NINEZERO | LIV 90 – Pre-Launch | Sector 90, Gurugram",
  description:
    "Explore NINEZERO | LIV 90 in Sector 90, Gurugram — Premium 3BHK + 3T Residences, approx. 1,850 Sq. Ft., 4.5 Acre Development and Pre-Launch EOI from ₹5 Lakh.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/prelaunch/ninezero",
  },
  openGraph: {
    title: "NINEZERO | LIV 90 – Pre-Launch | Sector 90, Gurugram",
    description:
      "Explore NINEZERO | LIV 90 in Sector 90, Gurugram — Premium 3BHK + 3T Residences, approx. 1,850 Sq. Ft., 4.5 Acre Development and Pre-Launch EOI from ₹5 Lakh.",
    url: "https://www.dsgroupofcompanies.in/prelaunch/ninezero",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/prelaunch/ninezero_exterior_1786780397467.jpg",
        width: 1200,
        height: 675,
        alt: "NINEZERO LIV 90 Pre-Launch Sector 90 Gurugram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NINEZERO | LIV 90 – Pre-Launch | Sector 90, Gurugram",
    description:
      "Explore NINEZERO | LIV 90 in Sector 90, Gurugram — Premium 3BHK + 3T Residences, approx. 1,850 Sq. Ft., 4.5 Acre Development and Pre-Launch EOI from ₹5 Lakh.",
    images: ["/images/prelaunch/ninezero_exterior_1786780397467.jpg"],
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

