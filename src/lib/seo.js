/**
 * SEO Utilities — DS Group of Companies
 * Centralized helpers for metadata generation and JSON-LD structured data.
 *
 * Usage:
 *   import { SITE_URL, buildMetadata, getOrganizationSchema } from "@/lib/seo";
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
      },
    },
  };
}

// ─── Organization Schema ──────────────────────────────────────────────────────

/**
 * Organization JSON-LD schema for DS Group of Companies.
 * Uses only verified, real data from siteConfig.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DS Group of Companies",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 400,
      height: 200,
    },
    description:
      "DS Group of Companies is a premier real estate developer in Gurugram offering luxury residential apartments, Grade-A commercial spaces, freehold plots, and turnkey construction services.",
    telephone: "+917743000070",
    email: "info@dsgroupofcompanies.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    // Include only social profiles that genuinely match the business
    sameAs: [
      "https://instagram.com/dsgroup_official",
      "https://facebook.com/dsgroupofcompanies",
      "https://x.com/dsgroup_realty",
      "https://linkedin.com/company/ds-group-of-companies",
    ],
  };
}

// ─── LocalBusiness Schema ─────────────────────────────────────────────────────

/**
 * LocalBusiness (RealEstateAgent) JSON-LD for local SEO.
 * Targets Gurugram / Gurgaon real estate searches.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "DS Group of Companies",
    image: `${SITE_URL}/images/logo.png`,
    url: SITE_URL,
    telephone: "+917743000070",
    priceRange: "₹₹₹",
    description:
      "Trusted real estate company in Gurugram specializing in residential apartments, commercial office spaces, freehold plots, and construction services in Sector 85 and surrounding areas.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:30",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "City",
        name: "Gurgaon",
      },
    ],
    hasMap: "https://www.google.com/maps/search/DS+Group+of+Companies+Sector+85+Gurugram",
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// ─── WebSite Schema ───────────────────────────────────────────────────────────

/**
 * WebSite JSON-LD with SearchAction for sitelinks search box potential.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "DS Group of Companies",
    url: SITE_URL,
    description:
      "Official website of DS Group of Companies — premium real estate developer in Gurugram, Haryana.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────

/**
 * BreadcrumbList JSON-LD for deeper pages.
 *
 * @param {Array<{name: string, href: string}>} items - Ordered breadcrumb list
 * @returns JSON-LD object
 *
 * @example
 * getBreadcrumbSchema([
 *   { name: "Home", href: "/" },
 *   { name: "Valuable Properties", href: "/valuable-properties" },
 *   { name: "DS Crown", href: "/valuable-properties/ds-crown" },
 * ])
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

// ─── Property / Real Estate Schema ───────────────────────────────────────────

/**
 * Generate a basic Property-related schema for a property listing page.
 * Uses only data that is genuinely available on the page.
 *
 * @param {Object} property - Property object from MongoDB
 * @returns JSON-LD object
 */
export function getPropertyPageSchema(property) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.projectName,
    description: property.shortDescription || property.fullDescription || "",
    url: `${SITE_URL}/valuable-properties/${property.slug}`,
    brand: {
      "@type": "Brand",
      name: "DS Group of Companies",
    },
  };

  if (property.heroBanner || property.thumbnail) {
    schema.image = property.heroBanner || property.thumbnail;
  }

  if (property.price) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: property.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    };
  }

  return schema;
}
