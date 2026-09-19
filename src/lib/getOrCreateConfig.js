// lib/getOrCreateConfig.js
// Shared helper to get or auto-create SiteConfig document

import SiteConfig from "@/lib/models/SiteConfig";
import { siteConfig as staticConfig } from "@/data/siteConfig";

const defaultEmployees = [
  {
    id: "emp-1",
    name: "Rajesh Varma",
    designation: "Chief Operating Officer (COO)",
    department: "Leadership",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Oversees end-to-end project execution, supply chain management, and on-site construction quality across all active DS Group developments in Gurgaon.",
    experience: "16+ Years",
    phone: "+91 98123 45671",
    email: "rajesh.varma@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/rajesh-varma",
    skills: ["Project Lifecycle", "EPC Operations", "Quality Audit"],
    priority: 1,
  },
  {
    id: "emp-2",
    name: "Priya Sharma",
    designation: "Head of Sales & Client Relations",
    department: "Residential",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Leads a team of 15+ property advisors, driving luxury residential acquisition, CRM excellence, and post-sale relationship management for DS Group.",
    experience: "11+ Years",
    phone: "+91 98123 45672",
    email: "priya.sharma@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/priya-sharma",
    skills: ["Luxury Portfolios", "Investor Relations", "CRM Strategy"],
    priority: 2,
  },
  {
    id: "emp-3",
    name: "Aditya Kapoor",
    designation: "Lead Structural Engineer",
    department: "Architecture & Construction",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "14 years of structural engineering expertise. Ensures every DS Group high-rise and commercial landmark exceeds BIS, NBC, and seismic Zone-IV standards.",
    experience: "14+ Years",
    phone: "+91 98123 45673",
    email: "aditya.kapoor@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/aditya-kapoor",
    skills: ["High-rise Structural Design", "Seismic Safety", "BIM"],
    priority: 3,
  },
  {
    id: "emp-4",
    name: "Sneha Verma",
    designation: "Principal Interior Architect",
    department: "Architecture & Construction",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Award-winning interior architect crafting bespoke residences and corporate environments fusing contemporary luxury with spatial ergonomics.",
    experience: "9+ Years",
    phone: "+91 98123 45674",
    email: "sneha.verma@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/sneha-verma",
    skills: ["Luxury Interior Fitouts", "Spatial Planning", "Lighting Design"],
    priority: 4,
  },
  {
    id: "emp-5",
    name: "Vikram Anand",
    designation: "Head of Legal & Compliance",
    department: "Legal & Liaison",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Ensures 100% legal clarity on all DS Group property deals — from HRERA registration and title deed clearance to municipal sanction approvals.",
    experience: "15+ Years",
    phone: "+91 98123 45675",
    email: "vikram.anand@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/vikram-anand",
    skills: ["HRERA Advisory", "Title Clearance", "Corporate Law"],
    priority: 5,
  },
  {
    id: "emp-6",
    name: "Kavita Joshi",
    designation: "Finance & Commercial Investment Head",
    department: "Commercial",
    photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=400&q=80",
    bio: "Manages corporate real estate portfolios, institutional leasing, ROI modelling, and high-yield commercial investment structures for clients.",
    experience: "12+ Years",
    phone: "+91 98123 45676",
    email: "kavita.joshi@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/kavita-joshi",
    skills: ["Commercial ROI Modeling", "Leasing Strategy", "REITs"],
    priority: 6,
  },
  {
    id: "emp-7",
    name: "Arjun Singh",
    designation: "Digital Marketing & Brand Strategist",
    department: "Marketing",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Drives DS Group's high-visibility digital footprint across Google search, social networks, and targeted real estate discovery campaigns.",
    experience: "8+ Years",
    phone: "+91 98123 45677",
    email: "arjun.singh@dsgroupofcompanies.com",
    linkedin: "https://linkedin.com/in/arjun-singh",
    skills: ["Real Estate SEO", "Performance Marketing", "Brand Identity"],
    priority: 7,
  },
];

