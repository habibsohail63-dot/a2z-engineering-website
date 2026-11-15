import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, CalendarDays } from 'lucide-react';
import { PageHero, Eyebrow, CTABand } from '@/components/site/Sections';
import { images, pageHead } from '@/data/site';

const articles = [
  { category: 'Planning', read: '5 min read', title: 'What to consider before starting a home construction project', intro: 'A practical starting checklist for turning an idea into a clear, manageable construction brief.', points: ['Define the purpose, size, and priorities of the building before discussing finishes.', 'Review the plot, access, ground conditions, and any site constraints with qualified professionals.', 'Use approved drawings and a written scope to clarify responsibilities and reduce misunderstandings.', 'Keep a realistic contingency in the budget for changes and unforeseen site conditions.'] },
  { category: 'Construction basics', read: '4 min read', title: 'Grey structure and turnkey construction: understanding the difference', intro: 'These terms describe different scopes of work. Knowing what each includes helps you compare proposals fairly.', points: ['Grey structure generally covers the main structural shell and agreed masonry work.', 'A turnkey scope usually brings structural work and finishing activities together under one coordinated agreement.', 'The exact inclusions vary, so compare written scope lists rather than relying on the label alone.', 'Ask how materials, variations, quality checks, and handover responsibilities will be handled.'] },
  { category: 'Budgeting', read: '6 min read', title: 'How to plan a more reliable construction budget', intro: 'A useful budget starts with a defined scope, realistic assumptions, and a clear way to track decisions.', points: ['Start with drawings, covered area, specifications, and a clear schedule of included work.', 'Separate structural, finishing, external, professional, and approval-related costs where relevant.', 'Compare quotations on matching specifications and quantities, not only on the final total.', 'Treat online calculators as early planning guides, not final quotations.'] },
  { category: 'Materials & finishes', read: '5 min read', title: 'Choosing construction materials with long-term use in mind', intro: 'Material decisions affect durability, maintenance, comfort, and the overall character of a space.', points: ['Choose materials for their intended use, exposure, and maintenance needs.', 'Review samples and technical specifications before final selection.', 'Consider workmanship and installation requirements alongside the material itself.', 'Confirm availability and current pricing with suppliers before locking the project budget.'] },
];

export const Route = createFileRoute('/blog')({
  head: () => pageHead('Construction Insights & Guides', 'Practical construction planning, budgeting, materials, and project guidance from A2Z Engineering Solutions.'),
  component: Blog,
});

function Blog() {
  return <>
    <PageHero title="Ideas that build with you." subtitle="Practical guidance for planning, understanding, and making informed construction decisions." eyebrow="A2Z / Construction journal" image={images.interior} />
    <section className="section blog-section"><div className="site-container">
      <div className="blog-intro"><div><Eyebrow>Knowledge / Planning / Construction</Eyebrow><h2 className="section-heading">A clearer view<br/><em>of every stage.</em></h2></div><p className="body-copy">Explore straightforward guides to construction scopes, project preparation, budgeting, and material choices. These articles are general information, not engineering, legal, or project-specific advice.</p></div>
      <div className="blog-grid">{articles.map((article, index) => <article className="blog-card" key={article.title}><div className="blog-card-top"><span><BookOpen size={16}/>{article.category}</span><span><CalendarDays size={15}/>{article.read}</span></div><span className="blog-number">0{index + 1}</span><h3>{article.title}</h3><p>{article.intro}</p><ul>{article.points.map((point) => <li key={point}>{point}</li>)}</ul><a href="#blog-contact" className="text-link">Discuss your project <ArrowUpRight size={17}/></a></article>)}</div>
    </div></section>
    <div id="blog-contact"><CTABand/></div>
  </>;
}
