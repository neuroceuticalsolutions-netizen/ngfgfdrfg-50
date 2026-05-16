export type PeptideCategory = "anti-ageing" | "firming" | "brightening" | "eye-care";

export interface PeptideProduct {
  slug: string;
  name: string;
  brand: string;
  category: PeptideCategory;
  categoryLabel: string;
  price: string;
  rating: number;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  keyIngredients: string[];
  usage: string;
  scientificResearch: string;
  aboutIngredient: { name: string; description: string };
  image: string;
}

const PLACEHOLDER = "/placeholder.svg";

export const peptideProducts: PeptideProduct[] = [
  {
    slug: "ghk-cu-copper-peptide-serum",
    name: "GHK-Cu Copper Peptide Serum",
    brand: "Neuroceutical Peptides",
    category: "anti-ageing",
    categoryLabel: "Anti-Ageing",
    price: "R1,250",
    rating: 4.8,
    shortDescription:
      "Advanced copper peptide serum that supports collagen synthesis and skin renewal.",
    fullDescription:
      "An advanced copper peptide serum formulated to support collagen synthesis, improve skin firmness and contribute to a more radiant, even complexion.",
    benefits: ["Collagen stimulation", "Skin repair", "Antioxidant", "Firming"],
    keyIngredients: [
      "GHK-Cu (Copper Tripeptide-1)",
      "Hyaluronic Acid",
      "Niacinamide",
      "Panthenol",
      "Allantoin",
      "Aqua",
    ],
    usage:
      "Apply 3–4 drops to cleansed face and neck morning and evening. Press gently into skin. Do not rub. Follow with moisturiser. Avoid direct eye contact. SPF recommended for daytime use.",
    scientificResearch:
      "GHK-Cu has been shown in randomised controlled trials to support collagen and glycosaminoglycan synthesis, reduce markers of oxidative stress, and improve skin firmness scores over 12-week treatment periods.",
    aboutIngredient: {
      name: "GHK-Cu",
      description:
        "Copper Tripeptide-1 (GHK-Cu) is one of the most extensively researched peptides in cosmetic dermatology, with peer-reviewed publications spanning five decades supporting its skin-conditioning and soothing properties.",
    },
    image: PLACEHOLDER,
  },
  {
    slug: "argireline-matrixyl-3000-serum",
    name: "Argireline + Matrixyl 3000 Serum",
    brand: "Neuroceutical Peptides",
    category: "anti-ageing",
    categoryLabel: "Anti-Ageing",
    price: "R1,350",
    rating: 4.7,
    shortDescription:
      "Dual-action expression line treatment with a clinically validated peptide combination.",
    fullDescription:
      "A dual-action serum combining Argireline and Matrixyl 3000 to visibly smooth the appearance of expression lines and support skin firmness.",
    benefits: ["Expression lines", "Wrinkle depth", "Smoothing", "Collagen"],
    keyIngredients: [
      "Acetyl Hexapeptide-8 (Argireline)",
      "Palmitoyl Tripeptide-1 (Matrixyl 3000)",
      "Palmitoyl Tetrapeptide-7",
      "Glycerin",
      "Aqua",
    ],
    usage:
      "Apply a thin layer to cleansed skin morning and evening, focusing on areas with expression lines. Follow with moisturiser and SPF in the morning.",
    scientificResearch:
      "Independent cosmetic trials suggest Argireline may help reduce the appearance of expression lines, while Matrixyl 3000 has been studied for its support of dermal matrix proteins associated with firmer-looking skin.",
    aboutIngredient: {
      name: "Argireline & Matrixyl 3000",
      description:
        "Argireline and Matrixyl 3000 are two of the most widely studied peptide actives in cosmetic skincare, frequently used in combination for their complementary roles in supporting smoother, firmer-looking skin.",
    },
    image: PLACEHOLDER,
  },
  {
    slug: "eyeliss-eye-contour-treatment",
    name: "Eyeliss Eye Contour Treatment",
    brand: "Neuroceutical Peptides",
    category: "eye-care",
    categoryLabel: "Eye Care",
    price: "R650",
    rating: 4.6,
    shortDescription:
      "Targeted under-eye treatment for puffiness, dark circles and fine lines around the eye contour.",
    fullDescription:
      "A targeted eye contour treatment formulated with Eyeliss to help reduce the appearance of puffiness, dark circles and fine lines around the delicate eye area.",
    benefits: ["Puffiness", "Dark circles", "Brightening", "Firming"],
    keyIngredients: [
      "Eyeliss (Hesperidin Methyl Chalcone, Dipeptide-2, Palmitoyl Tetrapeptide-7)",
      "Caffeine",
      "Niacinamide",
      "Hyaluronic Acid",
      "Aqua",
    ],
    usage:
      "Apply a small amount around the orbital bone morning and evening using the ring finger. Avoid direct contact with the eye.",
    scientificResearch:
      "Eyeliss has been studied for its potential to help reduce the appearance of under-eye puffiness and improve the look of skin firmness around the eye contour over consistent topical use.",
    aboutIngredient: {
      name: "Eyeliss",
      description:
        "Eyeliss is a peptide-based cosmetic complex developed specifically for the eye contour, supporting a smoother, more refreshed-looking appearance.",
    },
    image: PLACEHOLDER,
  },
  {
    slug: "syn-coll-firming-moisturiser",
    name: "Syn-Coll Firming Moisturiser",
    brand: "Neuroceutical Peptides",
    category: "firming",
    categoryLabel: "Firming",
    price: "R720",
    rating: 4.5,
    shortDescription:
      "Daily moisturiser with Syn-Coll peptide to support skin density and structural integrity.",
    fullDescription:
      "A nourishing daily moisturiser featuring Syn-Coll peptide to support a firmer, denser-looking complexion and reinforce the skin's protective barrier.",
    benefits: ["Skin density", "Collagen synthesis", "Hydration", "Barrier support"],
    keyIngredients: [
      "Syn-Coll (Palmitoyl Tripeptide-5)",
      "Squalane",
      "Ceramide NP",
      "Glycerin",
      "Shea Butter",
      "Aqua",
    ],
    usage:
      "Apply a small amount to cleansed face and neck morning and evening. Use after serums and before SPF in the daytime.",
    scientificResearch:
      "Syn-Coll has been studied for its role in supporting the appearance of firmer, more resilient skin through cosmetic mechanisms associated with the dermal matrix.",
    aboutIngredient: {
      name: "Syn-Coll",
      description:
        "Syn-Coll (Palmitoyl Tripeptide-5) is a synthetic peptide developed for cosmetic use, recognised in the industry for its role in firming and density-focused formulations.",
    },
    image: PLACEHOLDER,
  },
  {
    slug: "copper-zinc-brightening-serum",
    name: "Copper + Zinc Brightening Serum",
    brand: "Neuroceutical Peptides",
    category: "brightening",
    categoryLabel: "Brightening",
    price: "R680",
    rating: 4.5,
    shortDescription:
      "Brightening serum combining copper and zinc peptides to even skin tone and boost radiance.",
    fullDescription:
      "A lightweight brightening serum combining copper and zinc peptide complexes to support a more even-looking skin tone, improved radiance and a healthy barrier.",
    benefits: ["Even skin tone", "Radiance", "Barrier support", "Antioxidant"],
    keyIngredients: [
      "Copper Tripeptide-1",
      "Zinc PCA",
      "Niacinamide",
      "Vitamin C (Ascorbyl Glucoside)",
      "Glycerin",
      "Aqua",
    ],
    usage:
      "Apply 2–3 drops to cleansed face morning and evening. Follow with moisturiser. SPF strongly recommended for daytime use.",
    scientificResearch:
      "Copper and zinc peptide complexes have been studied in cosmetic literature for their roles in supporting an even-looking complexion, antioxidant defence and skin barrier resilience.",
    aboutIngredient: {
      name: "Copper + Zinc Peptides",
      description:
        "Copper and zinc peptides are widely used in cosmetic chemistry for their complementary roles in supporting radiance, even tone and overall skin condition.",
    },
    image: PLACEHOLDER,
  },
];

