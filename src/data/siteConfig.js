// Centralized configuration file for DS Group of Companies website
// All content can be easily updated from this file by administrators.

export const siteConfig = {
  brand: {
    name: "DS Group of Companies",
    shortName: "DS Group",
    tagline: "Engineering Excellence, Building Timeless Luxury",
    subtitle: "Premier Real Estate Development, Construction & Architectural Solutions",
    establishedYear: 2008,
    logoText: "DS GROUP",
    logoSubtext: "OF COMPANIES",
    logoUrl: "/images/logo.png",
  },
  contact: {
    whatsappNumber: "7443000070",
    whatsappFormatted: "+91 74430 00070",
    whatsappLink: "https://wa.me/917443000070?text=Hello%20DS%20Group%20of%20Companies,%20I%20would%20like%20to%20inquire%20about%20your%20properties%20and%20services.",
    phonePrimary: "+91 74430 00070",
    phoneSecondary: "+91 98123 45678",
    emailPrimary: "info@dsgroupofcompanies.com",
    emailSales: "sales@dsgroupofcompanies.com",
    address: {
      plot: "Plot Sector 85",
      tower: "Tower 7",
      floor: "3rd Floor",
      fullAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122004",
      country: "India"
    },
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment"
  },
  owner: {
    name: "Surendra Soni",
    designation: "Founder & Managing Director",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bio: "With over 18 years of visionary leadership in real estate development, construction engineering, and architectural masterplanning, Deepak Sharma has driven DS Group of Companies to become a trusted hallmark of luxury living and commercial landmarks. His guiding principle is delivering uncompromised quality, structural transparency, and client-first execution across every project.",
    quote: "Building is not merely assembling brick and steel; it is sculpting space where legacies flourish and trust endures for generations.",
    stats: [
      { label: "Years of Excellence", value: "18+" },
      { label: "Projects Completed", value: "45+" },
      { label: "Sq. Ft. Delivered", value: "2.5M+" },
      { label: "Happy Families & Businesses", value: "3,200+" }
    ]
  },
  socialLinks: {
    instagram: "https://instagram.com/dsgroup_official",
    facebook: "https://facebook.com/dsgroupofcompanies",
    whatsapp: "https://wa.me/917443000070",
    twitter: "https://x.com/dsgroup_realty",
    linkedin: "https://linkedin.com/company/ds-group-of-companies",
    youtube: "https://youtube.com/@dsgrouprealty"
  },
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.587877297893!2d76.97444158498421!3d28.459496468453303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d59265f299%3A0xb249f3e9a5bf32ed!2sSector%2085%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  services: [
    {
      id: "trunk-projects",
      title: "Trunk Projects",
      iconName: "Building2",
      badge: "Turnkey Infrastructure",
      shortDescription: "Comprehensive mega-scale infrastructure and industrial turnkey projects engineered to international standards.",
      fullDescription: "DS Group undertakes end-to-end turnkey trunk infrastructure projects including land development, heavy structural foundations, utility networks, and multi-acre masterplanning with strict milestone delivery."
    },
    {
      id: "interior-design",
      title: "Interior Design",
      iconName: "Palette",
      badge: "Bespoke Luxury",
      shortDescription: "Tailored architectural interior concepts blending elegance, custom millwork, ergonomic spatial planning, and smart home tech.",
      fullDescription: "Our interior design studio crafts bespoke residential and corporate interiors. From customized lighting, imported marble, and Italian furniture curation to full automation."
    },
    {
      id: "exterior-design",
      title: "Exterior Design",
      iconName: "Layers",
      badge: "Modern Facades",
      shortDescription: "Cutting-edge building elevation designs, ventilated facade systems, dynamic lighting, and biophilic landscape integrated structures.",
      fullDescription: "Elevating skyline footprints through innovative 3D facade engineering, weather-resistant cladding, energy-efficient glass curtains, and high-impact exterior architectural aesthetics."
    },
    {
      id: "construction",
      title: "Construction",
      iconName: "HardHat",
      badge: "Grade-A Engineering",
      shortDescription: "Precision civil engineering, high-rise structural construction, and heavy-duty commercial build-outs using certified premium materials.",
      fullDescription: "Equipped with state-of-the-art machinery and seasoned structural engineers, DS Group executes robust residential towers, commercial complexes, and luxury villa construction."
    },
    {
      id: "residential-real-estate",
      title: "Residential Real Estate",
      iconName: "Home",
      badge: "Ultra Luxury",
      shortDescription: "Ultra-luxury high-rise apartments, duplex penthouses, and gated community villas located in high-growth prime corridors.",
      fullDescription: "Carefully curated ultra-luxury residences featuring expansive floor plans, resort-style amenities, private elevators, EV infrastructure, and 3-tier smart security systems."
    },
    {
      id: "commercial-real-estate",
      title: "Commercial Real Estate",
      iconName: "Briefcase",
      badge: "Corporate Towers",
      shortDescription: "Grade-A corporate office suites, premium retail high-street galleries, and high-yield commercial investment properties.",
      fullDescription: "Strategically situated commercial hubs designed for modern enterprises, featuring double-height atrium lobbies, high-speed smart lifts, ample basement parking, and high footfall retail avenues."
    },
    {
      id: "plot-sales",
      title: "Plot Sales",
      iconName: "MapPin",
      badge: "Prime Freehold Land",
      shortDescription: "Fully approved residential freehold plots and commercial land parcels in premier gated townships with immediate registry.",
      fullDescription: "Secure high-value land investments with clear title deeds, wide paved roads, underground electrical lines, gated perimeter fencing, and immediate construction clearance."
    },
    {
      id: "project-development",
      title: "Project Development",
      iconName: "Compass",
      badge: "Master Planning",
      shortDescription: "Complete real estate project lifecycle management from land acquisition and sanction approvals to construction and handover.",
      fullDescription: "Partnering with land owners and financial institutions to conceive, plan, fund, build, and market high-return real estate ventures."
    },
    {
      id: "property-consultation",
      title: "Property Consultation",
      iconName: "ShieldCheck",
      badge: "Advisory & Valuation",
      shortDescription: "Data-driven property investment advisory, legal due diligence, valuation analysis, and portfolio diversification guidance.",
      fullDescription: "Our expert advisors provide transparent market insights, ROI forecasting, title verification, and tailored portfolio management for individual investors and corporate clients."
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Rajeshwar Verma",
      role: "CEO, TechVentures India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      propertyPurchased: "Commercial Space - DS Imperial Tower",
      text: "Investing in DS Imperial Tower was the single best decision for our company headquarters. The structural finish, grand lobby design, and timely delivery by DS Group exceeded all our expectations."
    },
    {
      id: 2,
      name: "Ananya & Dr. Vikram Mehta",
      role: "Luxury Homeowners",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      propertyPurchased: "4 BHK Penthouse - DS Elegance Heights",
      text: "DS Group delivered our dream penthouse exactly as promised. The attention to interior detail, high ceilings, and top-tier security give us complete peace of mind. Truly a 5-star builder!"
    },
    {
      id: 3,
      name: "Siddharth Malhotra",
      role: "Real Estate Investor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      propertyPurchased: "Residential Plot - DS Grand Enclave",
      text: "Clear titles, prompt documentation, and immediate registry! The plot appreciation in Sector 85 has been remarkable. Mr. Deepak Sharma and his team provide unmatched transparency."
    },
    {
      id: 4,
      name: "Pooja & Rohit Singhania",
      role: "Villa Owners",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      propertyPurchased: "Luxury Villa - DS Crest Construction",
      text: "We hired DS Group for complete turnkey villa construction. From 3D architectural facade design to final interior handover, their engineering quality is simply world-class."
    }
  ]
};
