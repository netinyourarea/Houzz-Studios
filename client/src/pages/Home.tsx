import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, materials, products, projects, formatPrice } from "@/data/siteData";
import { ArrowLink, Eyebrow, Media, PageMeta, RoundLink, SectionLabel } from "@/components/site/Primitives";

function MaterialJournal() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-material-index]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveIndex(Number((entry.target as HTMLElement).dataset.materialIndex));
      }
    }, { rootMargin: "-35% 0px -45% 0px", threshold: 0 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  const current = materials[activeIndex] ?? materials[0];
  return <section className="materials-journal section-pad" aria-labelledby="materials-title">
    <div className="materials-journal__intro"><Eyebrow>THE MATERIAL JOURNAL</Eyebrow><h2 id="materials-title">A closer look<br />at what lasts.</h2><p>Material is never only a finish. It is the first thing you feel, and the detail you notice years later.</p></div>
    <div className="materials-journal__story">
      <div className="materials-journal__image"><Media key={current.name} src={current.image} alt={`${current.name.toLowerCase()} material detail`} /></div>
      <div className="materials-journal__copy">
        {materials.map((material, index) => <article key={material.name} data-material-index={index} className={`material-note${activeIndex === index ? " is-active" : ""}`}>
          <span className="material-note__index">0{index + 1}</span><div><p className="eyebrow">{material.name}</p><h3>{material.line}</h3><p>{material.detail}</p></div><span className="material-note__rule" />
        </article>)}
      </div>
    </div>
    <div className="materials-journal__mobile-images" aria-label="Material photography">
      {materials.map((material) => <figure key={material.name}><Media src={material.image} alt={`${material.name.toLowerCase()} close-up`} /><figcaption>{material.name}</figcaption></figure>)}
    </div>
  </section>;
}

