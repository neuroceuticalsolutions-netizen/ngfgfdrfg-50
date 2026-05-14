import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { PageDisclaimer } from "@/components/PageDisclaimer";
import { Link } from "react-router-dom";

const BASE_URL = "https://neuroceutical.lovable.app";

const focusFaqs = [
  {
    question: "How can I improve my focus naturally?",
    answer:
      "Natural focus improvement typically involves a combination of lifestyle habits and targeted supplementation. Evidence-informed strategies include getting consistent quality sleep, managing stress through breathwork or meditation, staying physically active, and minimising distractions during deep-work periods. Certain natural compounds — such as L-theanine, caffeine, and adaptogens like rhodiola — may support sustained attention when used as part of a broader wellness routine. Always consult a healthcare professional before starting any new supplement.",
  },
  {
    question: "What are the best natural supplements for focus and concentration?",
    answer:
      "Several natural compounds have been studied for their potential to support focus and concentration. L-theanine — often paired with caffeine — may promote a calm, alert state. Bacopa monnieri has a long history of use in traditional medicine and may support memory and attention over time. Rhodiola rosea may help with mental fatigue during demanding tasks, and phosphatidylserine may support overall cognitive function. The right choice depends on your individual needs, lifestyle, and any medications you may be taking.",
  },
  {
    question: "Can nootropics help with brain fog?",
    answer:
      "Nootropics and adaptogens may support mental clarity for some individuals experiencing brain fog, particularly when the fog is linked to poor sleep, stress, or nutritional gaps. Compounds such as lion's mane mushroom, omega-3 fatty acids, and B-vitamins may support brain health and cognitive function. However, brain fog can also be a symptom of underlying medical conditions, so it is important to consult a qualified healthcare professional if symptoms persist.",
  },
  {
    question: "How do I improve both memory and focus at the same time?",
    answer:
      "Memory and focus are closely linked cognitive functions that tend to benefit from the same foundational habits: consistent sleep, regular exercise, stress management, and a nutrient-dense diet. Supplements that may support both include bacopa monnieri (traditionally used for memory and learning), ginkgo biloba (which may support blood flow to the brain), and phosphatidylserine (a key component of cell membranes in the brain). Combining these with active learning techniques — such as spaced repetition and deliberate practice — may yield the best results.",
  },
  {
    question: "What is the caffeine and L-theanine combination, and does it work?",
    answer:
      "The caffeine + L-theanine stack is one of the most researched nootropic combinations. Caffeine promotes alertness, while L-theanine — an amino acid found in green tea — may promote relaxation without sedation. Together, they may support smooth, jitter-free focus. Research suggests this pairing can improve attention-switching speed and accuracy while reducing some of the less desirable side effects of caffeine alone, such as anxiety or energy crashes. Matcha green tea naturally contains both compounds in a balanced ratio.",
  },
  {
    question: "How can I reduce mental fatigue during long workdays?",
    answer:
      "Mental fatigue often builds up when the brain is deprived of recovery opportunities. Practical strategies include taking short movement breaks every 60–90 minutes, stepping outside for natural light, staying hydrated, and eating balanced meals that avoid sharp blood-sugar spikes. Adaptogens such as rhodiola rosea and ashwagandha may support resilience to stress-related fatigue. In the South African context, where load-shedding and long commutes can disrupt routines, protecting sleep and building consistent recovery habits is especially important.",
  },
  {
    question: "Are natural focus supplements safe?",
    answer:
      "Most natural focus supplements are well tolerated by healthy adults when used at recommended doses. However, safety depends on individual health status, existing medications, and product quality. Some supplements can interact with prescription drugs — for example, ginkgo biloba may affect blood thinning, and stimulatory compounds may not be suitable for people with certain heart conditions. Always purchase from reputable sources, look for third-party testing where available, and consult a healthcare professional before starting any new supplement regimen, especially if you are pregnant, breastfeeding, or on chronic medication.",
  },
  {
    question: "How long does it take to notice results from focus supplements?",
    answer:
      "It varies by compound. Some supplements — such as caffeine + L-theanine — may produce noticeable effects within 30–60 minutes. Others, like bacopa monnieri, are thought to work cumulatively and may require several weeks of consistent use before benefits become apparent. Adaptogens such as ashwagandha and rhodiola typically need a few days to a few weeks of regular use. Patience and consistency are key, and supplements work best when combined with healthy lifestyle habits rather than used as a quick fix.",
  },
  {
    question: "Can I improve focus without taking supplements?",
    answer:
      "Yes. Non-supplement strategies form the foundation of sustainable focus improvement. These include optimising sleep hygiene (consistent bedtime, cool dark room, limited evening screens), practising time-blocking or the Pomodoro technique during work, reducing digital distractions, exercising regularly, and managing stress through breathwork or mindfulness. Nutrition also plays a major role — adequate protein, healthy fats, and complex carbohydrates support stable energy and brain function throughout the day.",
  },
  {
    question: "Where can I buy quality nootropics and focus supplements in South Africa?",
    answer:
      "Neuroceutical Solutions distributes science-backed nootropic and cognitive enhancement products from verified international brands to consumers across South Africa. We work with partners who meet strict quality and compliance standards, including proper documentation and SAHPRA-aligned labelling. You can browse our curated product range on our products page, or learn more about the science behind our offerings in our guides section.",
  },
];

const FocusFaqs = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="How to Improve Focus Naturally | Nootropics SA FAQs"
        description="Evidence-informed answers to the most searched questions about improving focus naturally. Learn about nootropics, brain fog, concentration supplements and cognitive enhancement in South Africa."
        path="/focus"
        keywords="how to improve focus naturally, nootropics for focus south africa, brain fog supplements SA, natural focus supplements, concentration nootropics, mental clarity south africa, caffeine l-theanine SA, rhodiola rosea south africa, bacopa monnieri SA"
      />
      <FAQSchema faqs={focusFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Focus FAQs", url: `${BASE_URL}/focus` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-royal-purple to-royal-purple/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-white mb-4 animate-fade-in-up">
              Improving Focus Naturally
            </h1>
            <p className="body-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Evidence-informed answers to the questions South Africans ask most about focus, brain fog, concentration and natural cognitive enhancement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {focusFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-grey-200 rounded-xl mb-4 px-6 bg-white shadow-medium">
                  <AccordionTrigger className="text-left text-royal-purple font-semibold text-base hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-grey-600 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-sm text-royal-purple mb-4">Explore More</h2>
            <p className="body-md text-grey-600 mb-6">
              Dive deeper into the science of cognitive enhancement with our guides and product range.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/guides">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-royal-purple text-white rounded-full font-medium hover:bg-royal-purple/90 transition-colors">
                  Browse Guides
                </span>
              </Link>
              <Link to="/products">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-white text-royal-purple border border-royal-purple rounded-full font-medium hover:bg-royal-purple/5 transition-colors">
                  View Products
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PageDisclaimer variant="home" />
      <Footer />
    </main>
  );
};

export default FocusFaqs;