const defaultAbout = {
  companyDetails: {
    heroHeading: "Building Trust. Creating Landmarks. Delivering Value Since 2008.",
    heroSubheading: "Discover the story, mission, credentials, and milestones of DS Group of Companies — Gurugram's most trusted real estate developer.",
    story: "Founded with an uncompromising ambition to reshape the National Capital Region's architectural horizon, DS Group of Companies has emerged as Gurugram's preeminent developer and real estate advisory firm. Headquartered in the prime growth epicentre of Sector 85, we orchestrate landmark residential complexes, Grade-A commercial towers, approved freehold plot communities, and end-to-end turnkey construction with absolute transparency, statutory compliance, and engineering mastery.",
    mission: "To engineer iconic living and business destinations that deliver generational wealth, uncompromised structural integrity, and world-class luxury while maintaining 100% legal transparency and ethical advisory for every client.",
    vision: "To be India's most trusted, tech-enabled real estate conglomerate, setting gold standards in sustainable construction, customer satisfaction, and architectural innovation.",
    establishedYear: 2008,
    headquarters: "Sector 85, Gurugram, Haryana 122004",
    reraRegistration: "HRERA-PKL-GGM-1234-2024",
    cinNumber: "U70109HR2014PTC053210",
    phone: "+91 77430 00070",
    email: "info@dsgroupofcompanies.com",
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment",
    timeline: [
      { year: "2008", event: "Company Founded", desc: "DS Group established in Gurugram with a vision to redefine real estate." },
      { year: "2012", event: "First Residential Development", desc: "Landmark residential project launched in Sector 85, setting quality benchmarks." },
      { year: "2016", event: "Commercial Expansion", desc: "Entry into Grade-A commercial spaces along Dwarka Expressway." },
      { year: "2020", event: "Turnkey Construction Division", desc: "In-house EPC division launched for end-to-end construction delivery." },
      { year: "2024", event: "Multi-Sector Presence", desc: "Comprehensive portfolio spanning residential, commercial, and plotted developments." },
    ],
    stats: [
      { label: "Projects Delivered", value: "25+" },
      { label: "Happy Families", value: "500+" },
      { label: "Years Experience", value: "15+" },
      { label: "Regulatory Compliance", value: "100%" },
    ],
    highlights: [
      { title: "Transparent Transactions", description: "Every deal is documented, escrow-protected, and fully RERA compliant." },
      { title: "RERA Compliant Projects", description: "100% HRERA registered projects ensuring buyer protection and legal clarity." },
      { title: "Prime Locations", description: "Projects along Dwarka Expressway and Southern Peripheral Road — NCR's growth corridor." },
      { title: "Construction Excellence", description: "ISO-grade construction standards with in-house structural engineering teams." },
      { title: "Customer Support", description: "Dedicated relationship managers from booking to possession and beyond." },
      { title: "Long-Term Value Creation", description: "Locations and asset classes curated for consistent capital appreciation." },
    ],
    coreValues: [
      { title: "Integrity", description: "Every transaction backed by full documentation and zero hidden clauses." },
      { title: "Transparency", description: "Escrow-protected bookings, RERA IDs visible on every project collateral." },
      { title: "Quality", description: "ISO-grade materials, seismic-safe structures, luxury-finish standards." },
      { title: "Innovation", description: "PropTech integrations, virtual tours, and digital CRM for modern buyers." },
      { title: "Customer First", description: "Relationship-led advisory — your satisfaction defines our success." },
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"
    ],
    seoKeywords: [
      "DS Group of Companies",
      "Real Estate Developer Sector 85 Gurgaon",
      "Surendra Soni real estate",
      "Luxury flats Sector 85 Gurugram",
      "Commercial property Dwarka Expressway",
      "Freehold plots Gurgaon",
      "Turnkey construction Gurgaon",
      "Best property consultant Gurugram",
      "DS Group team employees",
      "HRERA registered projects Gurgaon"
    ],
    metaTitle: "About DS Group of Companies | Real Estate Developer Sector 85 Gurgaon",
    metaDescription: "Discover DS Group of Companies — Premier real estate developer, construction firm & property consultants in Sector 85 Gurugram. Founded by Surendra Soni. Explore company profile, leadership, and team directory.",
  },
  ownerDetails: {
    heroHeading: "Architect of Legacies, Pioneer of Trust",
    heroSubtitle: "Meet Surendra Soni — visionary founder and managing director steering DS Group of Companies across Gurugram’s most transformative real estate developments.",
    name: "Surendra Soni",
    designation: "Founder & Managing Director",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: "Surendra Soni is a visionary entrepreneur and real estate strategist with over 18 years of pioneering leadership in North India's property development sector. Under his stewardship, DS Group of Companies has transformed from a boutique advisory firm into a multi-vertical real estate powerhouse delivering ultra-luxury residential towers, high-street retail galleries, approved plotted developments, and industrial EPC contracts.",
    quote: "True luxury is not defined by ornate facades, but by uncompromised structural integrity, absolute legal transparency, and the peace of mind that comes from knowing your investment is built to endure for generations.",
    experienceYears: "18+ Years",
    phone: "+91 77430 00070",
    email: "surendra@dsgroupofcompanies.com",
    whatsapp: "+91 77430 00070",
    linkedin: "https://linkedin.com/in/surendra-soni",
    achievements: [
      { title: "Real Estate Excellence Award", year: "2024", description: "Recognized for outstanding contribution to luxury housing developments in New Gurugram." },
      { title: "NAREDCO Advisory Member", year: "2022", description: "Active contributor to regional real estate policy frameworks and builder-buyer trust models." },
      { title: "HRERA Transparency Standard", year: "2020", description: "First batch of developers in Sector 85 to receive early compliance accreditation." }
    ],
  },
  employees: defaultEmployees,
};

