// app/about/page.js
import AboutHubView from "@/components/AboutHubView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { siteConfig as fallbackConfig } from "@/data/siteConfig";

export const revalidate = 60; // Revalidate every 60 seconds

async function getConfig() {
  try {
    await connectDB();
    const configDoc = await getOrCreateConfig();
    const config = JSON.parse(JSON.stringify(configDoc));
    if (config?.contact && !config.contact.address) {
      config.contact.address = {
        plot: config.contact.addressPlot || "Plot Sector 85",
        tower: config.contact.addressTower || "Tower 7",
        floor: config.contact.addressFloor || "3rd Floor",
        city: config.contact.addressCity || "Gurugram",
        state: config.contact.addressState || "Haryana",
        pincode: config.contact.addressPincode || "122004",
        country: config.contact.addressCountry || "India",
      };
    }
    return config;
  } catch (err) {
    console.error("Error fetching config for /about:", err);
    return fallbackConfig;
  }
}

/* ── Dynamic SEO Metadata (Directly influenced by MongoDB) ────────── */
export async function generateMetadata() {
  const config = await getConfig();
  const company = config?.about?.companyDetails || {};
  const owner = config?.about?.ownerDetails || {};
  const brand = config?.brand || fallbackConfig.brand;

  const title =
    company.metaTitle ||
    `About ${brand.name} | Real Estate Developer Sector 85 Gurgaon`;

  const description =
    company.metaDescription ||
    `Discover ${brand.name} — Premier real estate developer, construction firm & property consultants in Sector 85 Gurugram. Founded by ${owner.name || "Surendra Soni"}.`;

  const dynamicKeywords = company.seoKeywords && company.seoKeywords.length > 0
    ? company.seoKeywords
    : [
        "DS Group of Companies about",
        "DS Group founder Surendra Soni",
        "DS Group team Gurgaon",
        "real estate developer Sector 85 Gurgaon",
        "luxury property developer Gurugram",
        "property consultant Gurgaon team",
        "Surendra Soni real estate",
        "construction company Gurgaon",
      ];

  return {
    title,
    description,
    keywords: dynamicKeywords,
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about",
    },
    openGraph: {
      title,
      description,
      url: "https://www.dsgroupofcompanies.in/about",
      siteName: brand.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: owner.photo || "/images/logo.png",
          width: 1200,
          height: 630,
          alt: `${brand.name} — About Us`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [owner.photo || "/images/logo.png"],
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
}

/* ── Page Component ─────────────────────────────────────────────── */
export default async function AboutPage() {
  const config = await getConfig();
  const brand = config?.brand || fallbackConfig.brand;
  const contact = config?.contact || fallbackConfig.contact;
  const company = config?.about?.companyDetails || {};
  const owner = config?.about?.ownerDetails || {};

  // Dynamic JSON-LD structured data
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.dsgroupofcompanies.in/#organization",
    name: brand.name || "DS Group of Companies",
    alternateName: brand.shortName || "DS Group",
    url: "https://www.dsgroupofcompanies.in",
    logo: {
      "@type": "ImageObject",
      url: brand.logoUrl || "https://www.dsgroupofcompanies.in/images/logo.png",
      width: 512,
      height: 512,
    },
    description: company.story || brand.tagline,
    foundingDate: String(company.establishedYear || brand.establishedYear || 2008),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.addressPlot || "Plot Sector 85"}, ${contact.addressTower || "Tower 7"}`,
      addressLocality: contact.addressCity || "Gurugram",
      addressRegion: contact.addressState || "Haryana",
      postalCode: contact.addressPincode || "122004",
      addressCountry: "IN",
    },
    telephone: contact.phonePrimary || "+91-77430-00070",
    email: contact.emailPrimary || "info@dsgroupofcompanies.com",
    sameAs: [
      config?.socialLinks?.instagram || "https://instagram.com/dsgroup_official",
      config?.socialLinks?.facebook || "https://facebook.com/dsgroupofcompanies",
      config?.socialLinks?.linkedin || "https://linkedin.com/company/ds-group-of-companies",
      config?.socialLinks?.youtube || "https://www.youtube.com/@DSGROUPOFCOMPANIES-w2c",
    ],
    knowsAbout: company.seoKeywords || [
      "Luxury Real Estate Development",
      "Residential Property Gurugram",
      "Commercial Real Estate Gurgaon",
      "Freehold Plot Sales",
      "Turnkey Construction",
    ],
  };

  const founderJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.dsgroupofcompanies.in/about#founder",
    name: owner.name || "Surendra Soni",
    jobTitle: owner.designation || "Founder & Managing Director",
    image: owner.photo || undefined,
    description: owner.bio,
    worksFor: {
      "@type": "Organization",
      name: brand.name || "DS Group of Companies",
      "@id": "https://www.dsgroupofcompanies.in/#organization",
    },
    url: "https://www.dsgroupofcompanies.in/about",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dsgroupofcompanies.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: "https://www.dsgroupofcompanies.in/about",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar siteConfig={config} />
      <AboutHubView siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
