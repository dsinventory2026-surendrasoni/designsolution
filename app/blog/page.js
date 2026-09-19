import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as fallbackPosts } from "@/data/blogData";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { Clock, Calendar, ArrowRight, BookOpen, Tag } from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Real Estate Blog & Research Hub | DS Group of Companies",
  description:
    "Expert real estate guides, project reviews, investment analysis, and legal tips for Gurgaon property buyers and investors. Authored by DS Group of Companies.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/blog",
  },
  openGraph: {
    title: "Real Estate Blog & Research Hub | DS Group of Companies",
    description:
      "Expert real estate guides, project reviews, investment analysis, and legal tips for Gurgaon property buyers and investors. Authored by DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in/blog",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DS Group of Companies Blog & Research Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Blog & Research Hub | DS Group of Companies",
    description:
      "Expert real estate guides, project reviews, investment analysis, and legal tips for Gurgaon property buyers and investors. Authored by DS Group of Companies.",
    images: ["https://www.dsgroupofcompanies.in/images/logo.png"],
    creator: "@dsgroup_realty",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60; // ISR: revalidate every 60s

async function getBlogs() {
  try {
    await connectDB();
    const dbBlogs = await Blog.find({
      slug: { $exists: true, $ne: "" },
      isPublished: { $ne: false },
      publishStatus: { $ne: "Unpublished" },
    })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({
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
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs from DB, falling back to static:", error);
  }
  return fallbackPosts;
}

export default async function BlogPage() {
  const posts = await getBlogs();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog & Research Hub", href: "/blog" },
  ]);

  return (
    <div
      className="min-h-screen text-[#111827] selection:bg-[#FF7900] selection:text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Subtle Warm Orange Glow Highlights */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />
      <JsonLd schema={[breadcrumbSchema].filter(Boolean)} />

      <main className="pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-10">
            <Link href="/" className="hover:text-[#FF7900] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FF7900] font-semibold">Blog &amp; Research Hub</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Real Estate Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}>
              Gurgaon Real Estate Insights, Reviews &amp; Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In-depth market analyses, honest project reviews, legal checklists, and investment forecasts authored by DS Group&apos;s senior advisory and civil engineering team.
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] hover:border-[#FF7900]/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col"
              >
                {/* Cover Image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                  {post.heroImage ? (
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF7900] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF7900]" />
                        {post.publishedDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF7900]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] group-hover:text-[#FF7900] transition-colors mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 text-[#FF7900] flex items-center justify-center text-xs font-extrabold">
                        SS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111827]">{post.author}</div>
                        <div className="text-[10px] text-slate-500">{post.authorTitle}</div>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#FF7900] hover:text-[#F16E00] transition-colors"
                    >
                      Read Guide
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]" style={{ fontFamily: "var(--font-outfit)" }}>
              Need Personalised Real Estate Advice for Sector 85?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Connect with DS Group&apos;s senior property advisors for verified listings, legal due diligence, and exclusive resale inventory.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/917743000070?text=Hi%20DS%20Group,%20I%20read%20your%20blog%20and%20need%20property%20advice."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
              >
                WhatsApp Advisory
              </a>
              <Link
                href="/enquire"
                className="px-6 py-3 rounded-xl bg-[#FF7900] hover:bg-[#F16E00] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Book Site Visit
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
