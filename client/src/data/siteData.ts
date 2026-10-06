export type Category = {
  name: string;
  slug: string;
  phrase: string;
  image: string;
  description: string;
};

export type Product = {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  short: string;
  materials: string;
  dimensions: string;
  price: number;
  image: string;
  secondaryImage?: string;
  care: string;
  shipping: string;
};

export type Project = {
  name: string;
  slug: string;
  location: string;
  year: string;
  type: string;
  image: string;
  summary: string;
  concept: string;
  materials: string[];
  gallery: string[];
};

export const categories: Category[] = [
  { name: "Sofas", slug: "sofas", phrase: "A softer way to settle in.", image: "/images/sofa.jpg", description: "Quiet silhouettes, generous comfort and textiles chosen to live beautifully." },
  { name: "Dining", slug: "dining", phrase: "Gathered around good things.", image: "/images/dining.jpg", description: "Tables and chairs made for long conversations and everyday rituals." },
  { name: "Bedroom", slug: "bedroom", phrase: "Room to exhale.", image: "/images/bedroom.jpg", description: "Restful forms and natural materials for a quieter end to the day." },
  { name: "Chairs", slug: "chairs", phrase: "A shape worth staying for.", image: "/images/armchair.jpg", description: "Sculptural seats with the comfort and craft to become familiar." },
  { name: "Tables", slug: "tables", phrase: "Grounded in good material.", image: "/images/coffee-table.jpg", description: "Honest surfaces that bring a room together without asking for attention." },
  { name: "Storage", slug: "storage", phrase: "A place for the everyday.", image: "/images/storage-shelves.jpg", description: "Thoughtful cabinetry that gives daily objects a considered home." },
];

export const products: Product[] = [
  {
    name: "The Luma Chair", slug: "luma-chair", category: "Chairs", categorySlug: "chairs",
    description: "Soft geometry. Quiet character. Luma brings a generous, considered seat to the quieter corners of a room.",
    short: "Soft geometry. Quiet character.", materials: "Solid oak frame · natural wool upholstery · high-resilience foam",
    dimensions: "W 76 × D 82 × H 73 cm · seat height 42 cm", price: 89900,
    image: "/images/luma-chair.jpg",
    secondaryImage: "/images/armchair.jpg",
    care: "Vacuum upholstery gently with a soft brush. Wipe the timber with a dry, lint-free cloth; keep away from direct heat.",
    shipping: "Made to order. Delivery and installation are arranged with care; confirm timing and access with the studio before purchase.",
  },
  {
    name: "Arlo Sofa", slug: "arlo-sofa", category: "Sofas", categorySlug: "sofas",
    description: "A low, open silhouette with an easy seat and a linen-rich cover that softens with time.",
    short: "Room to settle into.", materials: "Solid hardwood frame · linen blend · natural latex and foam", dimensions: "W 218 × D 94 × H 76 cm", price: 245000,
    image: "/images/sofa.jpg",
    secondaryImage: "/images/sunlit-interior.jpg",
    care: "Blot spills promptly with a clean cloth. Professional cleaning is recommended for upholstery.", shipping: "Made to order; delivery is coordinated with the studio and confirmed before an order is placed.",
  },
  {
    name: "Serein Bed", slug: "serein-bed", category: "Bedroom", categorySlug: "bedroom",
    description: "A calm, grounded bed with a slim oak frame and a softly upholstered headboard.",
    short: "A softer start, a quieter end.", materials: "Solid oak · natural linen · FSC-certified plywood slats", dimensions: "Queen: W 168 × D 215 × H 98 cm", price: 178000,
    image: "/images/bedroom.jpg",
    secondaryImage: "/images/fabric.jpg",
    care: "Dust timber with a soft dry cloth. Upholstered panels may be gently vacuumed using a brush attachment.", shipping: "Made to order. Mattress is not included; delivery and assembly are confirmed with the studio.",
  },
  {
    name: "Morrow Dining Table", slug: "morrow-dining-table", category: "Dining", categorySlug: "dining",
    description: "A considered gathering point in solid teak, shaped with softened corners and a quiet, generous stance.",
    short: "For the rituals that become stories.", materials: "Solid teak · hand-finished natural oil", dimensions: "W 190 × D 92 × H 75 cm", price: 168000,
    image: "/images/dining-table.jpg",
    secondaryImage: "/images/dining.jpg",
    care: "Use coasters for hot vessels and wipe with a soft damp cloth. Refresh the natural-oil finish as needed.", shipping: "Made to order. Delivery and installation are confirmed with the studio before dispatch.",
  },
  {
    name: "Stillwater Table", slug: "stillwater-table", category: "Tables", categorySlug: "tables",
    description: "A low, rounded stone form that gives a living space a natural centre of gravity.",
    short: "Quiet strength, close at hand.", materials: "Honed limestone · concealed reinforced base", dimensions: "Ø 86 × H 34 cm", price: 74500,
    image: "/images/stillwater-room.jpg",
    secondaryImage: "/images/coffee-table.jpg",
    care: "Wipe with a soft damp cloth. Avoid acidic cleaners and use coasters to protect the honed stone.", shipping: "Natural stone varies subtly. Delivery and access are confirmed with the studio before dispatch.",
  },
  {
    name: "Orren Sideboard", slug: "orren-sideboard", category: "Storage", categorySlug: "storage",
    description: "A quiet cabinet with fine fluting, generous storage and a warm walnut presence.",
    short: "A place for the things you keep.", materials: "American walnut veneer · solid walnut details · satin bronze hardware", dimensions: "W 180 × D 46 × H 78 cm", price: 189000,
    image: "/images/sideboard.jpg",
    secondaryImage: "/images/storage-shelves.jpg",
    care: "Dust with a soft cloth. Use a dry cloth for spills and avoid prolonged direct sunlight.", shipping: "Made to order; delivery and placement are coordinated with the studio.",
  },
];

