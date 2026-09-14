import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as fallbackPosts, getPostBySlug } from "@/data/blogData";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import JsonLd from "@/components/seo/JsonLd";
import { getArticleSchema, getBreadcrumbSchema, parseIsoDate } from "@/lib/seo";
import { Clock, Calendar, ArrowRight, MessageSquare, Tag, BookOpen } from "lucide-react";

export const revalidate = 60; // ISR: revalidate every 60s

async function fetchBlogBySlug(slug) {
  try {
    await connectDB();
    const b = await Blog.findOne({
      slug,
      isPublished: { $ne: false },
      publishStatus: { $ne: "Unpublished" },
    }).lean();
    if (b) {
      return {
        id: b.id || b._id.toString(),
        slug: b.slug,
        title: b.title,
        summary: b.summary || "",
        category: b.category || "Investment Guides",
        author: b.author || "Surendra Soni",
        authorTitle: b.authorTitle || "Founder & MD, DS Group of Companies",
        publishedDate: b.publishedDate || "Recently Published",
        readTime: b.readTime || "5 min read",
        heroImage: b.heroImage || "",
        tags: b.tags || [],
        content: b.content || [],
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      };
    }
  } catch (e) {
    console.error("DB error fetching blog by slug:", e);
  }
  return getPostBySlug(slug);
}

async function fetchRelatedBlogs(currentSlug) {
  try {
    await connectDB();
    const dbBlogs = await Blog.find({
      slug: { $ne: currentSlug },
      isPublished: { $ne: false },
      publishStatus: { $ne: "Unpublished" },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({
        id: b.id || b._id.toString(),
        slug: b.slug,
        title: b.title,
        summary: b.summary || "",
        category: b.category || "Investment Guides",
        publishedDate: b.publishedDate || "Recently Published",
        readTime: b.readTime || "5 min read",
        heroImage: b.heroImage || "",
      }));
    }
  } catch (e) {
    console.error("DB error fetching related blogs:", e);
  }
  return fallbackPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const dbBlogs = await Blog.find(
      {
        slug: { $exists: true, $ne: "" },
        isPublished: { $ne: false },
        publishStatus: { $ne: "Unpublished" },
      },
      { slug: 1 }
    ).lean();
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({ slug: b.slug }));
    }
  } catch (e) {
    // fallback
  }
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | DS Group of Companies",
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | DS Group of Companies`;
  const description =
    post.summary ||
    `Read ${post.title} by DS Group of Companies. Expert real estate insights, project reviews, and property investment guidance in Gurgaon.`;
  const canonicalUrl = `https://www.dsgroupofcompanies.in/blog/${slug}`;
  const ogImage = post.heroImage || "https://www.dsgroupofcompanies.in/images/logo.png";
  const publishedTime = parseIsoDate(post.createdAt || post.publishedDate, new Date("2026-09-01T00:00:00.000Z"));
  const modifiedTime = parseIsoDate(post.updatedAt || post.publishedDate, new Date(publishedTime));

  return {
    title,
    description,
    keywords: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : ["Gurgaon Real Estate", "Sector 85 Gurgaon", "DS Group"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: "DS Group of Companies",
      locale: "en_IN",
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [post.author || "Surendra Soni"],
      tags: post.tags || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
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
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  const relatedBlogs = await fetchRelatedBlogs(slug);

  // Structured Data / JSON-LD
  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <JsonLd schema={[articleSchema, breadcrumbSchema].filter(Boolean)} />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold truncate">{post.title}</span>
          </nav>

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            {post.tags && post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-400">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}>
            {post.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 mb-8 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-bold text-sm">
                SS
              </div>
              <div>
                <div className="font-bold text-white">{post.author}</div>
                <div className="text-[11px] text-amber-400">{post.authorTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.publishedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          {post.heroImage && (
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 border border-slate-800 shadow-2xl">
              <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Summary Lead */}
          {post.summary && (
            <div className="p-6 rounded-2xl bg-slate-900 border-l-4 border-amber-400 border border-slate-800 mb-12 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {post.summary}
            </div>
          )}

          {/* Article Content Sections */}
          <div className="space-y-10 mb-16">
            {post.content && post.content.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    {section.heading}
                  </h2>
                )}
                <div className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          {/* In-Article CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/30 border border-amber-400/30 text-center space-y-4 mb-14">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Need Expert Property Advice in Sector 85 Gurgaon?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Talk directly with DS Group&apos;s senior advisors for verified prices, legal due diligence, and private site visits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/917743000070?text=Hi%20DS%20Group,%20I%20read%20your%20article%20on%20${encodeURIComponent(post.title)}%20and%20need%20property%20advice.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Advisory
              </a>
              <Link
                href="/enquire"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Book Site Visit
              </Link>
            </div>
          </div>

          {/* Related Articles Section for Internal Linking */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div className="pt-10 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Related Property Guides &amp; Market Insights</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 mb-2 block">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                        {rel.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to all articles
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
