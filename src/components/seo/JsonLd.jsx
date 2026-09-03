/**
 * JsonLd — Reusable JSON-LD Structured Data Injector for Next.js App Router
 *
 * Guarantees:
 * 1. Never outputs null, undefined, false, or empty objects
 * 2. Filters out falsy values and invalid schema inputs
 * 3. Recursively scrubs nulls, empty strings, and empty arrays via cleanObject
 * 4. Returns null (renders nothing) if the schema array is or becomes empty
 * 5. Prevents rendering invalid ld+json scripts or top-level "null"
 * 6. XSS-safe serialization replacing '<' with '\u003c'
 *
 * Usage:
 *   import JsonLd from "@/components/seo/JsonLd";
 *   <JsonLd schema={[schema1, schema2].filter(Boolean)} />
 */

import { cleanObject } from "@/lib/seo";

export default function JsonLd({ schema }) {
  if (!schema) return null;

  // Flatten nested arrays and wrap single objects
  const rawList = Array.isArray(schema) ? schema.flat(Infinity) : [schema];

  // Clean each schema object and filter out empty or invalid items
  const validSchemas = rawList
    .filter(Boolean)
    .map((item) => (item && typeof item === "object" ? cleanObject(item) : null))
    .filter(
      (item) =>
        Boolean(item) &&
        typeof item === "object" &&
        Object.keys(item).length > 0 &&
        Boolean(item["@type"])
    );

  // If no valid schemas remain, render nothing to avoid invalid script tags
  if (!validSchemas.length) return null;

  return (
    <>
      {validSchemas.map((item, index) => (
        <script
          key={item["@id"] || item["@type"] || index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
