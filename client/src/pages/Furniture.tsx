import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Plus } from "lucide-react";
import { categories, formatPrice, products, phone } from "@/data/siteData";
import { useBag } from "@/components/site/SiteContext";
import { CallLink, ArrowLink, Eyebrow, Media, PageMeta, SectionLabel } from "@/components/site/Primitives";

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  return <article className={`product-card product-card--${index + 1}`}><Link className="product-card__image" href={`/furniture/product/${product.slug}`}><Media src={product.image} alt={`${product.name} in a considered interior`} /><span className="product-card__index">0{index + 1}</span><span className="product-card__open"><ArrowUpRight size={17} /></span></Link><div className="product-card__caption"><div><span className="eyebrow">{product.category.toUpperCase()} · HOUZZ OBJECTS</span><h3><Link href={`/furniture/product/${product.slug}`}>{product.name}</Link></h3><p>{product.short}</p></div><strong>{formatPrice(product.price)}</strong></div></article>;
}

function ProductArchive({ title, intro, initialFilter = "All pieces", heroImage }: { title: string; intro: string; initialFilter?: string; heroImage?: string }) {
  const [active, setActive] = useState(initialFilter);
  const filterItems = ["All pieces", ...categories.map((category) => category.name)];
  const visible = useMemo(() => active === "All pieces" ? products : products.filter((product) => product.category === active), [active]);
  return <>
    <section className="catalog-heading section-pad"><div className="catalog-heading__copy"><Eyebrow>HOUZZ OBJECTS · 01—06</Eyebrow><h1>{title}</h1><p>{intro}</p></div>{heroImage && <div className="catalog-heading__image"><Media src={heroImage} alt="Furniture category in a natural material setting" /></div>}</section>
    <section className="catalog-browser section-pad"><div className="catalog-browser__top"><SectionLabel number="01">THE COLLECTION</SectionLabel><span>{visible.length.toString().padStart(2, "0")} OBJECTS</span></div><div className="catalog-filters" role="group" aria-label="Filter furniture by category">{filterItems.map((item) => <button type="button" key={item} className={active === item ? "is-selected" : ""} onClick={() => setActive(item)} aria-pressed={active === item}>{item}</button>)}</div>{visible.length ? <div className="product-grid">{visible.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div> : <p className="catalog-empty">More pieces in this category are being considered. <Link href="/contact">Ask the studio <ArrowRight size={14} /></Link></p>}
      <p className="catalog-note">Each piece is made with material, proportion and everyday use in mind.</p></section>
    <section className="catalog-material-note"><span>MADE WITH INTENTION</span><p>Quiet forms.<br /><em>Long lives.</em></p><ArrowLink href="/about">A little about our approach</ArrowLink></section>
  </>;
}

export function FurniturePage() {
  return <><PageMeta meta={{ title: "Furniture Collection — HOUZZ STUDIOS", description: "Explore considered furniture for living, dining, bedrooms and everyday rituals, shaped with natural materials and lasting craft." }} /><ProductArchive title="Furniture for the way you live." intro="A considered collection of furniture, shaped by material, craft and the small rituals of everyday life." /></>;
}

export function CategoryPage() {
  const [, params] = useRoute("/furniture/category/:category");
  const category = categories.find((item) => item.slug === params?.category);
  if (!category) return <NotFoundInline />;
  return <><PageMeta meta={{ title: `${category.name} — Furniture — HOUZZ STUDIOS`, description: category.description }} /><ProductArchive title={category.name} intro={category.description} initialFilter={category.name} heroImage={category.image} /></>;
}

function NotFoundInline() {
  return <section className="simple-not-found section-pad"><Eyebrow>NOT IN THE COLLECTION</Eyebrow><h1>We couldn’t find<br /><em>that category.</em></h1><ArrowLink href="/furniture">Return to furniture</ArrowLink></section>;
}

function ProductAccordion({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return <details className="product-accordion" open={open}><summary>{title}<ChevronDown size={16} strokeWidth={1.4} /></summary><p>{children}</p></details>;
}

export function ProductPage() {
  const [, params] = useRoute("/furniture/product/:slug");
  const product = products.find((item) => item.slug === params?.slug);
  const { addItem } = useBag();
  const [added, setAdded] = useState(false);
  if (!product) return <NotFoundInline />;
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const meta = { title: `${product.name} — HOUZZ STUDIOS`, description: product.description, type: "product" as const };
  const add = () => { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1800); };
  return <>
    <PageMeta meta={meta} />
    <div className="breadcrumbs"><Link href="/furniture">Furniture</Link><span>/</span><Link href={`/furniture/category/${product.categorySlug}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
    <section className="product-detail section-pad"><div className="product-gallery"><figure className="product-gallery__main"><Media src={product.image} alt={`${product.name}, front three-quarter view`} priority /><figcaption>01 / OBJECT STUDY</figcaption></figure>{product.secondaryImage && <figure className="product-gallery__secondary"><Media src={product.secondaryImage} alt={`${product.name} in its material setting`} /><figcaption>MATERIAL / FORM</figcaption></figure>}<div className="product-gallery__aside"><span>HOUZZ OBJECTS</span><span>DESIGNED FOR THE EVERYDAY</span></div></div>
      <div className="product-detail__info"><Eyebrow>{product.category.toUpperCase()} · MADE TO ORDER</Eyebrow><h1>{product.name}</h1><p className="product-detail__short">{product.short}</p><p className="product-detail__description">{product.description}</p><strong className="product-detail__price">{formatPrice(product.price)} <small>INR</small></strong><p className="product-detail__tax">Taxes and delivery confirmed with the studio.</p><button className="button button--dark button--wide add-to-bag" type="button" onClick={add}>{added ? <><Check size={16} /> Added to your bag</> : <>Add to bag <Plus size={16} /></>}</button><Link className="product-enquiry-link" href="/contact">Prefer to enquire first? Start a conversation <ArrowUpRight size={14} /></Link><CallLink className="product-call button button--outline button--wide">Call to order · {phone.display}</CallLink><div className="product-detail__meta"><span>Materials</span><p>{product.materials}</p><span>Dimensions</span><p>{product.dimensions}</p></div><div className="product-accordions"><ProductAccordion title="Materials & Craft" open>{product.materials}. Made with carefully selected materials and finished by hand.</ProductAccordion><ProductAccordion title="Dimensions">{product.dimensions}. Please confirm access and fit with the studio before ordering.</ProductAccordion><ProductAccordion title="Care">{product.care}</ProductAccordion><ProductAccordion title="Shipping">{product.shipping}</ProductAccordion></div><p className="product-detail__disclaimer">An enquiry is not a confirmed order. Availability, finishes, lead time and delivery are confirmed with the studio.</p></div></section>
    <section className="related-products section-pad"><div className="related-products__heading"><div><Eyebrow>ALSO CONSIDER</Eyebrow><h2>Pieces in good<br /><em>company.</em></h2></div><ArrowLink href="/furniture">View all furniture</ArrowLink></div><div className="product-grid product-grid--related">{related.map((item, index) => <ProductCard key={item.slug} product={item} index={index} />)}</div></section>
  </>;
}
