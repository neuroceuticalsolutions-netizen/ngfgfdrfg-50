import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { getArticleBySlug } from "@/data/articles";
import NotFound from "./NotFound";

const BASE_URL = "https://neuroceutical.lovable.app";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <NotFound />;

  // Simple markdown-to-JSX renderer for headings, paragraphs, lists, tables, bold/italic
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let key = 0;

    const parseInline = (text: string) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim() === "") {
        i++;
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="heading-lg text-royal-purple mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="heading-sm text-grey-900 mt-8 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- **")) {
        elements.push(
          <li
            key={key++}
            className="body-md text-grey-600 ml-6 mb-2 list-disc"
            dangerouslySetInnerHTML={{ __html: parseInline(line.replace("- ", "")) }}
          />
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={key++} className="body-md text-grey-600 ml-6 mb-2 list-disc">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
        elements.push(
          <li
            key={key++}
            className="body-md text-grey-600 ml-6 mb-2 list-decimal"
            dangerouslySetInnerHTML={{ __html: parseInline(line.replace(/^\d+\.\s/, "")) }}
          />
        );
      } else if (line.startsWith("|")) {
        // Skip table rows — render as styled text
        const cells = line.split("|").filter(c => c.trim() && !c.trim().match(/^-+$/));
        if (cells.length > 0 && !line.includes("---")) {
          elements.push(
            <div key={key++} className="body-md text-grey-600 mb-1 font-mono text-sm">
              {cells.map(c => c.trim()).join(" · ")}
            </div>
          );
        }
      } else {
        elements.push(
          <p
            key={key++}
            className="body-md text-grey-600 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        path={`/articles/${article.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Newsletter", url: `${BASE_URL}/newsletter` },
          { name: article.title, url: `${BASE_URL}/articles/${article.slug}` },
        ]}
      />
      <Navigation />

      <section className="pt-28 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/newsletter#recent-newsletters"
              className="text-royal-purple hover:text-royal-purple/80 transition-colors text-sm font-medium mb-6 inline-block"
            >
              ← Back to Newsletter
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{article.date}</Badge>
              <span className="text-sm text-grey-500">{article.readTime}</span>
            </div>
            <h1 className="heading-xl text-royal-purple mb-4">{article.title}</h1>
            <p className="body-lg text-grey-600">{article.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">{renderContent(article.content)}</div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ArticleDetail;
