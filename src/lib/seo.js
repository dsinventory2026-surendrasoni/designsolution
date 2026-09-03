/**
 * SEO Utilities — DS Group of Companies
 * Centralized helpers for metadata generation and JSON-LD structured data.
 *
 * Usage:
 *   import { SITE_URL, buildMetadata, getOrganizationSchema, getLocalBusinessSchema, getWebSiteSchema, getFAQSchema } from "@/lib/seo";
 */

// ─── Constants ────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.dsgroupofcompanies.in";
export const SITE_NAME = "DS Group of Companies";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

// ─── Metadata Builder ─────────────────────────────────────────────────────────

/**
 * Build a consistent Next.js metadata object for any page.
 *
 * @param {string} title         - Page-level title (appended with site name)
 * @param {string} description   - Unique meta description for this page
 * @param {string} path          - Relative path, e.g. "/enquire"
 * @param {string} [ogImage]     - Optional OG image URL; falls back to logo
 * @param {"website"|"article"}  [ogType] - OG type; defaults to "website"
 * @returns {import("next").Metadata}
 */
export function buildMetadata(title, description, path, ogImage, ogType = "website") {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: ogType,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
}

// ─── Organization Schema ──────────────────────────────────────────────────────

/**
 * Organization JSON-LD schema for DS Group of Companies.
 * Targets Brand Keywords: DS Group, DS Group of Companies, DS Group Properties, DS Group Real Estate.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DS Group of Companies",
    alternateName: [
      "DS Group",
      "DS Group Properties",
      "DS Group Real Estate",
      "DS Group Realty",
      "DS Group Gurugram",
      "DS Group Gurgaon"
    ],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 400,
      height: 200,
    },
    description:
      "DS Group of Companies is the premier real estate developer and luxury property consultant in Sector 85 Gurgaon, offering high-end residential flats, Grade-A commercial spaces, plots, and turnkey construction.",
    telephone: "+917743000070",
    email: "info@dsgroupofcompanies.in",
    foundingDate: "2008",
    founder: {
      "@type": "Person",
      name: "Surendra Soni",
      jobTitle: "Founder & Managing Director"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      addressLocality: "Sector 85, Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    sameAs: [
      "https://instagram.com/dsgroup_official",
      "https://facebook.com/dsgroupofcompanies",
      "https://x.com/dsgroup_realty",
      "https://linkedin.com/company/ds-group-of-companies",
      "https://youtube.com/@dsgrouprealty"
    ],
  };
}

// ─── LocalBusiness Schema ─────────────────────────────────────────────────────

/**
 * LocalBusiness (RealEstateAgent) JSON-LD for Local SEO.
 * Targets: Property Finder Sector 85 Gurgaon, Best Property Dealer Sector 85 Gurgaon, Luxury Property in Sector 85 Gurgaon.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "DS Group of Companies - Real Estate Consultant & Property Finder",
    alternateName: [
      "DS Group Property Dealer Gurgaon",
      "DS Group Real Estate Consultant Sector 85",
      "Property Finder Sector 85 Gurgaon"
    ],
    image: `${SITE_URL}/images/logo.png`,
    url: SITE_URL,
    telephone: "+917743000070",
    priceRange: "₹₹₹₹",
    description:
      "Best real estate consultant, property finder, and property dealer in Sector 85 Gurgaon. Specializing in luxury flats, commercial properties, Godrej Air Sector 85, Pyramid Heights, SS The Leaf, and freehold residential plots.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      addressLocality: "Sector 85, Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4024,
      longitude: 76.9696
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "17:00",
      }
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Sector 85 Gurgaon" },
      { "@type": "AdministrativeArea", name: "Sector 85 Gurugram" },
      { "@type": "AdministrativeArea", name: "Sector 84 Gurgaon" },
      { "@type": "AdministrativeArea", name: "Sector 83 Gurgaon" },
      { "@type": "AdministrativeArea", name: "Sector 86 Gurgaon" },
      { "@type": "AdministrativeArea", name: "Sector 88 Gurgaon" },
      { "@type": "AdministrativeArea", name: "New Gurgaon" },
      { "@type": "AdministrativeArea", name: "Dwarka Expressway" },
      { "@type": "AdministrativeArea", name: "Golf Course Extension Road" },
      { "@type": "AdministrativeArea", name: "Sohna Road" },
      { "@type": "AdministrativeArea", name: "Manesar" },
      { "@type": "City", name: "Gurugram" },
      { "@type": "City", name: "Gurgaon" }
    ],
    hasMap: "https://www.google.com/maps/search/DS+Group+of+Companies+Sector+85+Gurugram",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Cheque, Bank Transfer, Demand Draft",
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// ─── WebSite Schema ───────────────────────────────────────────────────────────

/**
 * WebSite JSON-LD with SearchAction for Google Sitelinks.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "DS Group of Companies",
    alternateName: "DS Group Real Estate Gurugram",
    url: SITE_URL,
    description:
      "Official website of DS Group of Companies — Premier luxury real estate developer and property consultant in Sector 85 Gurgaon.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/#portfolio?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// ─── FAQPage Schema ───────────────────────────────────────────────────────────

/**
 * Generates FAQPage JSON-LD for rich snippet rankings in Google search results.
 * @param {Array<{question: string, answer: string}>} faqList
 */
export function getFAQSchema(faqList) {
  if (!faqList || faqList.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────

/**
 * BreadcrumbList JSON-LD for hierarchical page indexing.
 * @param {Array<{name: string, href: string}>} items
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ─── Property / Product Schema ────────────────────────────────────────────────

export function getPropertyPageSchema(property) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title || property.projectName,
    description: property.shortDescription || property.description || "",
    url: `${SITE_URL}/valuable-properties/${property.slug || property.id}`,
    brand: {
      "@type": "Brand",
      name: "DS Group of Companies",
    },
  };

  if (property.images && property.images.length > 0) {
    schema.image = property.images[0];
  }

  if (property.price) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: property.numericPrice ? property.numericPrice * 100000 : property.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    };
  }

  return schema;
}