export const getPeptideBySlug = (slug: string) =>
  peptideProducts.find((p) => p.slug === slug);

export const peptideArticles = [
  {
    slug: "what-are-peptides",
    date: "December 2024",
    readTime: "5 min read",
    category: "Ingredients",
    title: "What Are Peptides? A Beginner's Guide to Skin Proteins",
    excerpt:
      "Why peptides are the most important advancement in cosmetic skincare science in the last decade — and what they actually do for your skin.",
  },
  {
    slug: "ghk-cu-copper-peptide",
    date: "November 2024",
    readTime: "6 min read",
    category: "Anti-Ageing",
    title: "GHK-Cu: The Copper Peptide Transforming Modern Skincare",
    excerpt:
      "Understanding why copper tripeptide-1 has over 50 years of peer-reviewed dermatology research behind it.",
  },
  {
    slug: "peptide-routine-sa-climate",
    date: "October 2024",
    readTime: "4 min read",
    category: "Routines",
    title: "Building a Peptide Routine for South African Climate and Skin Types",
    excerpt:
      "How UV exposure, humidity and local skin diversity affect how peptides perform on South African skin.",
  },
  {
    slug: "argireline-vs-botox",
    date: "September 2024",
    readTime: "7 min read",
    category: "Ingredients",
    title: "Argireline vs Botox: What the Research Actually Shows About Topical Peptides",
    excerpt:
      "A science-led comparison of neuromodulating cosmetic peptides and clinical injectables.",
  },
];

export const peptideCategories: { key: "all" | PeptideCategory; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "anti-ageing", label: "Anti-Ageing" },
  { key: "firming", label: "Firming" },
  { key: "brightening", label: "Brightening" },
  { key: "eye-care", label: "Eye Care" },
];

export const peptideGuideCategories = [
  "All Guides",
  "Anti-Ageing",
  "Ingredients",
  "Skin Types",
  "Routines",
];