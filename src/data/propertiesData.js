// Centralized Property Data System
// Powers Header category navigation, Hero live search, Portfolio filtering, and Dynamic Property Details view.

export const propertyCategories = [
  "All",
  "Residential",
  "Commercial",
  "Plots",
  "Construction",
  "New Launches"
];

export const propertySizes = [
  { label: "All Sizes", value: "all" },
  { label: "600 sq. ft.", value: "600" },
  { label: "800 sq. ft.", value: "800" },
  { label: "1000 sq. ft.", value: "1000" },
  { label: "1200 sq. ft.", value: "1200" },
  { label: "1500+ sq. ft.", value: "1500" }
];

export const propertiesData = [
  {
    id: "ds-res-101",
    title: "DS Crown - Luxury 3 BHK Residency",
    category: "Residential",
    type: "Flat",
    location: "Sector 85, Corporate Corridor, Gurugram",
    size: "1200 sq. ft.",
    numericSize: 1200,
    price: "₹1.25 Cr",
    numericPrice: 125,
    status: "Available",
    featured: true,
    newLaunch: false,
    possessionDate: "Ready to Move",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Ultra-modern 3 BHK luxury apartment featuring Italian marble flooring, panoramic city balconies, and smart home automation.",
    description: "DS Crown Heights redefines contemporary urban living. Nestled in prime Sector 85, this 1200 sq. ft. luxury apartment combines spacious architectural layouts with multi-layer acoustic insulation, floor-to-ceiling double-glazed windows, and high-end imported bath fittings. Residents enjoy exclusive access to an infinity rooftop pool, clubhouse, and private basement parking.",
    amenities: [
      "24/7 Smart Security & CCTV",
      "Infinity Rooftop Swimming Pool",
      "Fully Equipped Gymnasium",
      "EV Car Charging Station",
      "100% Power Backup",
      "Landscaped Sky Deck",
      "High-Speed Elevators",
      "Clubhouse & Party Hall"
    ],
    specifications: [
      { label: "Structure", value: "Earthquake Resistant RCC Frame (Zone IV)" },
      { label: "Flooring", value: "Imported Italian Marble in Living Room, Engineered Wood in Bedrooms" },
      { label: "Walls & Ceiling", value: "Premium Acrylic Emulsion Paint with POP Punning" },
      { label: "Kitchen", value: "Modular Kitchen with Soft-Close Cabinets, Quartz Countertop & Hob" },
      { label: "Doors & Windows", value: "8ft Teak Wood Main Door, UPVC Double Glazed Windows" },
      { label: "Electrical", value: "Schneider Modular Switches, Concealed Copper Wiring & Automation Ready" }
    ]
  },
  {
    id: "ds-res-102",
    title: "DS Sky View Apartments - Modern 2 BHK",
    category: "Residential",
    type: "Flat",
    location: "Sector 85, Main Boulevard",
    size: "1000 sq. ft.",
    numericSize: 1000,
    price: "₹95 Lakh",
    numericPrice: 95,
    status: "Available",
    featured: true,
    newLaunch: false,
    possessionDate: "December 2026",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Elegantly planned 1000 sq. ft. 2 BHK residence with sunlit corner balcony and premium fittings.",
    description: "Designed for modern families seeking a harmonious blend of efficiency and luxury, DS Sky View provides zero space wastage, cross-ventilation, and dual high-speed elevators per tower.",
    amenities: [
      "24/7 Security",
      "Children's Play Area",
      "Power Backup",
      "Covered Car Parking",
      "Jogging Track",
      "Intercom Facility"
    ],
    specifications: [
      { label: "Structure", value: "RCC Frame Structure with MIVAN Technology" },
      { label: "Flooring", value: "Vitrified Tiles (800x800mm)" },
      { label: "Kitchen", value: "Granite Countertop with Stainless Steel Sink" },
      { label: "Sanitaryware", value: "Kohler / Jaquar CP Fittings" }
    ]
  },
  {
    id: "ds-nl-201",
    title: "DS Pinnacle Towers - Iconic Luxury Residences",
    category: "New Launches",
    type: "Flat",
    location: "Sector 85, Golf Course Extension Belt",
    size: "1500 sq. ft.",
    numericSize: 1500,
    price: "₹1.85 Cr",
    numericPrice: 185,
    status: "New Launch",
    featured: true,
    newLaunch: true,
    possessionDate: "Q3 2027",
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Newly launched 4 BHK & Penthouse landmark featuring VRV air conditioning and private elevator access.",
    description: "DS Pinnacle Towers is our flagship new launch project. Offering grand 1500 sq. ft. residences with double-height ceiling living areas, private elevator lobbies, and panoramic views of lush green belts.",
    amenities: [
      "Private Lift Lobby",
      "VRV Centralized AC",
      "Temperature Controlled Pool",
      "Private Miniplex Theater",
      "Concierge Service",
      "Helipad Access"
    ],
    specifications: [
      { label: "Structure", value: "High-Rise Steel & Reinforced Concrete Structure" },
      { label: "Air Conditioning", value: "Daikin VRV Air Conditioning Installed" },
      { label: "Home Automation", value: "Complete Smart App Control for Lights & Security" }
    ]
  },
  {
    id: "ds-com-301",
    title: "DS Corporate Hub - Grade A Office Suites",
    category: "Commercial",
    type: "Commercial Space",
    location: "Sector 85, Tower 7 Zone",
    size: "800 sq. ft.",
    numericSize: 800,
    price: "₹1.10 Cr",
    numericPrice: 110,
    status: "Available",
    featured: true,
    newLaunch: false,
    possessionDate: "Ready for Fit-outs",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Premium Grade-A commercial office unit with glass curtain elevation and high footfall location.",
    description: "Position your business at the forefront of growth in DS Corporate Hub. This 800 sq. ft. bare-shell / custom fit-out space features 14ft floor-to-ceiling clearance, fiber-optic connectivity, and multi-tier basement parking.",
    amenities: [
      "Double-Height Entrance Lobby",
      "High-Speed Passenger & Service Lifts",
      "24/7 Security & Access Control",
      "Central HVAC & Air Filtration",
      "Ample Visitor Parking",
      "Food Court & Cafe Lounge"
    ],
    specifications: [
      { label: "Clearance", value: "14 Feet Floor to Floor Ceiling Height" },
      { label: "Glazing", value: "Double Glazed Structural Low-E Facade" },
      { label: "Power", value: "100% Dual Grid Power Backup" }
    ]
  },
  {
    id: "ds-plt-401",
    title: "DS Grand Enclave - Gated Residential Plot",
    category: "Plots",
    type: "Plot",
    location: "Sector 85, Expressway Link Road",
    size: "1000 sq. ft.",
    numericSize: 1000,
    price: "₹75 Lakh",
    numericPrice: 75,
    status: "Available",
    featured: true,
    newLaunch: false,
    possessionDate: "Immediate Registry",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Approved residential freehold plot with wide 40ft road front, underground utilities, and instant registry.",
    description: "Build your dream home on this prime 1000 sq. ft. freehold plot in DS Grand Enclave. Fully developed township with paved roads, streetlights, gated perimeter, and immediate construction permissions.",
    amenities: [
      "Gated Community with Guarded Entry",
      "Underground Electrical Cables",
      "STP & Rainwater Harvesting",
      "40 Feet Wide Internal Roads",
      "Landscaped Central Park",
      "Immediate Registry & Mutation"
    ],
    specifications: [
      { label: "Facing", value: "North-East Vastu Compliant" },
      { label: "Dimensions", value: "25ft Frontage x 40ft Depth" },
      { label: "Approvals", value: "Government Sanctioned Freehold Land" }
    ]
  },
  {
    id: "ds-con-501",
    title: "DS Imperial Estate - Turnkey Villa Construction",
    category: "Construction",
    type: "Construction",
    location: "Sector 85, Prime Township",
    size: "1500 sq. ft.",
    numericSize: 1500,
    price: "₹2.10 Cr",
    numericPrice: 210,
    status: "Under Construction",
    featured: true,
    newLaunch: false,
    possessionDate: "March 2027",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Custom turnkey luxury villa construction project with Grade-A materials and architectural supervision.",
    description: "Ongoing custom construction of a 3-storey luxury villa. Handled by DS Group's senior civil engineering team, featuring post-tensioned slabs, waterproof basement, and Italian facade cladding.",
    amenities: [
      "Architectural 3D Customization",
      "Structural Lifetime Warranty",
      "Solar Rooftop Integration",
      "Private Courtyard & Plunge Pool",
      "Basement Home Theater Room"
    ],
    specifications: [
      { label: "Steel Used", value: "Tata Tiscon Fe-550D Rebars" },
      { label: "Cement", value: "Ultratech Premium Weather Plus" },
      { label: "Sanitary", value: "TOTO & Grohe Designer Collections" }
    ],
    constructionDetails: {
      foundation: "Completed - Heavy Raft Structural Footing",
      structure: "Slab 2 Casted - M30 Grade Certified Concrete",
      expectedCompletion: "Q1 2027"
    }
  },
  {
    id: "ds-res-103",
    title: "DS Gardenia Suites - Compact 1 BHK Studio",
    category: "Residential",
    type: "Flat",
    location: "Sector 85, Hub",
    size: "600 sq. ft.",
    numericSize: 600,
    price: "₹55 Lakh",
    numericPrice: 55,
    status: "Available",
    featured: false,
    newLaunch: false,
    possessionDate: "Ready to Move",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Fully furnished 600 sq. ft. luxury studio flat designed for working professionals and high rental yield.",
    description: "Compact yet sophisticated 600 sq. ft. studio apartment equipped with built-in wardrobe, smart kitchenettes, high-speed WiFi setup, and 24/7 concierge.",
    amenities: [
      "Fully Furnished",
      "High Speed Fiber Internet",
      "24/7 Security",
      "Laundromat Facility",
      "Fitness Center"
    ],
    specifications: [
      { label: "Size", value: "600 sq. ft." },
      { label: "Condition", value: "Brand New Furnished" }
    ]
  },
  {
    id: "ds-plt-402",
    title: "DS Heritage Meadows - 800 sq. ft. Plot",
    category: "Plots",
    type: "Plot",
    location: "Sector 85, West Boulevard",
    size: "800 sq. ft.",
    numericSize: 800,
    price: "₹62 Lakh",
    numericPrice: 62,
    status: "Available",
    featured: false,
    newLaunch: false,
    possessionDate: "Immediate Registry",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Ideal 800 sq. ft. residential plot with clear title deed and immediate construction clearance.",
    description: "High appreciation plot located in a peaceful residential enclave with quick access to schools and hospitals.",
    amenities: [
      "Water & Electricity Line Ready",
      "Street Lighting Installed",
      "Boundary Wall Guarded"
    ],
    specifications: [
      { label: "Dimensions", value: "20ft x 40ft" },
      { label: "Registry", value: "100% Clear Title Freehold" }
    ]
  },
  {
    id: "ds-com-302",
    title: "DS High Street Gallery - Retail Shop",
    category: "Commercial",
    type: "Retail Store",
    location: "Sector 85, Commercial Boulevard",
    size: "600 sq. ft.",
    numericSize: 600,
    price: "₹1.40 Cr",
    numericPrice: 140,
    status: "Available",
    featured: false,
    newLaunch: false,
    possessionDate: "Ready for Fit-outs",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
    ],
    shortDescription: "Ground floor high-visibility retail shop with glass frontage on main arterial road.",
    description: "Exceptional retail space suited for luxury boutiques, brand showrooms, or anchor dining outlets with heavy daily foot traffic.",
    amenities: [
      "Main Road Frontage",
      "18ft Double Height Ceiling",
      "High Visibility Glass Display"
    ],
    specifications: [
      { label: "Location", value: "Ground Floor Premium Plaza" }
    ]
  }
];
