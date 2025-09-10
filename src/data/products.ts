export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  keyIngredients: string[];
  usage: string;
  scientificBacking: string;
  partnerInfo: string;
  logo: string;
  productImage: string;
  carouselImages: { src: string; alt: string }[];
  backgroundColor: string;
  category: 'cognitive' | 'energy' | 'performance';
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

const zynLogo = "/lovable-uploads/da44d402-3c44-49a9-a8c7-5ba205fa1aad.png"
const usnLogo = "/lovable-uploads/dd883032-239f-4a1c-ae71-be82bb7091e5.png"
const euNaturalLogo = "/lovable-uploads/9d2ae4ea-38f6-4827-a422-83aa2b576f6d.png"
const naokiMatchaLogo = "/lovable-uploads/1693d746-7a78-4cb8-9cfd-99c426c36307.png"

export const products: Product[] = [
  {
    id: "zyn-nicotine-pouches",
    slug: "zyn-nicotine-pouches",
    name: "ZYN Nicotine Pouches",
    brand: "ZYN",
    price: "R 199",
    shortDescription: "Smoke-free nicotine satisfaction with free sample campaigns available",
    fullDescription: "ZYN Nicotine Pouches offer a revolutionary approach to nicotine consumption without the harmful effects of smoking. These discrete, tobacco-free pouches provide controlled nicotine release for sustained satisfaction throughout your day.",
    benefits: ["Smoke-free alternative", "Discrete usage", "Various strengths", "No tobacco", "Fresh breath"],
    keyIngredients: ["Nicotine", "Plant-based fibers", "Natural flavoring", "pH adjusters"],
    usage: "Place one pouch between gum and lip. Keep for 15-60 minutes. Do not swallow.",
    scientificBacking: "Clinical studies show nicotine pouches provide effective nicotine delivery with 95% less harmful chemicals than traditional cigarettes.",
    partnerInfo: "ZYN is a leading Swedish brand in the smoke-free category, committed to providing adult smokers with better alternatives.",
    logo: zynLogo,
    productImage: "/lovable-uploads/0d343316-5888-4919-9490-4dc374ddbd70.png",
    carouselImages: [
      { src: "/lovable-uploads/fe9d3437-c5cf-4811-a333-40eb69dfa195.png", alt: "ZYN Nicotine Pouches - Spearmint X-Low 1.5mg" },
      { src: "/lovable-uploads/df196978-5314-425a-a22d-1035119e1ca4.png", alt: "ZYN Nicotine Pouches - Cool Mint 3mg" },
      { src: "/lovable-uploads/6dbcae04-ab09-4534-a483-64245ff887b1.png", alt: "ZYN Nicotine Pouches - Black Cherry 3mg" },
      { src: "/lovable-uploads/654076fb-913c-4d45-95ac-0b71692099d2.png", alt: "ZYN Nicotine Pouches - Apple Mint 6mg" },
      { src: "/lovable-uploads/af0049ab-61f5-4d2f-a4a8-178e8af906f2.png", alt: "ZYN Nicotine Pouches - Spearmint 3mg" },
      { src: "/lovable-uploads/cd2988b2-7af8-4dbc-94c2-89f7f43cd7a2.png", alt: "ZYN Nicotine Pouches - Coffee 3mg" },
      { src: "/lovable-uploads/1f359ed7-fe0b-46fc-b272-4121643f40e3.png", alt: "ZYN Nicotine Pouches - Peach 6mg" }
    ],
    backgroundColor: "#18a9dc",
    category: "performance",
    inStock: true,
    rating: 4.6,
    reviewCount: 234
  },
  {
    id: "l-theanine-caffeine-blend",
    slug: "l-theanine-caffeine-blend",
    name: "L-Theanine + Caffeine Blends",
    brand: "EU Natural",
    price: "R 349",
    shortDescription: "Synergistic combination for calm, focused energy without jitters",
    fullDescription: "Our premium L-Theanine and Caffeine blend harnesses the power of this scientifically-proven combination to deliver sustained focus and alertness without the anxiety or crash associated with caffeine alone.",
    benefits: ["Sustained focus", "Reduced anxiety", "Clean energy", "Enhanced mood", "No jitters"],
    keyIngredients: ["L-Theanine (200mg)", "Natural Caffeine (100mg)", "Vitamin B6", "Natural cellulose"],
    usage: "Take 1-2 capsules daily with water, preferably in the morning or before mental tasks.",
    scientificBacking: "Over 50 peer-reviewed studies demonstrate the synergistic effects of L-Theanine and caffeine on cognitive performance and alertness.",
    partnerInfo: "EU Natural sources premium ingredients from European suppliers with strict quality control standards and third-party testing.",
    logo: euNaturalLogo,
    productImage: "/lovable-uploads/da44d402-3c44-49a9-a8c7-5ba205fa1aad.png",
    carouselImages: [
      { src: "/lovable-uploads/cc6efb1b-0e6e-4ad2-9c22-ca424cf63dee.png", alt: "Elite Focus Product Bottle" },
      { src: "/lovable-uploads/215e8a35-e143-41e9-a023-4622b163ed4a.png", alt: "Elite Focus - Brains, Gains & Everything in Between" },
      { src: "/lovable-uploads/dc2a71da-192c-4e87-93bc-9c5f4e8f0fa3.png", alt: "Clean Energy That's on Another Level - Elite Focus vs Energy Drink" },
      { src: "/lovable-uploads/91467fde-fa61-480d-b22a-adb403ab89b8.png", alt: "Potent Nootropic Blend - Caffeine & L-Theanine" },
      { src: "/lovable-uploads/58fac0ca-c5d1-46d8-9b9d-37226c16d6e4.png", alt: "Power Through Work, Study, & Life with Elite Focus" }
    ],
    backgroundColor: "#056e8c",
    category: "cognitive",
    inStock: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: "creatine-monohydrate",
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    brand: "USN",
    price: "R 449",
    shortDescription: "Cognitive enhancement and physical performance support",
    fullDescription: "USN's premium Creatine Monohydrate supports both physical and cognitive performance. This highly researched supplement enhances brain energy metabolism and supports memory formation and recall.",
    benefits: ["Brain function", "Memory support", "Exercise performance", "Mental endurance", "Neuroplasticity"],
    keyIngredients: ["Creatine Monohydrate (5g)", "Micronized formula", "No artificial additives"],
    usage: "Mix 5g (1 scoop) with 250ml water daily. Take consistently for best results.",
    scientificBacking: "Meta-analyses show creatine supplementation improves cognitive performance, particularly in tasks requiring rapid processing and working memory.",
    partnerInfo: "USN is a trusted South African brand with over 25 years of experience in sports nutrition and cognitive enhancement supplements.",
    logo: usnLogo,
    productImage: "/lovable-uploads/dd883032-239f-4a1c-ae71-be82bb7091e5.png",
    carouselImages: [
      { src: "/lovable-uploads/dd883032-239f-4a1c-ae71-be82bb7091e5.png", alt: "USN Creatine Monohydrate Product" }
    ],
    backgroundColor: "#0156a6",
    category: "performance",
    inStock: true,
    rating: 4.7,
    reviewCount: 189
  },
  {
    id: "matcha-tea-premium",
    slug: "matcha-tea-premium",
    name: "Matcha Tea Premium",
    brand: "Naoki",
    price: "R 299",
    shortDescription: "High-quality matcha for sustained energy and antioxidant benefits",
    fullDescription: "Naoki's Premium Matcha is ceremonial-grade Japanese matcha that provides sustained energy, mental clarity, and powerful antioxidant protection. Each serving delivers L-theanine for calm focus.",
    benefits: ["Natural energy", "Antioxidants", "Mental clarity", "Calm alertness", "Metabolic support"],
    keyIngredients: ["Ceremonial-grade Matcha", "L-Theanine", "EGCG", "Chlorophyll", "Natural caffeine"],
    usage: "Whisk 1-2g matcha powder with 80ml hot water (70-80°C). Enjoy 1-2 servings daily.",
    scientificBacking: "Studies show matcha's unique catechin profile and L-theanine content provide sustained cognitive benefits and stress reduction.",
    partnerInfo: "Naoki sources directly from traditional tea gardens in Uji, Japan, ensuring authentic quality and supporting sustainable farming practices.",
    logo: naokiMatchaLogo,
    productImage: "/lovable-uploads/9d2ae4ea-38f6-4827-a422-83aa2b576f6d.png",
    carouselImages: [
      { src: "/lovable-uploads/9d2ae4ea-38f6-4827-a422-83aa2b576f6d.png", alt: "Naoki Matcha Tea Premium Product" }
    ],
    backgroundColor: "#203c43",
    category: "cognitive",
    inStock: true,
    rating: 4.9,
    reviewCount: 267
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};