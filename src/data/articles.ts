export type ArticleCategory =
  | "stress-relief"
  | "mental-fatigue"
  | "cognitive-performance"
  | "nootropic-science";

export interface Article {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  category?: ArticleCategory;
  keywords?: string;
}

export const articles: Article[] = [
  {
    slug: "science-of-neuroplasticity",
    title: "The Science of Neuroplasticity: How Your Brain Adapts",
    date: "December 2024",
    readTime: "5 min read",
    excerpt: "Discover how specific compounds can enhance your brain's ability to form new neural connections and adapt to challenges.",
    category: "nootropic-science",
    keywords: "neuroplasticity, brain adaptation, nootropics south africa, cognitive enhancement SA",
    content: `
## What Is Neuroplasticity?

Neuroplasticity — also known as neural plasticity or brain plasticity — is the brain's ability to reorganise itself by forming new neural connections throughout life. This remarkable capability allows neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment.

## Why It Matters for Cognitive Enhancement

Understanding neuroplasticity is fundamental to the science of nootropics and cognitive enhancement. When we talk about "boosting brain power," we're really talking about leveraging the brain's innate ability to rewire and strengthen itself.

### Key Mechanisms

1. **Synaptic Plasticity** — The strengthening or weakening of synapses (connections between neurons) based on activity levels. This is the foundation of learning and memory.

2. **Structural Plasticity** — The brain's ability to physically change its structure by growing new neurons (neurogenesis) or forming new synaptic connections.

3. **Functional Plasticity** — The brain's ability to move functions from damaged areas to undamaged areas, demonstrating remarkable resilience.

## Compounds That Support Neuroplasticity

Several natural compounds have been shown in research to support and enhance neuroplasticity:

### Lion's Mane Mushroom
Lion's Mane contains compounds called hericenones and erinacines that stimulate the production of Nerve Growth Factor (NGF). NGF is crucial for the growth, maintenance, and survival of neurons — making Lion's Mane one of the most promising natural nootropics for supporting neuroplasticity.

### Omega-3 Fatty Acids (DHA)
DHA, a type of omega-3 fatty acid, is a major structural component of the brain. Research shows that adequate DHA intake supports synaptic plasticity and may enhance learning and memory processes.

### Bacopa Monnieri
This traditional Ayurvedic herb has been shown to support dendrite branching — the tree-like extensions of neurons that receive signals from other neurons. More branches mean more connections and potentially better cognitive function.

### Phosphatidylserine
A phospholipid found in high concentrations in the brain, phosphatidylserine supports cell membrane integrity and has been shown to improve memory, concentration, and overall cognitive function.

## Practical Steps to Enhance Neuroplasticity

Beyond supplementation, several lifestyle factors powerfully influence neuroplasticity:

- **Regular Exercise** — Physical activity increases Brain-Derived Neurotrophic Factor (BDNF), a protein that supports neuroplasticity
- **Quality Sleep** — During sleep, the brain consolidates memories and clears metabolic waste products
- **Mindfulness Meditation** — Research shows meditation can physically change brain structure, increasing grey matter density
- **Novel Experiences** — Learning new skills and exposing yourself to new environments stimulates neural growth
- **Social Connection** — Meaningful social interactions activate multiple brain networks simultaneously

## The Bottom Line

Neuroplasticity means your brain is never "set in stone." Whether you're 25 or 65, your brain retains the remarkable ability to adapt, learn, and grow. By combining targeted supplementation with healthy lifestyle practices, you can actively support your brain's natural capacity for change and improvement.

The science is clear: cognitive enhancement isn't about taking a magic pill — it's about creating the optimal conditions for your brain to do what it does best: adapt and thrive.
    `
  },
  {
    slug: "caffeine-l-theanine-cognitive-combination",
    title: "Caffeine + L-theanine: The Perfect Cognitive Combination",
    date: "November 2024",
    readTime: "4 min read",
    excerpt: "Breaking down the research behind this popular nootropic stack and how to optimize dosing for maximum benefit.",
    category: "cognitive-performance",
    keywords: "caffeine l-theanine south africa, nootropic stack SA, focus supplements johannesburg",
    content: `
## The Most Popular Nootropic Stack

If you're new to the world of cognitive enhancement, there's one combination that consistently tops every "best nootropic stacks" list: caffeine paired with L-theanine. This duo has been extensively studied and is beloved by everyone from students to executives for its ability to deliver clean, focused energy without the jitters.

## Understanding Each Component

### Caffeine
Caffeine is the world's most widely consumed psychoactive substance. It works primarily by blocking adenosine receptors in the brain, which reduces feelings of tiredness and increases alertness. However, caffeine alone can cause:

- Anxiety and jitteriness
- Increased heart rate
- Energy crashes
- Disrupted sleep patterns

### L-theanine
L-theanine is an amino acid found naturally in tea leaves, particularly green tea. It promotes relaxation without sedation by:

- Increasing alpha brain wave activity (associated with calm focus)
- Boosting GABA, serotonin, and dopamine levels
- Reducing stress and anxiety
- Smoothing out the stimulant effects of caffeine

## Why They Work Better Together

The magic of this combination lies in synergy. Research published in *Nutritional Neuroscience* found that the caffeine + L-theanine combination produces benefits that neither compound achieves alone:

### The Evidence

- **Improved Attention**: A 2008 study found the combination significantly improved both speed and accuracy of attention-switching tasks
- **Reduced Susceptibility to Distraction**: Participants showed better ability to ignore irrelevant stimuli during demanding cognitive tasks
- **Enhanced Working Memory**: Multiple studies show improvements in working memory performance with the combination
- **Mood Enhancement**: The combination improved self-reported alertness and reduced self-reported tiredness and headache more than either compound alone

## Optimal Dosing

The most commonly studied and recommended ratio is **1:2 (caffeine:L-theanine)**:

| Dosage Level | Caffeine | L-theanine | Best For |
|---|---|---|---|
| Low | 50mg | 100mg | Mild focus, first-time users |
| Medium | 100mg | 200mg | Sustained work sessions |
| High | 200mg | 400mg | Intense focus demands |

**Pro tip**: Start with the low dose to assess your tolerance, then adjust upward as needed. Most people find the medium dose (100mg caffeine / 200mg L-theanine) to be the sweet spot.

## Natural Sources

You don't necessarily need supplements to get this combination:

- **Matcha Green Tea** — Contains both caffeine and L-theanine naturally, in roughly the ideal ratio. This is why matcha has been prized by Japanese monks for centuries as an aid to meditation and focused work.
- **Green Tea + Coffee** — Drink a cup of green tea alongside a half-cup of coffee for a DIY version of this stack.

## When to Take It

- **Morning productivity**: Take 30 minutes before your most demanding work
- **Pre-study sessions**: Ideal for learning and information retention
- **Before creative work**: The calm focus state is excellent for creative tasks
- **Avoid after 2pm**: The caffeine component can still affect sleep if taken too late

## The Bottom Line

The caffeine + L-theanine combination represents the gold standard of nootropic stacking: well-researched, widely available, affordable, and effective. If you're looking for your first step into cognitive enhancement, this is the place to start.

For those interested in a natural source of this combination, matcha green tea — like the products available from our partner Naoki Matcha — provides both compounds in a naturally balanced ratio.
    `
  },
  {
    slug: "managing-stress-cognitive-performance",
    title: "Managing Stress for Better Cognitive Performance",
    date: "October 2024",
    readTime: "6 min read",
    excerpt: "Evidence-based strategies for reducing cortisol and improving mental resilience through natural adaptogens.",
    category: "stress-relief",
    keywords: "stress relief south africa, cortisol management SA, adaptogens south africa, ashwagandha SA",
    content: `
## The Stress-Cognition Connection

Stress is one of the biggest enemies of cognitive performance. When your body activates its stress response, it prioritises survival over higher-order thinking. Chronic stress physically reshapes your brain, shrinking the prefrontal cortex (responsible for decision-making and focus) while enlarging the amygdala (your fear centre).

Understanding this connection is the first step toward protecting and enhancing your cognitive function.

## How Cortisol Affects Your Brain

Cortisol, often called the "stress hormone," has a complex relationship with cognitive function:

### Short-term (Acute Stress)
- Temporarily boosts alertness and focus
- Enhances memory consolidation for survival-relevant information
- Increases available energy for immediate action

### Long-term (Chronic Stress)
- Impairs working memory and recall
- Reduces ability to concentrate
- Disrupts sleep architecture
- Accelerates cognitive ageing
- May contribute to neurodegenerative conditions

## Natural Adaptogens for Stress Management

Adaptogens are natural compounds that help your body adapt to stress by modulating the stress response. Here are the most evidence-backed options:

### Ashwagandha (Withania somnifera)
Perhaps the most well-studied adaptogen, ashwagandha has been shown to:
- Reduce cortisol levels by up to 30% in clinical trials
- Improve resistance to stress
- Enhance memory and cognitive function
- Support quality sleep

**Recommended dose**: 300-600mg of root extract daily

### Rhodiola Rosea
This Scandinavian herb excels at combating mental fatigue:
- Improves mental performance under stress conditions
- Reduces burnout symptoms
- Enhances physical and mental stamina
- Works within 30 minutes of ingestion

**Recommended dose**: 200-400mg daily

### Holy Basil (Tulsi)
A staple of Ayurvedic medicine, holy basil:
- Acts as a natural anxiolytic (anti-anxiety compound)
- Supports healthy cortisol metabolism
- Provides antioxidant protection for brain cells
- Enhances cognitive clarity

**Recommended dose**: 300-600mg daily

### Panax Ginseng
One of the most ancient and respected adaptogens:
- Improves mental performance and working memory
- Reduces mental fatigue
- Supports overall stress resilience
- May enhance mood and wellbeing

**Recommended dose**: 200-400mg daily

## Lifestyle Strategies for Stress Reduction

Supplements work best when combined with evidence-based lifestyle practices:

### 1. Structured Breathing Techniques
The 4-7-8 breathing technique (inhale for 4 seconds, hold for 7, exhale for 8) activates the parasympathetic nervous system, directly counteracting the stress response. Practice this 2-3 times daily.

### 2. Regular Physical Activity
Exercise is one of the most potent stress-reducers available:
- Reduces cortisol and adrenaline
- Stimulates endorphin production
- Improves sleep quality
- Enhances neuroplasticity

Aim for at least 150 minutes of moderate activity per week.

### 3. Sleep Optimisation
Poor sleep amplifies stress, creating a vicious cycle:
- Maintain consistent sleep and wake times
- Keep your bedroom cool (18-20°C) and dark
- Avoid screens 1 hour before bed
- Consider magnesium supplementation for sleep quality

### 4. Mindfulness and Meditation
Even 10 minutes of daily meditation has been shown to:
- Reduce cortisol levels
- Increase grey matter density in the prefrontal cortex
- Improve emotional regulation
- Enhance attention and focus

### 5. Social Connection
Meaningful social interactions trigger oxytocin release, which naturally buffers against cortisol. Prioritise quality time with friends and family.

## Building a Stress-Resilience Protocol

Here's a practical daily framework for managing stress and optimising cognitive performance:

**Morning**
- 10 minutes of meditation or breathwork
- Adaptogen supplement (e.g., ashwagandha or rhodiola)
- Physical activity (even a 20-minute walk)

**Midday**
- Brief breathing exercise (2-3 minutes)
- Step outside for natural light exposure
- Social connection (lunch with a colleague)

**Evening**
- Screen-free wind-down routine
- Magnesium supplement
- Gratitude journaling (shown to reduce cortisol)

## The Bottom Line

Managing stress isn't just about feeling better — it's about performing better. By combining targeted adaptogens with evidence-based lifestyle practices, you can lower cortisol, protect your brain from the damaging effects of chronic stress, and unlock your full cognitive potential.

Remember: the goal isn't to eliminate stress entirely (some stress is beneficial), but to build resilience so that stress enhances rather than impairs your performance.
    `
  },
  {
    slug: "stress-relief-south-africa-natural-strategies",
    title: "Stress Relief in South Africa: Natural Strategies That Work",
    date: "April 2026",
    readTime: "7 min read",
    excerpt: "From load-shedding fatigue to high-pressure workdays in Johannesburg and Cape Town — practical, evidence-informed approaches to managing stress and protecting cognitive performance.",
    category: "stress-relief",
    keywords: "stress relief south africa, load shedding stress, anxiety supplements SA, ashwagandha south africa, stress management johannesburg, cortisol cape town",
    content: `
## Why Stress Hits Different in South Africa

South Africans live with a unique stress profile. Load-shedding interrupts work and sleep, long commutes through Johannesburg, Cape Town and Durban traffic eat into recovery time, and economic uncertainty keeps the nervous system on alert. The result for many is a low-grade, chronic stress state that quietly erodes focus, memory and mood.

The good news: the same physiology that makes us vulnerable to chronic stress is also remarkably responsive to evidence-informed lifestyle and supplement strategies.

## How Chronic Stress Undermines Cognition

Persistent activation of the HPA axis (your stress response system) may:

- Disrupt sleep architecture, reducing memory consolidation
- Down-regulate prefrontal cortex activity (focus, planning, decision-making)
- Increase reactivity in the amygdala (anxiety, irritability)
- Deplete neurotransmitters such as dopamine, serotonin and GABA

You don't need a clinical diagnosis to feel the effects — most knowledge workers in SA describe symptoms like "brain fog", short fuse, and difficulty winding down.

## Adaptogens Worth Knowing About

Adaptogens are plant compounds that may help the body adapt to stress. Three with the strongest evidence base:

### Ashwagandha
May support reductions in perceived stress and cortisol, alongside improvements in sleep quality. Look for standardised root extracts (not leaf).

### Rhodiola Rosea
Often studied for stress-related fatigue and burnout. Many people notice effects within the same day.

### L-theanine
Naturally found in green tea and matcha. May promote a calm, alert state without sedation — useful during stressful workdays.

## Practical, SA-Friendly Stress Routines

1. **Morning light walk (10–15 min)** — anchors your circadian rhythm; especially valuable when load-shedding has disrupted sleep.
2. **Breath-led breaks** — try 4-7-8 breathing between meetings. Free, fast, and clinically validated.
3. **Caffeine cut-off by 14:00** — protect deep sleep, which is where stress recovery actually happens.
4. **Magnesium-rich evenings** — leafy greens, legumes, dark chocolate; many South Africans run low on dietary magnesium.
5. **Connection rituals** — a short braai, a phone call, a walk with a friend. Social connection buffers cortisol.

## When Supplements May Help

Supplements don't replace sleep, exercise or therapy — they layer on top. A reasonable starting stack for SA-based knowledge workers might include an adaptogen (ashwagandha or rhodiola), L-theanine for daytime calm-focus, and magnesium for evening wind-down. Always consult a healthcare professional, particularly if you take chronic medication.

## The Bottom Line

You can't always control the stressors — but you can train your body and brain to recover faster. Combining evidence-informed routines with carefully chosen nootropic and adaptogenic support can meaningfully improve how you feel, think and perform under South African conditions.

_This article is for educational purposes and does not constitute medical advice. Consult a healthcare professional before starting any supplement._
    \`
  },
  {
    slug: "mental-fatigue-south-africa-beating-brain-fog",
    title: "Mental Fatigue & Brain Fog in SA: How to Reclaim Your Focus",
    date: "April 2026",
    readTime: "6 min read",
    excerpt: "Why so many South Africans feel mentally drained by midday — and the science-backed nutrition, sleep and nootropic strategies that help clear the fog.",
    category: "mental-fatigue",
    keywords: "mental fatigue south africa, brain fog SA, focus supplements johannesburg, anti-fatigue nootropics, rhodiola south africa, B-vitamins SA",
    content: `
## What Mental Fatigue Actually Is

Mental fatigue isn't laziness, and it isn't just "being tired". It's a measurable drop in the brain's ability to sustain attention, hold information in working memory and resist distraction. Common triggers include:

- Poor or fragmented sleep (think load-shedding wake-ups)
- Long, unbroken cognitive demand (back-to-back Zoom days)
- Blood sugar volatility from skipped meals or refined carbs
- Dehydration — easy to underestimate during a hot SA summer
- Chronic, low-grade stress

## Why Brain Fog Feels Worse Than It Sounds

When the prefrontal cortex is fatigued, you may notice:

- Re-reading the same paragraph
- Forgetting why you opened a tab
- Difficulty making small decisions
- Reaching for sugar or extra caffeine to "push through"

These are signals — not character flaws.

## Foundations First: Sleep, Hydration, Light

Before any supplement, the highest-leverage interventions remain unsexy:

1. **Sleep window** — aim for 7–9 hours, with consistent bed and wake times. Use a battery-powered sound machine or earplugs to defend against load-shedding disturbances.
2. **Morning sunlight** — 5–10 minutes outside within an hour of waking helps anchor alertness later in the day.
3. **Hydration** — aim for ~30ml per kg of bodyweight, more in heat. Even mild dehydration measurably impairs attention.
4. **Stable blood sugar** — pair carbs with protein and fat; avoid the 10am pastry crash.

## Nutrients That Support Mental Energy

- **B-vitamins (especially B12 and folate)** — essential cofactors in energy and neurotransmitter production. Deficiencies are common in vegetarians and older adults.
- **Iron** — low iron stores (even without anaemia) are a frequent, overlooked cause of fatigue, especially in menstruating women.
- **Omega-3s (EPA/DHA)** — may support brain membrane health and mood.
- **Magnesium** — supports sleep quality, which directly impacts next-day mental energy.

A simple blood panel from your GP can identify gaps worth addressing.

## Nootropic Options for Mental Fatigue

Some compounds are specifically studied for mental fatigue and sustained attention:

- **Rhodiola Rosea** — may reduce symptoms of mental fatigue, particularly under workload
- **L-theanine + caffeine** — supports alert, smooth focus without the crash typical of caffeine alone
- **Creatine monohydrate** — increasingly studied for cognitive benefits, especially during sleep deprivation
- **Lion's Mane mushroom** — investigated for longer-term cognitive support

These are tools, not miracles. They work best layered on top of solid foundations.

## A Sample Anti-Fog Day

- **07:00** — Sunlight + protein-rich breakfast + water
- **09:00** — First focused work block; matcha or L-theanine + caffeine if needed
- **11:30** — Short walk; protein-rich lunch
- **14:00** — Caffeine cut-off; switch to herbal tea or water
- **16:00** — 5-minute breathing reset between meetings
- **21:30** — Screens dim, magnesium, wind-down routine

## When to See a Professional

Persistent mental fatigue lasting weeks — especially with low mood, unexplained weight changes, or sleep problems — deserves a proper medical assessment. Conditions like thyroid dysfunction, anaemia, sleep apnoea and depression all present as "brain fog".

## The Bottom Line

Brain fog in South Africa is rarely about willpower — it's about physiology. Address the foundations, fill the nutritional gaps, and use targeted nootropics where appropriate. The clarity you're missing is usually closer than it feels.

_This article is for educational purposes only and does not constitute medical advice._
    \`
  },
  {
    slug: "cognitive-performance-south-africa-evidence-based-guide",
    title: "Cognitive Performance in South Africa: An Evidence-Based Guide",
    date: "April 2026",
    readTime: "8 min read",
    excerpt: "A practical, science-led overview of how South Africans can train, fuel and supplement for sharper focus, stronger memory and sustained mental performance.",
    category: "cognitive-performance",
    keywords: "cognitive performance south africa, focus supplements SA, memory supplements cape town, nootropics johannesburg, brain optimization south africa, study supplements SA",
    content: `
## Cognitive Performance Is Trainable

Cognitive performance — the combined output of attention, working memory, processing speed, and executive function — isn't fixed. It responds to sleep, training, nutrition and, in many cases, well-chosen supplementation.

For South African students, professionals and athletes, optimising cognition is increasingly seen as the same kind of advantage as physical conditioning.

## The Four Pillars

### 1. Sleep
Deep and REM sleep are when the brain consolidates learning, clears metabolic waste and resets attention systems. Even one night of poor sleep meaningfully impairs working memory the next day.

### 2. Movement
Regular aerobic exercise increases BDNF (brain-derived neurotrophic factor), which supports neuroplasticity. As little as 30 minutes of brisk walking, most days, makes a measurable difference over months.

### 3. Nutrition
The brain consumes roughly 20% of your daily energy. Stable blood sugar, adequate protein, omega-3s and a wide range of plant foods all support sustained cognitive output. Hydration is non-negotiable.

### 4. Cognitive Training
Deliberate practice, not casual scrolling, builds skill. Reading, writing, learning a language or instrument, and structured problem-solving all support long-term cognitive resilience.

## Evidence-Informed Nootropic Categories

| Goal | Compounds Worth Researching |
|---|---|
| Calm focus | L-theanine, matcha, magnesium |
| Alert focus | Caffeine + L-theanine, rhodiola |
| Memory & learning | Bacopa monnieri, Lion's Mane, omega-3 (DHA) |
| Stress resilience | Ashwagandha, holy basil, rhodiola |
| Long-game brain health | Omega-3, creatine, B-vitamins, exercise |

These are categories, not prescriptions. Individual response varies, and quality differences between brands are large — which is why we curate the products we distribute in South Africa to specific quality and compliance standards.

## Designing Your Personal Stack

A reasonable, low-risk approach:

1. **Start with foundations** for 2–4 weeks: sleep, exercise, hydration, nutrition.
2. **Add one variable at a time.** Try a single nootropic for 2–3 weeks, journal the effect, then decide.
3. **Cycle stimulants.** Avoid daily reliance on caffeine-heavy stacks; build in lower-dose or stimulant-free days.
4. **Re-test periodically.** What works during exam season may not be what you need in a calm month.

## Special Cases

### Students
Sleep beats cramming. A consistent schedule, light exercise and a simple stack like matcha or L-theanine + caffeine often outperforms heroic study marathons.

### Knowledge workers
Protect the first 90 minutes of the day for deep work. Use breath-led breaks. Consider rhodiola or adaptogens during high-load periods.

### Shift workers and parents of small children
Sleep is fragmented and this is a real handicap. Prioritise short naps, light exposure, and avoid leaning entirely on stimulants — adaptogens and creatine may be especially helpful.

## Safety and SA-Specific Notes

- Always check supplements against any chronic medication (especially blood pressure, thyroid, anti-depressants).
- Pregnant or breastfeeding individuals should consult a doctor before any nootropic.
- Buy from distributors who can show third-party testing and SAHPRA-aligned compliance.

## The Bottom Line

Optimising cognitive performance in South Africa isn't about chasing miracle pills — it's about stacking small, evidence-informed advantages: better sleep, smarter nutrition, deliberate training, and carefully chosen supplementation. Done consistently, the compounding effect on focus, memory and resilience is real.

_Educational content only. Always consult a healthcare professional before starting new supplements._
    \`
  }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};