export default function Home() {
  const featured = products.slice(0, 4);
  return <>
    <PageMeta meta={{ title: "HOUZZ STUDIOS — Furniture That Defines Your Space", description: "Thoughtfully designed furniture and interiors for modern living. Discover considered pieces, material stories and spaces designed around you." }} />
    <section className="home-hero" aria-labelledby="home-title">
      <Media src="/images/hero-living.jpg" alt="Sculptural furniture in a warm modern residence opening to a mountain view" priority className="home-hero__photo" />
      <div className="home-hero__shade" />
      <div className="home-hero__content"><Eyebrow light>FURNITURE / INTERIORS / DESIGN</Eyebrow><h1 id="home-title">Furniture That<br /><em>Defines Your Space</em></h1><p>Thoughtfully designed furniture and interiors for modern living.</p><div className="home-hero__actions"><Link className="button button--light" href="/furniture">Explore Collection <ArrowRight size={16} /></Link><Link className="hero-text-link" href="/interior-design">Discover Interior Design <ArrowUpRight size={15} /></Link></div></div>
      <div className="home-hero__index"><span>01</span><span className="hero-index-rule" /><span>09</span></div>
      <a className="scroll-cue" href="#discovery"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} strokeWidth={1.4} /></a>
      <div className="hero-caption">A HOME, THOUGHTFULLY CONSIDERED · 01 / 09</div>
    </section>

    <section id="discovery" className="category-discovery section-pad">
      <div className="category-discovery__intro"><Eyebrow>EXPLORE</Eyebrow><h2>Find What<br /><em>Fits Your Style</em></h2><p>Objects with a point of view, made to belong in your everyday.</p><ArrowLink href="/furniture">View all furniture</ArrowLink></div>
      <div className="category-rail" aria-label="Explore furniture categories">
        {categories.map((category, index) => <Link className={`category-panel category-panel--${index + 1}`} href={`/furniture/category/${category.slug}`} key={category.slug}>
          <Media src={category.image} alt={`${category.name} furniture in a warm natural interior`} />
          <span className="category-panel__wash" />
          <span className="category-panel__number">0{index + 1}</span>
          <span className="category-panel__caption"><span><strong>{category.name}</strong><small>{category.phrase}</small></span><ArrowUpRight size={17} strokeWidth={1.4} /></span>
        </Link>)}
      </div>
    </section>

    <section className="home-design-split" aria-labelledby="home-design-title">
      <div className="home-design-split__copy"><Eyebrow light>INTERIOR DESIGN</Eyebrow><h2 id="home-design-title">Spaces<br /><em>Designed</em><br />Around You</h2><p>Beautiful, functional interiors that reflect your rhythm, your rituals and the life you want to make room for.</p><ArrowLink href="/interior-design" light>Discover Our Design Process</ArrowLink><svg className="architect-line" viewBox="0 0 260 140" fill="none" aria-hidden="true"><path d="M4 122C55 122 47 18 111 18c53 0 16 93 76 93 29 0 32-21 69-21" stroke="currentColor" strokeWidth=".7"/><circle cx="4" cy="122" r="2" fill="currentColor"/><circle cx="256" cy="90" r="2" fill="currentColor"/></svg></div>
      <div className="home-design-split__image"><Media src="/images/sunlit-interior.jpg" alt="Sunlit contemporary interior framed by wood and stone" /><span className="photo-index">FIG. 01 — A SPACE IN BALANCE</span></div>
    </section>

    <section className="collection-showcase section-pad" aria-labelledby="collection-title">
      <div className="collection-heading"><div><Eyebrow>OBJECTS WITH INTENTION</Eyebrow><h2 id="collection-title">Timeless Pieces,<br /><em>Modern Living</em></h2></div><p>Quiet forms, honest materials and details that reveal themselves over time.</p></div>
      <div className="collection-layout">
        <article className="collection-feature product-spotlight"><Link className="collection-image" href={`/furniture/product/${featured[0].slug}`}><Media src={featured[0].image} alt="The Luma chair in a warm architectural setting" /><span className="image-index">01 / OBJECT</span></Link><div className="product-caption"><div><span className="eyebrow">{featured[0].category.toUpperCase()}</span><h3>{featured[0].name.toUpperCase()}</h3><p>{featured[0].short}</p></div><strong>{formatPrice(featured[0].price)}</strong></div></article>
        <div className="collection-side">
          {featured.slice(1).map((product, index) => <article className={`collection-mini collection-mini--${index + 1}`} key={product.slug}><Link className="collection-mini__image" href={`/furniture/product/${product.slug}`}><Media src={product.image} alt={`${product.name} furniture`} /><span className="image-index">0{index + 2} / OBJECT</span></Link><div className="product-caption"><div><span className="eyebrow">{product.category.toUpperCase()}</span><h3>{product.name.toUpperCase()}</h3><p>{product.short}</p></div><strong>{formatPrice(product.price)}</strong></div></article>)}
          <div className="collection-side__nav"><span>SELECTED OBJECTS · 01—04</span><div><RoundLink href="/furniture" label="Explore the furniture collection" /><RoundLink href="/furniture" label="Explore the furniture collection" direction="down" /></div></div>
        </div>
      </div>
      <ArrowLink href="/furniture" className="collection-cta">Explore Full Collection</ArrowLink>
    </section>

    <section className="design-manifesto">
      <div className="manifesto-mark"><span>H</span><i /><span>S</span></div>
      <div className="design-manifesto__quote"><Eyebrow>OUR POINT OF VIEW</Eyebrow><h2>Good design<br />doesn’t ask for<br /><em>attention.</em></h2><p className="manifesto-aside">It earns it.</p></div>
      <div className="design-manifesto__text"><span className="technical-rule" /><p>Through considered materials, careful proportions and the quiet intelligence of good craft, we make things that feel right today—and still matter tomorrow.</p><span className="technical-note">FORM FOLLOWS FEELING · EST. 2020</span></div>
    </section>

    <section className="projects-dark section-pad" aria-labelledby="projects-heading">
      <div className="projects-dark__intro"><div><Eyebrow light>OUR PROJECTS</Eyebrow><h2 id="projects-heading">Real Spaces,<br /><em>Real Stories</em></h2></div><div className="projects-dark__side"><p>Explore our portfolio of residential and commercial spaces, each uniquely designed for the people who live and work in them.</p><ArrowLink href="/projects" light>View All Projects</ArrowLink></div></div>
      <div className="project-rail">
        {projects.map((project, index) => <Link className={`project-tile project-tile--${index + 1}`} href={`/projects/${project.slug}`} key={project.slug}><Media src={project.image} alt={`${project.name} interior project in ${project.location}`} /><span className="project-tile__shade" /><span className="project-tile__meta"><span>0{index + 1} / {project.type.toUpperCase()}</span><ArrowUpRight size={17} /></span><span className="project-tile__title"><strong>{project.name}</strong><small>{project.location}</small></span></Link>)}
      </div>
      <div className="projects-dark__foot"><span>ILLUSTRATIVE VISUAL STUDIES · 2024 — 2025</span><span>INDIA / RESIDENTIAL & COMMERCIAL</span></div>
    </section>

    <section className="about-strip section-pad" aria-labelledby="about-strip-title">
      <div className="about-strip__photo"><Media src="/images/workshop.jpg" alt="An independent design studio workbench with material samples" /><span className="photo-index">A STUDY IN MATERIALS · 04</span></div>
      <div className="about-strip__story"><Eyebrow>ABOUT HOUZZ STUDIOS</Eyebrow><h2 id="about-strip-title">Design.<br /><em>Craft.</em><br />Live.</h2><p>At Houzz Studios, we believe great spaces do more than look beautiful — they improve how you live. We bring together thoughtful design, premium materials and expert craftsmanship to create furniture and interiors that stand the test of time.</p><ArrowLink href="/about">Our Story</ArrowLink></div>
      <div className="about-strip__stats"><div><strong>100<span>+</span></strong><small>Happy Clients</small></div><div><strong>50<span>+</span></strong><small>Projects Completed</small></div><div><strong>5<span>+</span></strong><small>Years of Experience</small></div><span className="stats-footnote">A PRACTICE BUILT<br />AROUND PEOPLE</span></div>
    </section>

    <MaterialJournal />

    <section className="closing-cta">
      <Media src="/images/evening-chair.jpg" alt="A quiet, dimly lit interior made for an evening conversation" />
      <div className="closing-cta__overlay" />
      <div className="closing-cta__content"><Eyebrow light>A NEW SPACE BEGINS WITH A CONVERSATION</Eyebrow><h2>Let’s Design<br /><em>Your Space</em></h2><p>Tell us what you’re imagining. We’ll help turn it into a space worth living in.</p><div className="closing-cta__links"><Link className="button button--light" href="/contact">Start a Conversation <ArrowRight size={16} /></Link><Link className="hero-text-link" href="/projects">View Our Projects <ArrowUpRight size={15} /></Link></div></div>
      <span className="closing-cta__folio">HOUZZ STUDIOS · A SPACE FOR LIVING WELL</span>
    </section>
  </>;
}
