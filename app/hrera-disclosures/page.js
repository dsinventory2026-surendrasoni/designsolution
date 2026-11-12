import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";
import { Award, ShieldAlert, CheckCircle2, FileCheck } from "lucide-react";

export const metadata = {
  title: "HRERA Compliance & Disclosures | DS Group of Companies Gurgaon",
  description:
    "Official HRERA compliance statement, real estate agent disclosures, and consumer regulatory advisory for property buyers and investors in Gurugram by DS Group of Companies.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/hrera-disclosures",
  },
  openGraph: {
    title: "HRERA Compliance & Disclosures | DS Group of Companies Gurgaon",
    description: "Read official HRERA regulatory disclosures and consumer guidance from DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in/hrera-disclosures",
    siteName: "DS Group of Companies",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HreraDisclosuresPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "HRERA Disclosures" },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HRERA Disclosures", href: "/hrera-disclosures" },
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Regulatory Standards · Haryana RERA</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                HRERA Regulatory Disclosures
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Real Estate (Regulation and Development) Act, 2016 Compliance · Gurugram, Haryana
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  1. RERA Regulatory Commitment
                </h2>
                <p>
                  DS Group of Companies firmly supports and operates under the framework established by the <strong>Real Estate (Regulation and Development) Act, 2016</strong> and the <strong>Haryana Real Estate Regulatory Authority (HRERA)</strong>. We promote transparency, consumer empowerment, and ethical accountability across every residential, commercial, and plotted transaction.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  2. Project Registration Verification
                </h2>
                <p>
                  Prospective buyers and investors are advised that all commercial and residential projects promoted or consulted upon by our advisory team are required to possess valid HRERA registration numbers, except where exempted under the Act. Official RERA numbers, building sanctions, and project approvals can be independently verified on the official portal:{" "}
                  <a
                    href="https://haryanarera.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF7900] font-bold underline hover:text-[#F16E00]"
                  >
                    haryanarera.gov.in
                  </a>.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  3. Standard Consumer Guidance
                </h2>
                <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <FileCheck className="w-4 h-4 text-[#FF7900]" />
                    <span>Important Advisory for Prospective Property Buyers:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    <li>Always verify the HRERA certificate and sanctioned layout plans before executing booking agreements.</li>
                    <li>Inspect the developer&apos;s escrow bank account details registered with HRERA.</li>
                    <li>Ensure payment schedules align with verified construction milestone certifications.</li>
                    <li>Verify title search reports and occupancy certificates (OC) for ready-to-move secondary properties.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  4. Professional Assistance &amp; RERA Consultations
                </h2>
                <p>
                  Our senior consulting team assists clients with thorough document scrutiny, RERA certificate verification, and builder agreement reviews. Reach our advisory desk at:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">DS Group of Companies — Compliance Desk</div>
                  <div>Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District, Gurugram, Haryana - 122004</div>
                  <div>Phone: +91 77430 00070 · Email: dsinventory2026@gmail.com</div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

