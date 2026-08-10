/**
 * JsonLd — Reusable JSON-LD Structured Data Injector
 *
 * Usage (Server Component):
 *   import JsonLd from "@/components/seo/JsonLd";
 *   import { getOrganizationSchema } from "@/lib/seo";
 *
 *   <JsonLd schema={getOrganizationSchema()} />
 *
 * Or multiple schemas:
 *   <JsonLd schema={[schema1, schema2]} />
 */
export default function JsonLd({ schema }) {
  const data = Array.isArray(schema)
    ? schema
    : [schema];

  return (
    <>
      {data.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