export async function getOrCreateConfig() {
  let config = await SiteConfig.findOne();
  if (!config) {
    config = await SiteConfig.create({
      hero: {
        headline: "Crafting Iconic Spaces & Timeless Luxury",
        subheadline:
          "Pioneering premier residential residences, commercial landmarks, and turnkey architectural construction with 18+ years of uncompromised excellence.",
        eyebrowBadge: "DS GROUP OF COMPANIES",
        primaryBtnText: "Explore Portfolio",
        primaryBtnLink: "#portfolio",
        secondaryBtnText: "Contact Our Experts",
        videoUrl: "/videos/hero-bg.mp4",
        trustBadges: [
          { label: "18+ Years Excellence" },
          { label: "45+ Projects Delivered" },
          { label: "3200+ Happy Families" },
        ],
      },
      brand: {
        name: staticConfig.brand.name,
        shortName: staticConfig.brand.shortName,
        tagline: staticConfig.brand.tagline,
        subtitle: staticConfig.brand.subtitle,
        establishedYear: staticConfig.brand.establishedYear,
        logoText: staticConfig.brand.logoText,
        logoSubtext: staticConfig.brand.logoSubtext,
        logoUrl: staticConfig.brand.logoUrl,
        footerTagline:
          "Transforming land into iconic living spaces and corporate destinations with engineering excellence.",
        copyrightText: "",
      },
      contact: {
        whatsappNumber: staticConfig.contact.whatsappNumber,
        whatsappFormatted: staticConfig.contact.whatsappFormatted,
        whatsappLink: staticConfig.contact.whatsappLink,
        phonePrimary: staticConfig.contact.phonePrimary,
        phoneSecondary: staticConfig.contact.phoneSecondary,
        emailPrimary: staticConfig.contact.emailPrimary,
        emailSales: staticConfig.contact.emailSales,
        addressPlot: staticConfig.contact.address.plot,
        addressTower: staticConfig.contact.address.tower,
        addressFloor: staticConfig.contact.address.floor,
        addressCity: staticConfig.contact.address.city,
        addressState: staticConfig.contact.address.state,
        addressPincode: staticConfig.contact.address.pincode,
        addressCountry: staticConfig.contact.address.country,
        workingHours: staticConfig.contact.workingHours,
        googleMapEmbedUrl: staticConfig.googleMapEmbedUrl || "",
      },
      owner: {
        name: staticConfig.owner.name,
        designation: staticConfig.owner.designation,
        photo: staticConfig.owner.photo,
        bio: staticConfig.owner.bio,
        quote: staticConfig.owner.quote,
        stats: staticConfig.owner.stats,
      },
      socialLinks: {
        instagram: staticConfig.socialLinks.instagram,
        facebook: staticConfig.socialLinks.facebook,
        whatsapp: staticConfig.socialLinks.whatsapp,
        twitter: staticConfig.socialLinks.twitter,
        linkedin: staticConfig.socialLinks.linkedin,
        youtube: staticConfig.socialLinks.youtube,
      },
      services: staticConfig.services,
      about: defaultAbout,
    });
  } else {
    // If config exists but about subdocument is not yet initialized or has missing fields
    let needsSave = false;
    if (!config.about || !config.about.companyDetails || !config.about.companyDetails.story) {
      config.about = defaultAbout;
      needsSave = true;
    } else {
      if (!config.about.companyDetails.timeline || config.about.companyDetails.timeline.length === 0) {
        config.about.companyDetails.timeline = defaultAbout.companyDetails.timeline;
        needsSave = true;
      }
      if (!config.about.companyDetails.stats || config.about.companyDetails.stats.length === 0) {
        config.about.companyDetails.stats = defaultAbout.companyDetails.stats;
        needsSave = true;
      }
      if (!config.about.companyDetails.highlights || config.about.companyDetails.highlights.length === 0) {
        config.about.companyDetails.highlights = defaultAbout.companyDetails.highlights;
        needsSave = true;
      }
      if (!config.about.companyDetails.coreValues || config.about.companyDetails.coreValues.length === 0) {
        config.about.companyDetails.coreValues = defaultAbout.companyDetails.coreValues;
        needsSave = true;
      }
      if (!config.about.companyDetails.heroHeading) {
        config.about.companyDetails.heroHeading = defaultAbout.companyDetails.heroHeading;
        needsSave = true;
      }
      if (!config.about.companyDetails.heroSubheading) {
        config.about.companyDetails.heroSubheading = defaultAbout.companyDetails.heroSubheading;
        needsSave = true;
      }
      if (!config.about.ownerDetails?.heroHeading) {
        if (!config.about.ownerDetails) config.about.ownerDetails = defaultAbout.ownerDetails;
        else {
          config.about.ownerDetails.heroHeading = defaultAbout.ownerDetails.heroHeading;
          config.about.ownerDetails.heroSubtitle = defaultAbout.ownerDetails.heroSubtitle;
        }
        needsSave = true;
      }
      if (!config.about.companyDetails.seoKeywords || config.about.companyDetails.seoKeywords.length === 0) {
        config.about.companyDetails.seoKeywords = defaultAbout.companyDetails.seoKeywords;
        needsSave = true;
      }
      if (!config.about.employees || config.about.employees.length === 0) {
        config.about.employees = defaultEmployees;
        needsSave = true;
      }
    }
    if (needsSave) {
      try {
        await config.save();
      } catch {
        // Ignore parallel build worker VersionErrors - document is already updated
      }
    }
  }
  return config;
}
