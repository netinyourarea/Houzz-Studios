import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ArrowLink, Eyebrow, Media, PageMeta, SectionLabel } from "@/components/site/Primitives";

const chapters = [
  { year: "01", title: "A better kind of everyday.", text: "HOUZZ STUDIOS began with a simple question: what if the things around us made ordinary days feel a little more considered? That question still guides each piece, room and conversation.", image: "/images/sunlit-interior.jpg", alt: "Light moving across a thoughtfully composed interior" },
  { year: "02", title: "Material before ornament.", text: "We start with what a material can do—how it holds light, how it ages, what it asks of the hand. Then we shape it into a form that feels quiet, useful and unmistakably itself.", image: "/images/wood.jpg", alt: "Natural walnut grain in raking light" },
  { year: "03", title: "Made for the way you live.", text: "A beautiful room should also feel easy to inhabit. We look for the right balance between personal character and daily use, allowing each decision to serve both feeling and function.", image: "/images/stone-bedroom.jpg", alt: "Softly honed stone and pale plaster meeting at a quiet edge" },
];

export default function About() {
  return <>
    <PageMeta meta={{ title: "Our Story — HOUZZ STUDIOS", description: "Meet HOUZZ STUDIOS: a design-led furniture and interior studio shaped by craft, material and the way people live." }} />
    <section className="page-hero about-hero"><div className="page-hero__copy"><Eyebrow>ABOUT HOUZZ STUDIOS</Eyebrow><h1>Design.<br /><em>Craft.</em><br />Live.</h1><p>We make spaces and objects that bring a little more intention to the everyday.</p><span className="page-hero__folio">A STUDIO FOR LIVING WELL · 01</span></div><div className="page-hero__image"><Media src="/images/workshop.jpg" alt="The studio workroom with timber, stone and fabric samples" priority /></div></section>

    <section className="about-introduction section-pad"><SectionLabel number="01">A NOTE ON WHY</SectionLabel><div className="about-introduction__content"><p className="lead-serif">A room is never only a room. It is where mornings begin, where people gather and where the shape of a day quietly changes.</p><p>At Houzz Studios, we believe great spaces do more than look beautiful — they improve how you live. We bring together thoughtful design, premium materials and expert craftsmanship to create furniture and interiors that stand the test of time.</p><Link className="text-arrow" href="/contact">Tell us what you’re imagining <ArrowRight size={15} /></Link></div><span className="about-introduction__seal">H<br /><i />S</span></section>

    <section className="about-story section-pad"><div className="about-story__heading"><Eyebrow>HOW WE GOT HERE</Eyebrow><h2>A practice shaped<br />by <em>small things.</em></h2><p>Good work begins with paying attention—to people, to place, to the grain of a board.</p></div><div className="about-timeline">{chapters.map((chapter) => <article className="timeline-entry" key={chapter.year}><div className="timeline-entry__meta"><span>{chapter.year}</span><span className="timeline-dot" /></div><div className="timeline-entry__image"><Media src={chapter.image} alt={chapter.alt} /></div><div className="timeline-entry__copy"><span className="eyebrow">CHAPTER {chapter.year}</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div></article>)}</div></section>

    <section className="about-philosophy"><div className="about-philosophy__image"><Media src="/images/fabric.jpg" alt="Natural upholstery with a visible woven texture" /></div><div className="about-philosophy__copy"><Eyebrow light>OUR DESIGN PHILOSOPHY</Eyebrow><p className="philosophy-quote">“The most lasting things are often the ones that feel <em>most natural.</em>”</p><p>Materials, proportions, craftsmanship, comfort and longevity are not separate considerations. They are different ways of asking the same question: will this make life feel better?</p><span className="philosophy-signature">THE HOUZZ APPROACH · 02 / 04</span></div></section>

    <section className="craft-section section-pad"><div className="craft-section__title"><Eyebrow>IN THE DETAILS</Eyebrow><h2>Craft is how<br />care becomes <em>visible.</em></h2><p>From the curve of an arm to the meeting of two pieces of timber, the smallest decisions carry the whole idea.</p></div><div className="craft-section__visual"><Media src="/images/craft.jpg" alt="Carefully fitted walnut joinery with satin bronze detail" /><div className="craft-callout"><span className="craft-callout__line" /><span>01 / JOINERY<br /><small>Made to meet, made to last.</small></span></div></div><div className="craft-section__aside"><span>FORM / MATERIAL / HAND</span><span className="craft-aside-rule" /><p>Not decoration. A considered answer to how something should work and feel.</p><ArrowLink href="/furniture">Explore the collection</ArrowLink></div></section>

    <section className="about-stats section-pad"><div className="about-stats__heading"><Eyebrow>THE PRACTICE</Eyebrow><h2>Built through<br /><em>good work.</em></h2></div><div className="about-stats__numbers"><div><strong>100<span>+</span></strong><p>Happy Clients</p></div><div><strong>50<span>+</span></strong><p>Projects Completed</p></div><div><strong>5<span>+</span></strong><p>Years of Experience</p></div></div><span className="about-stats__note">PEOPLE, PLACES<br />AND PIECES · 03</span></section>

    <section className="about-studio-wide"><Media src="/images/warm-interior.jpg" alt="A warm residential interior designed for everyday life" /><div className="about-studio-wide__caption"><span>STUDY 07</span><span>A ROOM THAT LEAVES SPACE FOR YOU</span><ArrowUpRight size={17} /></div></section>

    <section className="page-cta-strip"><div><Eyebrow>YOUR SPACE, YOUR STORY</Eyebrow><h2>Let’s begin<br /><em>with a conversation.</em></h2></div><ArrowLink href="/contact">Start a Conversation</ArrowLink></section>
  </>;
}
