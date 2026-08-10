/**
 * Breadcrumbs — Visible semantic breadcrumb navigation component
 *
 * Renders both the visible UI breadcrumb trail AND can be paired
 * with BreadcrumbList JSON-LD from src/lib/seo.js.
 *
 * Usage:
 *   import Breadcrumbs from "@/components/seo/Breadcrumbs";
 *
 *   <Breadcrumbs
 *     items={[
 *       { label: "Home", href: "/" },
 *       { label: "Properties", href: "/valuable-properties" },
 *       { label: "DS Crown Heights" }, // no href = current page (no link)
 *     ]}
 *   />
 *
 * @param {Array<{label: string, href?: string}>} items
 * @param {"dark"|"light"} theme - "dark" for navy sections, "light" for white sections
 */
export default function Breadcrumbs({ items = [], theme = "dark" }) {
  if (!items || items.length === 0) return null;

  const textColor = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const activeColor = theme === "dark" ? "text-amber-400" : "text-amber-600";
  const linkHover = theme === "dark" ? "hover:text-white" : "hover:text-slate-900";
  const separatorColor = theme === "dark" ? "text-slate-600" : "text-slate-300";

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol
        className={`flex items-center flex-wrap gap-1.5 text-xs font-medium ${textColor}`}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <span className={`${separatorColor} select-none`} aria-hidden="true">
                  /
                </span>
              )}

              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={`transition-colors duration-150 ${linkHover}`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span
                  className={isLast ? activeColor : ""}
                  aria-current={isLast ? "page" : undefined}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
