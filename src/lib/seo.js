/**
 * SEO Utilities — DS Group of Companies
 * Centralized helpers for metadata generation and JSON-LD structured data.
 *
 * Usage:
 *   import { SITE_URL, buildMetadata, cleanObject, getOrganizationSchema, getLocalBusinessSchema, getWebSiteSchema, getFAQSchema, getBreadcrumbSchema, getPropertyPageSchema } from "@/lib/seo";
 */

// ─── Constants ────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.dsgroupofcompanies.in";
export const SITE_NAME = "DS Group of Companies";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

// ─── Safe Object Cleaner Helper ───────────────────────────────────────────────

/**
 * Recursively cleans an object, array, or primitive:
 * - Removes null
 * - Removes undefined
 * - Removes empty strings ("" or whitespace only)
 * - Removes empty arrays ([])
 * - Removes empty objects ({})
 * - Preserves numbers (including 0) and booleans (true, false)
 *
 * Guarantees that the resulting structure contains only valid, populated Schema.org data.
 *
 * @param {any} obj - Target object, array, or primitive
 * @returns {any} Cleaned object, or undefined if empty/falsy
 */
export function cleanObject(obj) {
  if (obj === null || obj === undefined) return undefined;

  if (typeof obj === "string") {
    const trimmed = obj.trim();
    return trimmed === "" ? undefined : trimmed;
  }

  if (typeof obj === "number") {
    return isNaN(obj) ? undefined : obj;
  }

  if (typeof obj === "boolean") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cleanedArr = obj
      .map((item) => cleanObject(item))
      .filter((item) => {
        if (item === undefined || item === null) return false;
        if (typeof item === "string" && item === "") return false;
        if (Array.isArray(item) && item.length === 0) return false;
        if (typeof item === "object" && Object.keys(item).length === 0) return false;
        return true;
      });
    return cleanedArr.length > 0 ? cleanedArr : undefined;
  }

  if (typeof obj === "object") {
    const cleanedObj = {};
    for (const [key, val] of Object.entries(obj)) {
      const cleanedVal = cleanObject(val);
      if (
        cleanedVal !== undefined &&
        cleanedVal !== null &&
        !(typeof cleanedVal === "string" && cleanedVal === "") &&
        !(Array.isArray(cleanedVal) && cleanedVal.length === 0) &&
        !(typeof cleanedVal === "object" && Object.keys(cleanedVal).length === 0)
      ) {
        cleanedObj[key] = cleanedVal;
      }
    }
    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }

  return undefined;
}

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
 * Conforms to Schema.org/Organization and Google Rich Results guidelines.
 */
export function getOrganizationSchema() {
  return (
    cleanObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        "DS Group",
        "DS Group Properties",
        "DS Group Real Estate",
        "DS Group Realty",
        "DS Group Gurugram",
        "DS Group Gurgaon",
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
        jobTitle: "Founder & Managing Director",
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
        "https://youtube.com/@dsgrouprealty",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+917743000070",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    }) || null
  );
}

// ─── LocalBusiness Schema ─────────────────────────────────────────────────────

/**
 * LocalBusiness (RealEstateAgent) JSON-LD for Local SEO.
 * Conforms to Schema.org/RealEstateAgent and Google Rich Results guidelines.
 */
export function getLocalBusinessSchema() {
  return (
    cleanObject({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "DS Group of Companies - Real Estate Consultant & Property Finder",
      alternateName: [
        "DS Group Property Dealer Gurgaon",
        "DS Group Real Estate Consultant Sector 85",
        "Property Finder Sector 85 Gurgaon",
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
        longitude: 76.9696,
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
        },
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
        { "@type": "City", name: "Gurgaon" },
      ],
      hasMap: "https://www.google.com/maps/search/DS+Group+of+Companies+Sector+85+Gurugram",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Cheque, Bank Transfer, Demand Draft",
      parentOrganization: {
        "@type": "Organization",
        name: SITE_NAME,
        "@id": `${SITE_URL}/#organization`,
      },
    }) || null
  );
}

// ─── WebSite Schema ───────────────────────────────────────────────────────────

/**
 * WebSite JSON-LD Schema.
 * SearchAction is intentionally omitted because no real /search query endpoint exists.
 */
export function getWebSiteSchema() {
  return (
    cleanObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: "DS Group Real Estate Gurugram",
      url: SITE_URL,
      description:
        "Official website of DS Group of Companies — Premier luxury real estate developer and property consultant in Sector 85 Gurgaon.",
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        "@id": `${SITE_URL}/#organization`,
      },
    }) || null
  );
}

// ─── FAQPage Schema ───────────────────────────────────────────────────────────

