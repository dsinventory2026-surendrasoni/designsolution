import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DS Group of Companies Gurgaon",
  description:
    "Privacy Policy of DS Group of Companies — Learn how we collect, protect, and handle your property enquiry and personal information in accordance with Indian data protection laws.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | DS Group of Companies Gurgaon",
    description: "Learn how DS Group of Companies safeguards your personal and property enquiry information.",
    url: "https://www.dsgroupofcompanies.in/privacy-policy",
    siteName: "DS Group of Companies",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy-policy" },
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
                <ShieldCheck className="w-4 h-4" />
                <span>Data Protection &amp; Confidentiality</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Last Updated: November 2026 · DS Group of Companies, Sector 85, Gurugram
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  1. Information We Collect
                </h2>
                <p>
                  At DS Group of Companies (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy. When you submit an enquiry form, schedule a site visit, or contact us via WhatsApp or phone, we may collect:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Full Name and contact phone number / WhatsApp number.</li>
                  <li>Email address and residential city/state.</li>
                  <li>Property preferences: budget, preferred sectors (e.g. Sector 85, New Gurgaon, Dwarka Expressway), BHK configuration, and investment objectives.</li>
                  <li>Anonymous technical metadata (browser type, IP address, device telemetry) for performance diagnostics.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  2. Purpose &amp; Usage of Data
                </h2>
                <p>
                  Your information is utilized strictly to provide property consultation, coordinate authorized developer site visits, deliver authentic pricing updates, and assist with property transaction documentation. We do <strong>not</strong> sell, lease, or distribute your contact details to third-party marketing brokers or unsolicited advertisers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  3. Data Security &amp; Storage
                </h2>
                <p>
                  Enquiries received through our web forms are securely transmitted using TLS encryption, stored in access-controlled databases, and forwarded to our official desk at{" "}
                  <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">dsinventory2026@gmail.com</code>. Physical and electronic safeguards are maintained to protect against unauthorized access or disclosure.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  4. Your Privacy Rights
                </h2>
                <p>
                  Under applicable Indian data protection regulations (including the Digital Personal Data Protection Act, 2023), you have the right to request access to your stored enquiry information, request correction of any inaccurate details, or ask us to delete your contact information from our active consultation registry.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  5. Contacting Our Privacy Officer
                </h2>
                <p className="text-xs sm:text-sm">
                  For privacy queries or data removal requests, please write to our Head Office:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">DS Group of Companies</div>
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

