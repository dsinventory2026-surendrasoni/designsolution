import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";
import { Scale, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | DS Group of Companies Gurgaon",
  description:
    "Terms of Service for DS Group of Companies — Real estate consultation, property listing terms, advisory conditions, and user agreement for property buyers and investors in Gurgaon.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | DS Group of Companies Gurgaon",
    description: "Read the user agreement and real estate consultation terms for DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in/terms-of-service",
    siteName: "DS Group of Companies",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms of Service" },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ]);

  return (
    <div
      className="min-h-screen flex flex-col text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative z-10">
        <JsonLd schema={[breadcrumbSchema].filter(Boolean)} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={breadcrumbItems} theme="light" />
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-md space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF7900] text-xs font-bold uppercase tracking-wider mb-3">
                <Scale className="w-4 h-4" />
                <span>Legal Agreement &amp; Consultation Terms</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Terms of Service
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Effective: November 2026 · DS Group of Companies, Sector 85, Gurugram
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or utilizing the digital platform of DS Group of Companies (www.dsgroupofcompanies.in), you acknowledge and agree to comply with and be bound by these Terms of Service. If you do not accept these terms, please refrain from using our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  2. Nature of Real Estate Advisory Services
                </h2>
                <p>
                  DS Group of Companies acts as an independent real estate advisory, property consultation, and sales representation firm for authorized residential, commercial, and plotted development projects across Gurugram, Haryana. We assist prospective buyers, lessees, and sellers with market valuations, property tours, developer negotiations, and transactional guidance.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  3. Accuracy of Listing Information
                </h2>
                <p>
                  While we take utmost care to ensure that all property inventory details (including carpet area, super built-up area, asking prices, floor plans, and possession dates) reflect authentic records from developers and property owners, all details are subject to physical site verification, formal agreement terms, and Haryana Real Estate Regulatory Authority (HRERA) filings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  4. Intellectual Property
                </h2>
                <p>
                  All content, branding, website architecture, research guides, and proprietary marketing materials published on this portal are the intellectual property of DS Group of Companies. Unauthorized scraping, commercial copying, or reproduction is strictly prohibited.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  5. Governing Law &amp; Jurisdiction
                </h2>
                <p>
                  These terms are governed in accordance with the laws of India. Any legal disputes arising out of the use of this portal or our real estate advisory services shall be subject to the exclusive jurisdiction of the competent courts in Gurugram, Haryana.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