/**
 * Generates clean FAQPage JSON-LD for rich snippet rankings in Google search results.
 * Sanitizes questions & answers, filters empty/corrupt entries, and returns null if empty.
 *
 * @param {Array<{question?: string, name?: string, answer?: string, text?: string}>} faqList
 * @returns {object|null}
 */
export function getFAQSchema(faqList) {
  if (!Array.isArray(faqList) || faqList.length === 0) return null;

  const validQuestions = faqList
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const rawQ = item.question || item.name;
      const rawA = item.answer || item.text || (item.acceptedAnswer && item.acceptedAnswer.text);

      const question = typeof rawQ === "string" ? rawQ.trim() : "";
      const answer = typeof rawA === "string" ? rawA.trim() : "";

      if (!question || !answer) return null;

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    })
    .filter(Boolean);

  if (validQuestions.length === 0) return null;

  return (
    cleanObject({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validQuestions,
    }) || null
  );
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────

/**
 * BreadcrumbList JSON-LD for hierarchical page indexing.
 * Sanitizes items, constructs valid absolute URLs, re-indexes positions, and returns null if empty.
 *
 * @param {Array<{name: string, href?: string, url?: string}>} items
 * @returns {object|null}
 */
export function getBreadcrumbSchema(items) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const validItems = items
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const rawHref = item.href || item.url || item.item;
      const href = typeof rawHref === "string" ? rawHref.trim() : "";

      if (!name || !href) return null;

      const url =
        href.startsWith("http://") || href.startsWith("https://")
          ? href
          : `${SITE_URL}${href.startsWith("/") ? "" : "/"}${href}`;

      return {
        name,
        url,
      };
    })
    .filter(Boolean);

  if (validItems.length === 0) return null;

  return (
    cleanObject({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: validItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }) || null
  );
}

// ─── Property / Product Schema ────────────────────────────────────────────────

/**
 * Generates valid Product schema for a valuable property listing.
 * Strictly validates image, numeric price, currency, and seller details.
 *
 * @param {object} property
 * @returns {object|null}
 */
export function getPropertyPageSchema(property) {
  if (!property || typeof property !== "object") return null;

  const name = (property.title || property.projectName || "").trim();
  if (!name) return null;

  const description = (
    property.shortDescription ||
    property.description ||
    `${name} - Luxury Property by DS Group of Companies in Gurugram`
  ).trim();

  const slug = property.slug || property.id;
  const url = slug ? `${SITE_URL}/valuable-properties/${slug}` : SITE_URL;

  // Validate images
  let image = undefined;
  if (Array.isArray(property.images) && property.images.length > 0) {
    const validImages = property.images.filter(
      (img) => typeof img === "string" && img.trim().length > 0
    );
    if (validImages.length === 1) image = validImages[0].trim();
    else if (validImages.length > 1) image = validImages.map((img) => img.trim());
  }
  if (!image && typeof property.heroBanner === "string" && property.heroBanner.trim()) {
    image = property.heroBanner.trim();
  }
  if (!image && typeof property.thumbnail === "string" && property.thumbnail.trim()) {
    image = property.thumbnail.trim();
  }
  if (!image) {
    image = DEFAULT_OG_IMAGE;
  }

  // Parse valid numeric price (Google requires number/valid numeric string)
  let priceNumber = undefined;
  if (typeof property.numericPrice === "number" && property.numericPrice > 0) {
    priceNumber =
      property.numericPrice < 10000 ? property.numericPrice * 100000 : property.numericPrice;
  } else if (
    typeof property.numericPrice === "string" &&
    !isNaN(parseFloat(property.numericPrice))
  ) {
    const num = parseFloat(property.numericPrice);
    if (num > 0) {
      priceNumber = num < 10000 ? num * 100000 : num;
    }
  } else if (typeof property.price === "number" && property.price > 0) {
    priceNumber = property.price;
  } else if (typeof property.price === "string") {
    const lower = property.price.toLowerCase().replace(/,/g, "");
    const matchCr = lower.match(/([\d.]+)\s*(?:cr|crore)/);
    const matchLakh = lower.match(/([\d.]+)\s*(?:lac|lakh)/);
    const matchDigits = lower.replace(/[^\d.]/g, "");

    if (matchCr) {
      priceNumber = Math.round(parseFloat(matchCr[1]) * 10000000);
    } else if (matchLakh) {
      priceNumber = Math.round(parseFloat(matchLakh[1]) * 100000);
    } else if (matchDigits && !isNaN(parseFloat(matchDigits))) {
      const val = parseFloat(matchDigits);
      if (val > 0) priceNumber = val;
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    image,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };

  if (priceNumber && priceNumber > 0) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: priceNumber,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        "@id": `${SITE_URL}/#organization`,
      },
    };
  }

  return cleanObject(schema) || null;
}
