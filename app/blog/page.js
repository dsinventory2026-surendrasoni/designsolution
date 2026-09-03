import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as fallbackPosts } from "@/data/blogData";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { Clock, Calendar, ArrowRight, BookOpen, Tag } from "lucide-react";

export const metadata = {
  title: "Real Estate Blog & Research Hub | DS Group of Companies",
  description:
    "Expert real estate guides, project reviews, investment analysis, and legal tips for Gurgaon property buyers and investors. Authored by DS Group of Companies.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/blog",
  },
};

export const revalidate = 60; // ISR: revalidate every 60s

async function getBlogs() {
  try {
    await connectDB();
    const dbBlogs = await Blog.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-10">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Blog &amp; Research Hub</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Real Estate Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}>
              Gurgaon Real Estate Insights, Reviews &amp; Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In-depth market analyses, honest project reviews, legal checklists, and investment forecasts authored by DS Group&apos;s senior advisory and civil engineering team.
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all group shadow-xl hover:-translate-y-1 flex flex-col"
              >
                {/* Cover Image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-800 relative">
                  {post.heroImage ? (
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishedDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-5">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-400">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center text-xs font-extrabold">
                        SS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{post.author}</div>
                        <div className="text-[10px] text-slate-500">{post.authorTitle}</div>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
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
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/30 border border-slate-800 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Need Personalised Real Estate Advice for Sector 85?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Connect with DS Group&apos;s senior property advisors for verified listings, legal due diligence, and exclusive resale inventory.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/917743000070?text=Hi%20DS%20Group,%20I%20read%20your%20blog%20and%20need%20property%20advice."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
              >
                WhatsApp Advisory
              </a>
              <Link
                href="/enquire"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
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