// These are initial illustrative portfolio entries; replace year, project specifics and images with verified client-approved case-study material.
export const projects: Project[] = [
  {
    name: "Modern Apartment", slug: "modern-apartment", location: "Mumbai", year: "2025", type: "Residential",
    image: "/images/apartment.jpg",
    summary: "A considered city home shaped around slower mornings and generous evenings.",
    concept: "Warm oak, softened edges and an open living space bring a quieter pace to the city's everyday rhythm. Storage is integrated into the architecture; light is allowed to travel from room to room.",
    materials: ["Quarter-cut oak", "Honed limestone", "Linen weave", "Aged bronze"],
    gallery: ["/images/apartment-living.jpg", "/images/apartment-sofa.jpg"],
  },
  {
    name: "Luxury Villa", slug: "luxury-villa", location: "Goa", year: "2024", type: "Residential",
    image: "/images/villa.jpg",
    summary: "An open, tactile retreat with a gentle connection to its garden setting.",
    concept: "A palette of lime plaster, teak and local stone lets the landscape set the mood. Rooms open to the garden while furniture stays low, tactile and easy to live with.",
    materials: ["Teak", "Laterite stone", "Lime plaster", "Handwoven cotton"],
    gallery: ["/images/villa-exterior.jpg", "/images/villa-lounge.jpg"],
  },
  {
    name: "Contemporary Office", slug: "contemporary-office", location: "Bengaluru", year: "2025", type: "Commercial",
    image: "/images/office.jpg",
    summary: "A work environment that makes room for focus, exchange and a little pause.",
    concept: "A welcoming threshold leads into a flexible studio landscape. Timber, pale stone and careful acoustic choices create a calmer backdrop for different ways of working.",
    materials: ["Natural oak", "Blackened steel", "Wool felt", "Textured stone"],
    gallery: ["/images/office-studio.jpg", "/images/office-lounge.jpg"],
  },
];

export const materials = [
  { name: "WOOD", line: "Warmth you can feel.", detail: "Grain, tone and a finish that grows more familiar with use.", image: "/images/wood.jpg" },
  { name: "STONE", line: "Quiet strength.", detail: "Natural variation, shaped into surfaces made to be lived with.", image: "/images/stone-bedroom.jpg" },
  { name: "FABRIC", line: "Comfort in every detail.", detail: "Soft, durable weaves selected for touch as much as tone.", image: "/images/fabric.jpg" },
  { name: "CRAFT", line: "Made to last.", detail: "The small decisions in joinery, proportion and finish that hold over time.", image: "/images/craft.jpg" },
];

export const designSteps = [
  { number: "01", title: "Listen", text: "We begin with how you live, what you value and the feeling you want a space to hold." },
  { number: "02", title: "Imagine", text: "Plans, material studies and furniture proposals give the first clear shape to the idea." },
  { number: "03", title: "Refine", text: "Together, we resolve proportion, light, texture and the details that make a room yours." },
  { number: "04", title: "Make", text: "Our studio coordinates thoughtful making and a considered handover, down to the last detail." },
];

export type PageMetaData = { title: string; description: string; type?: "website" | "article" | "product" };

const baseMeta: Record<string, PageMetaData> = {
  "/": { title: "HOUZZ STUDIOS — Furniture That Defines Your Space", description: "Thoughtfully designed furniture and interiors for modern living. Discover considered pieces, material stories and spaces designed around you." },
  "/about": { title: "Our Story — HOUZZ STUDIOS", description: "Meet HOUZZ STUDIOS: a design-led furniture and interior studio shaped by craft, material and the way people live." },
  "/furniture": { title: "Furniture Collection — HOUZZ STUDIOS", description: "Explore considered furniture for living, dining, bedrooms and everyday rituals, shaped with natural materials and lasting craft." },
  "/interior-design": { title: "Interior Design — HOUZZ STUDIOS", description: "Thoughtful residential and commercial interior design, from first conversation through material, making and handover." },
  "/projects": { title: "Selected Projects — HOUZZ STUDIOS", description: "Explore illustrative residential and commercial project stories from Mumbai, Goa and Bengaluru." },
  "/contact": { title: "Start a Conversation — HOUZZ STUDIOS", description: "Tell HOUZZ STUDIOS about the space you are imagining. Begin a conversation about furniture or interior design." },
};

export function getPageMeta(path: string): PageMetaData {
  const clean = decodeURIComponent(path.split("?")[0].replace(/\/$/, "") || "/");
  if (baseMeta[clean]) return baseMeta[clean];
  const product = products.find((item) => clean === `/furniture/product/${item.slug}`);
  if (product) return { title: `${product.name} — HOUZZ STUDIOS`, description: product.description, type: "product" };
  const project = projects.find((item) => clean === `/projects/${item.slug}`);
  if (project) return { title: `${project.name}, ${project.location} — HOUZZ STUDIOS`, description: project.summary, type: "article" };
  const category = categories.find((item) => clean === `/furniture/category/${item.slug}`);
  if (category) return { title: `${category.name} — Furniture — HOUZZ STUDIOS`, description: category.description };
  return { title: "Page not found — HOUZZ STUDIOS", description: "The page could not be found. Return to HOUZZ STUDIOS to explore furniture and interiors." };
}

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
