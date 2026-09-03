import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as fallbackPosts, getPostBySlug } from "@/data/blogData";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { Clock, Calendar, ArrowRight, MessageSquare, Tag } from "lucide-react";

export const revalidate = 60; // ISR

async function fetchBlogBySlug(slug) {
  try {
    await connectDB();
    const b = await Blog.findOne({ slug, isPublished: true }).lean();
    if (b) {
      return {
        id: b.id || b._id.toString(),
        slug: b.slug,
        title: b.title,
        summary: b.summary,
        category: b.category,
        author: b.author || "Surendra Soni",
        authorTitle: b.authorTitle || "Founder & MD, DS Group of Companies",
        publishedDate: b.publishedDate || "Recently Published",
        readTime: b.readTime || "5 min read",
        heroImage: b.heroImage || "",
        tags: b.tags || [],
        content: b.content || [],
      };
    }
  } catch (e) {
    console.error("DB error fetching blog by slug:", e);
  }
  return getPostBySlug(slug);
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const dbBlogs = await Blog.find({ isPublished: true }, { slug: 1 }).lean();
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({ slug: b.slug }));
    }
  } catch (e) {
    // fallback
  }
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: "Post Not Found | DS Group" };
  return {
    title: `${post.title} | DS Group of Companies`,
    description: post.summary,
    alternates: { canonical: `https://www.dsgroupofcompanies.in/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.heroImage ? [{ url: post.heroImage, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  // Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.heroImage || "https://www.dsgroupofcompanies.in/images/logo.png",
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
      worksFor: { "@type": "Organization", name: "DS Group of Companies" },
    },
    publisher: {
      "@type": "Organization",
      name: "DS Group of Companies",
      url: "https://www.dsgroupofcompanies.in",
    },
    datePublished: post.publishedDate,
    mainEntityOfPage: `https://www.dsgroupofcompanies.in/blog/${slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema]) }}
      />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 flex-wrap">
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
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/30 border border-amber-400/30 text-center space-y-4">
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

          {/* Back to Blog */}
          <div className="mt-10 text-center">
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
