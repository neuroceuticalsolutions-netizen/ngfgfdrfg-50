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
    price: "R1,100",
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
    price: "R1,200",
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
    price: "R1,150",
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

export interface PeptideArticle {
  slug: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
}

export const peptideArticles: PeptideArticle[] = [
  {
    slug: "what-are-peptides",
    date: "December 2024",
    readTime: "5 min read",
    category: "Ingredients",
    title: "What Are Peptides? A Beginner's Guide to Skin Proteins",
    excerpt:
      "Why peptides are the most important advancement in cosmetic skincare science in the last decade — and what they actually do for your skin.",
    content: `
## What Exactly Is a Peptide?

Peptides are short chains of amino acids — the same building blocks that make up the proteins your skin is built from, including collagen, elastin and keratin. Where a full protein might contain hundreds of amino acids folded into a complex structure, a peptide is typically just two to fifty amino acids long. That smaller size is precisely what makes peptides interesting for skincare: many can penetrate the skin's outer layer far more easily than a full protein molecule ever could.

## Why Your Skin "Listens" to Peptides

Skin cells communicate constantly using small protein fragments as signals — telling fibroblasts to produce more collagen, telling damaged tissue to begin repair, telling inflammation to subside. Cosmetic chemists have identified specific peptide sequences that mimic these natural signals, then synthesised them in a lab so they can be delivered consistently in a formula. When applied topically in the right concentration and vehicle, these synthetic peptides can "speak the same language" as your skin's own signalling system.

## The Four Main Categories of Cosmetic Peptides

### Signal Peptides
These are the most common type, designed to tell skin cells to produce more of a specific protein — usually collagen or elastin. Palmitoyl Tripeptide-1 and Palmitoyl Tetrapeptide-7 (the components of Matrixyl 3000) fall into this category.

### Carrier Peptides
Carrier peptides are bonded to trace minerals like copper or manganese and ferry them into the skin, where the mineral itself supports enzymatic processes involved in wound healing and collagen formation. GHK-Cu — copper tripeptide-1 — is the best-known example, with research dating back to the 1970s.

### Neurotransmitter-Inhibiting Peptides
Sometimes called "Botox-like" peptides, these work at the muscle-nerve junction to reduce the strength of the signal that causes repeated muscle contraction — the kind of contraction responsible for expression lines around the eyes and forehead. Acetyl Hexapeptide-8 (Argireline) is the most widely used example, though its effect is considerably gentler and shorter-acting than an injectable.

### Enzyme-Inhibitor Peptides
These work by slowing the activity of enzymes that break down collagen and elastin over time, effectively helping existing skin structure last longer rather than building new structure.

## Are Peptides Actually Backed by Research?

Some peptide complexes — particularly GHK-Cu and the Matrixyl family — have a genuinely substantial body of peer-reviewed, published research behind them, including in vitro fibroblast studies and controlled trials measuring skin firmness, hydration and wrinkle depth over 8 to 12 week periods. Others have thinner evidence, often limited to manufacturer-funded studies. As a general rule, the more specific and well-documented the peptide name (rather than a vague "peptide complex"), the easier it is to find independent research to evaluate.

## How to Actually Use Peptide Skincare

A few practical principles that apply across most peptide products:

- **Consistency matters more than concentration.** Collagen remodelling is a slow biological process — most studies measure results at 8 to 12 weeks, not days.
- **Layer thoughtfully.** Peptides are generally compatible with hyaluronic acid, niacinamide and ceramides. Strong acids (high-percentage AHAs/BHAs) and copper peptides are usually better used at different times of day, since copper can interact with vitamin C and certain acids.
- **Sun protection is non-negotiable.** UV exposure breaks down collagen faster than any peptide can rebuild it — daily SPF is what protects the investment you're making with a peptide serum.
- **Patch test new products.** Peptides are generally well tolerated, but any new active should be introduced gradually, especially for sensitive skin.

## The Bottom Line

Peptides aren't a single ingredient with a single effect — they're a broad toolkit, each type signalling something different to your skin. Understanding which category a peptide falls into (and how much independent research actually backs it) is the most useful filter for separating genuinely well-formulated products from marketing dressed up in scientific language.

_This article is for educational purposes only and does not constitute medical advice. Cosmetic peptides are not intended to diagnose, treat, cure or prevent any disease._
`,
  },
  {
    slug: "ghk-cu-copper-peptide",
    date: "November 2024",
    readTime: "6 min read",
    category: "Anti-Ageing",
    title: "GHK-Cu: The Copper Peptide Transforming Modern Skincare",
    excerpt:
      "Understanding why copper tripeptide-1 has over 50 years of peer-reviewed dermatology research behind it.",
    content: `
## A Peptide Discovered by Accident

GHK-Cu's story begins not in a cosmetics lab but in a hospital. In 1973, biochemist Loren Pickart noticed that blood plasma from younger patients caused liver cells from older patients to behave more like young cells when the two were combined in culture. The active component responsible turned out to be a small tripeptide — glycyl-L-histidyl-L-lysine — that naturally binds copper ions in the body. That copper-bound form became known as GHK-Cu.

## What It Actually Does in Skin

GHK-Cu is classified as a carrier peptide: the copper it transports supports the activity of enzymes (including lysyl oxidase) involved in forming and cross-linking collagen and elastin. In laboratory studies using human dermal fibroblasts, GHK-Cu has been shown to increase production of collagen, elastin and glycosaminoglycans — the structural components responsible for skin's firmness and hydration. It has also been studied for its role in modulating gene expression linked to tissue remodelling and antioxidant defence.

## The Research Behind It

GHK-Cu has one of the longer published research histories of any cosmetic peptide, spanning roughly five decades. Independent studies — including randomised, double-blind clinical trials — have measured outcomes such as increased skin thickness, improved hydration, smoother skin texture and increased collagen I production following topical application of copper tripeptide complexes. Its wound-healing properties have also been studied extensively, including in diabetic ulcer and post-surgical wound research, which is a separate body of evidence from its cosmetic anti-ageing applications.

It's worth noting that not every study finds dramatic results: a controlled trial evaluating GHK-Cu specifically for improving the appearance of wrinkles after CO2 laser resurfacing did not find a statistically significant independent benefit in that particular context, even though the same complex had shown clearer benefits in studies on untreated, photoaged skin. This is a useful reminder that "well-researched" doesn't mean "every study shows the same result" — and that combining peptides with other treatments can make individual ingredient contributions harder to isolate.

## Why It's Often Paired With Other Actives

Because copper can interact with certain ingredients — particularly high-strength vitamin C and direct-acid exfoliants — GHK-Cu products are usually formulated to be used at a different time of day from those actives, or in a simplified routine that limits competing ingredients in the same application.

## What to Expect in Practice

GHK-Cu is generally well tolerated at the low concentrations used in finished cosmetic products, though it can occasionally cause mild irritation in sensitive skin, particularly at higher concentrations used in some research formulations. As with most peptide actives, visible changes in firmness and texture are typically reported after several weeks of consistent twice-daily use rather than immediately.

## The Bottom Line

Few cosmetic peptides carry as long or as varied a research history as GHK-Cu. From its accidental discovery in blood plasma to its current use in collagen-supporting serums, it remains one of the better-documented actives in the category — while still being subject to the same nuance as any cosmetic ingredient: results vary by formulation, concentration, and the skin it's being used on.

_This article is for educational purposes only and does not constitute medical advice. Cosmetic peptides are not intended to diagnose, treat, cure or prevent any disease._
`,
  },
  {
    slug: "peptide-routine-sa-climate",
    date: "October 2024",
    readTime: "4 min read",
    category: "Routines",
    title: "Building a Peptide Routine for South African Climate and Skin Types",
    excerpt:
      "How UV exposure, humidity and local skin diversity affect how peptides perform on South African skin.",
    content: `
## Why Climate Actually Matters for Peptide Skincare

South Africa's climate is unusually varied for a single country — the humid subtropical coast of Durban, the dry Highveld winters of Johannesburg and Pretoria, and the Mediterranean-style seasons of Cape Town all place different demands on skin. Peptides themselves don't change chemically because of climate, but the conditions your skin barrier is dealing with directly affect how well any active — including peptides — can actually do its job.

## UV Exposure: The Single Biggest Factor

South Africa's UV index is high for much of the year, even in winter at altitude. This matters enormously for peptide skincare specifically because peptides like GHK-Cu and Matrixyl 3000 work by encouraging collagen production — and UV radiation is one of the most potent collagen-degrading forces there is. Using a peptide serum without consistent daily SPF is, in practical terms, asking the product to rebuild something that sun exposure is simultaneously breaking down. A broad-spectrum SPF 30–50, reapplied through the day, is the single highest-leverage step in any SA peptide routine.

## Humidity and Barrier Function

In humid coastal regions, skin tends to hold moisture more easily, which can make richer peptide moisturisers feel heavy — lighter serum textures are often a better fit. In drier inland regions, especially during Highveld winters, the skin barrier is more prone to transepidermal water loss, and pairing peptides with humectants like hyaluronic acid and barrier-supporting ingredients like ceramides becomes more important to keep the skin's environment receptive to active ingredients in the first place.

## Building an AM/PM Routine

### Morning
1. Gentle cleanser
2. Peptide serum (apply to slightly damp skin for better absorption)
3. Moisturiser suited to your climate zone (lighter gel for humid coastal areas, richer cream for dry Highveld winters)
4. Broad-spectrum SPF 30–50, non-negotiable

### Evening
1. Double cleanse if you've worn sunscreen and makeup
2. Peptide serum
3. Eye contour treatment if using one (apply gently with the ring finger)
4. Night moisturiser or facial oil to support barrier repair overnight

## Adjusting for Different Skin Types

- **Oily/combination skin (common in humid coastal climates):** lighter gel-textured peptide serums layered under an oil-free moisturiser tend to perform best.
- **Dry skin (common in dry Highveld conditions, especially winter):** richer peptide-infused creams, or layering a peptide serum under a facial oil, helps offset moisture loss.
- **Sensitive or reactive skin:** introduce one new peptide product at a time, patch test, and avoid combining multiple new actives (peptides, acids, retinoids) in the same week.
- **Deeper skin tones:** be especially consistent with SPF, since post-inflammatory hyperpigmentation can be more visible and more persistent — peptides that support an even tone (such as copper and zinc complexes) can be a useful complement to a brightening-focused routine.

## A Note on Load-Shedding and Storage

Many peptide formulations are more stable at consistent, cooler temperatures. If your home regularly experiences load-shedding-related temperature swings, storing peptide serums away from direct sunlight and heat sources (not necessarily the fridge, unless the product specifically recommends it) helps preserve the active ingredient's stability for longer.

## The Bottom Line

There's no single "correct" peptide routine for South Africa — there's a routine that accounts for your specific climate zone, skin type, and the realities of daily SA life. Consistency, sun protection, and matching texture to climate will do more for your results than any single hero ingredient.

_This article is for educational purposes only and does not constitute medical advice._
`,
  },
  {
    slug: "argireline-vs-botox",
    date: "September 2024",
    readTime: "7 min read",
    category: "Ingredients",
    title: "Argireline vs Botox: What the Research Actually Shows About Topical Peptides",
    excerpt:
      "A science-led comparison of neuromodulating cosmetic peptides and clinical injectables.",
    content: `
## Two Very Different Approaches to the Same Problem

Both Botox (botulinum toxin type A) and Argireline (Acetyl Hexapeptide-8) target the same underlying cause of expression lines: repeated muscle contraction from facial movement. Beyond that shared goal, they are fundamentally different products, with different mechanisms, different evidence bases, and very different levels of effect.

## How Botox Actually Works

Botulinum toxin is injected directly into a targeted muscle, where it cleaves a protein (SNAP-25) required for the nerve signal that triggers muscle contraction. With that signal effectively blocked, the muscle can't contract as forcefully, smoothing the skin above it. The effect typically lasts three to four months and requires a trained medical professional to administer.

## How Argireline Works (and Why It's Weaker)

Argireline is a topical peptide that mimics part of the same SNARE protein complex Botox targets, but it works from the outside in rather than through injection, and through partial inhibition rather than enzymatic cleavage. In simple terms, it competes for a docking site involved in releasing the neurotransmitter that triggers contraction, modestly reducing — rather than blocking — the signal. It cannot achieve the same depth of muscle relaxation as an injectable, and most of it has to first penetrate the skin barrier, which independent reviews note is a real limitation given the peptide's size and water-loving structure.

## What the Evidence Actually Shows

This is where honesty matters more than marketing. The research picture is genuinely mixed:

- Manufacturer-affiliated studies have reported measurable reductions in wrinkle depth — in the range of 15–30% — after two to four weeks of twice-daily topical use.
- A peer-reviewed clinical trial published in 2013 in a dermatology journal found a statistically significant anti-wrinkle effect in Chinese subjects using a topical Argireline formulation.
- However, the only known fully independent evaluation using objective skin-analysis equipment (rather than manufacturer-run testing) found no statistically significant difference between Argireline and a control, and its author concluded the ingredient should not be considered an alternative to botulinum toxin.
- A 2025 literature review summarised the overall picture as: Argireline may improve wrinkle appearance, but the degree of benefit is unclear due to inconsistent testing methods across studies, and results are more consistent when it's combined with other peptides in a multi-active formula rather than used alone.

## So Is It Worth Using?

Argireline is not a substitute for Botox, and any product or claim suggesting otherwise should be treated with scepticism. What it can reasonably offer is a non-invasive, needle-free option that may produce a modest, gradual softening effect on expression lines with consistent use — particularly when formulated alongside complementary peptides like Matrixyl 3000, which work through a different mechanism (supporting collagen production rather than reducing muscle signalling). A 2023 study published in the Journal of Cosmetic Dermatology testing a combination eye serum containing Argireline, Matrixyl 3000 and Eyeliss found a meaningful reduction in eye-area wrinkle count over 28 days of use — though because it tested a combination formula, Argireline's individual contribution can't be cleanly separated from the other actives.

## A Fair Way to Think About It

If you're choosing between Botox and a topical peptide because you want a dramatic, predictable, several-month result, Argireline isn't the right comparison — that's a conversation to have with a medical professional about injectables. If you're looking for a lower-commitment, lower-risk addition to a broader anti-ageing routine, and you're comfortable with a more modest and gradual effect, Argireline-containing formulas (especially multi-peptide ones) have a reasonable, if mixed, evidence base supporting that more limited claim.

## The Bottom Line

Argireline and Botox are sometimes marketed as if they're interchangeable — they aren't. They differ in mechanism, depth of effect, and the certainty of the evidence behind them. Treating Argireline as a complementary, modest-effect topical ingredient — rather than "Botox in a bottle" — is both the more accurate and the more honest way to think about it.

_This article is for educational purposes only and does not constitute medical advice. Individual results vary, and topical peptides are not a substitute for medical treatments such as botulinum toxin injections — consult a qualified professional for advice on injectable treatments._
`,
  },
];

export const getPeptideArticleBySlug = (slug: string) =>
  peptideArticles.find((a) => a.slug === slug);

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