import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, Minus, Search, ShoppingBag, X } from "lucide-react";
import { categories, formatPrice, products, projects } from "@/data/siteData";
import { useBag } from "./SiteContext";
import { CallLink } from "./Primitives";
import { phone } from "@/data/siteData";
import { withBase } from "@/lib/utils";

const navItems = [
  ["Home", "/"], ["About", "/about"], ["Furniture", "/furniture"],
  ["Interior Design", "/interior-design"], ["Projects", "/projects"], ["Contact", "/contact"],
] as const;

type Panel = "search" | "bag" | "menu" | null;

function BrandMark() {
  return <Link href="/" className="brand-mark" aria-label="HOUZZ STUDIOS home">
    <svg className="brand-mark__symbol" viewBox="0 0 32 38" aria-hidden="true">
      <path d="M4 35V3h9v13h6V3h9v32h-9V23h-6v12z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 35V10h10v25" fill="none" stroke="currentColor" strokeWidth=".8" />
    </svg>
    <span className="brand-mark__word"><span>HOUZZ</span><span>STUDIOS</span></span>
  </Link>;
}

function Header({ onPanel, activePanel }: { onPanel: (panel: Panel) => void; activePanel: Panel }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location === "/";
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const transparent = isHome && !scrolled && activePanel === null;
  return <header className={`site-header${transparent ? " site-header--transparent" : ""}${scrolled ? " site-header--scrolled" : ""}`}>
    <div className="site-header__inner">
      <BrandMark />
      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => <Link key={label} href={href} className={location === href ? "is-current" : ""}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <CallLink className="header-call" />
        <button type="button" className={`icon-button${activePanel === "search" ? " is-active" : ""}`} aria-label={activePanel === "search" ? "Close search" : "Search"} aria-expanded={activePanel === "search"} onClick={() => onPanel(activePanel === "search" ? null : "search")}><Search size={18} strokeWidth={1.5} /></button>
        <button type="button" className={`icon-button bag-button${activePanel === "bag" ? " is-active" : ""}`} aria-label="Open bag" aria-expanded={activePanel === "bag"} onClick={() => onPanel(activePanel === "bag" ? null : "bag")}><ShoppingBag size={18} strokeWidth={1.5} /><BagCount /></button>
        <button type="button" className="icon-button mobile-menu-button" aria-label={activePanel === "menu" ? "Close menu" : "Open menu"} aria-expanded={activePanel === "menu"} onClick={() => onPanel(activePanel === "menu" ? null : "menu")}>{activePanel === "menu" ? <X size={20} /> : <Menu size={20} strokeWidth={1.5} />}</button>
      </div>
    </div>
  </header>;
}

function BagCount() {
  const { itemCount } = useBag();
  return <span className="bag-count" aria-label={`${itemCount} items in bag`}>{itemCount}</span>;
}

function SearchPanel({ close }: { close: () => void }) {
  const [query, setQuery] = useState("");
  const [location] = useLocation();
  const normalized = query.trim().toLowerCase();
  const productMatches = useMemo(() => products.filter((item) => !normalized || `${item.name} ${item.category}`.toLowerCase().includes(normalized)).slice(0, 4), [normalized]);
  const projectMatches = useMemo(() => projects.filter((item) => !normalized || `${item.name} ${item.location}`.toLowerCase().includes(normalized)).slice(0, 2), [normalized]);
  return <div className="overlay-panel overlay-panel--search" role="dialog" aria-modal="true" aria-label="Search HOUZZ STUDIOS">
    <div className="overlay-panel__top"><span className="eyebrow">A QUIETER KIND OF SEARCH</span><button className="icon-button" onClick={close} type="button" aria-label="Close search"><X size={20} /></button></div>
    <label className="search-field"><Search size={21} strokeWidth={1.4} /><span className="sr-only">Search furniture and projects</span><input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try a chair, a material, a place…" /></label>
    <div className="search-results">
      <div><p className="eyebrow">FURNITURE</p>{productMatches.map((item) => <Link key={item.slug} href={`/furniture/product/${item.slug}`} onClick={close} className="search-result"><span>{item.name}</span><span>{item.category} <ArrowUpRight size={14} /></span></Link>)}</div>
      <div><p className="eyebrow">PROJECTS</p>{projectMatches.map((item) => <Link key={item.slug} href={`/projects/${item.slug}`} onClick={close} className="search-result"><span>{item.name}</span><span>{item.location} <ArrowUpRight size={14} /></span></Link>)}</div>
      {normalized && productMatches.length === 0 && projectMatches.length === 0 && <p className="search-empty">Nothing found yet. Try “wood”, “chair” or “New York”.</p>}
    </div>
    {location !== "/" && <p className="search-note">Made to be found slowly.</p>}
  </div>;
}

function BagPanel({ close }: { close: () => void }) {
  const { items, subtotal, removeItem } = useBag();
  return <aside className="overlay-panel overlay-panel--drawer" role="dialog" aria-modal="true" aria-label="Your furniture bag">
    <div className="drawer-heading"><div><p className="eyebrow">A GOOD PLACE TO BEGIN</p><h2>Your bag <span className="drawer-count">({items.length})</span></h2></div><button className="icon-button" onClick={close} type="button" aria-label="Close bag"><X size={20} /></button></div>
    {items.length ? <>
      <div className="bag-lines">{items.map(({ product, quantity }) => <article key={product.slug} className="bag-line"><img src={withBase(product.image)} alt="" /><div className="bag-line__info"><Link href={`/furniture/product/${product.slug}`} onClick={close}>{product.name}</Link><span>Qty {quantity} · {formatPrice(product.price * quantity)}</span><button type="button" onClick={() => removeItem(product.slug)} className="text-button"><Minus size={12} /> Remove</button></div></article>)}</div>
      <div className="bag-total"><span>Indicative subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
      <p className="fine-print">No payment is taken here. We’ll confirm availability, delivery and final details with you.</p>
      <Link className="button button--dark button--wide" href="/contact" onClick={close}>Inquire about these pieces <ArrowRight size={16} /></Link>
    </> : <div className="bag-empty"><p className="display-small">Something caught your eye?</p><p>Your considered pieces will gather here. Add an item to begin an inquiry.</p><Link className="text-arrow" href="/furniture" onClick={close}>Explore the collection <ArrowRight size={15} /></Link></div>}
  </aside>;
}

function MenuPanel({ close }: { close: () => void }) {
  return <div className="overlay-panel overlay-panel--menu" role="dialog" aria-modal="true" aria-label="Site menu">
    <div className="overlay-panel__top"><span className="eyebrow">HOUZZ STUDIOS · USA</span><button className="icon-button" onClick={close} type="button" aria-label="Close menu"><X size={20} /></button></div>
    <nav className="menu-panel__links">{navItems.map(([label, href], index) => <Link key={label} href={href} onClick={close}><span className="menu-index">0{index + 1}</span><span>{label}</span><ArrowUpRight size={18} /></Link>)}</nav>
    <CallLink className="menu-panel__call button button--dark">Call {phone.display}</CallLink>
    <div className="menu-panel__foot"><span>FURNITURE / INTERIORS / DESIGN</span><ArrowDownRight size={18} /></div>
  </div>;
}

function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer__main">
      <div className="footer-brand"><BrandMark /><p>Thoughtful furniture and interiors, shaped by material, craft and the way you live.</p><span className="footer-manifesto">Made to feel like yours.</span></div>
      <div className="footer-column"><p className="eyebrow">EXPLORE</p>{navItems.slice(0, 5).map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
      <div className="footer-column"><p className="eyebrow">FOLLOW</p><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest <ArrowUpRight size={13} /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13} /></a></div>
      <div className="footer-column footer-contact"><p className="eyebrow">A NOTE TO THE STUDIO</p><p>Visits by appointment</p><p>Working across the United States</p><CallLink className="footer-call">{phone.display}</CallLink><Link to="/contact">Begin an inquiry <ArrowUpRight size={13} /></Link></div>
    </div>
    <div className="site-footer__bottom"><span>© {new Date().getFullYear()} HOUZZ STUDIOS</span><span>FURNITURE · INTERIORS · DESIGN</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>;
}

function Overlay({ panel, onClose }: { panel: Panel; onClose: () => void }) {
  useEffect(() => {
    if (!panel) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = old; };
  }, [panel, onClose]);
  if (!panel) return null;
  return <div className={`site-overlay site-overlay--${panel}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {panel === "search" && <SearchPanel close={onClose} />}
    {panel === "bag" && <BagPanel close={onClose} />}
    {panel === "menu" && <MenuPanel close={onClose} />}
  </div>;
}

function ScrollRestoration() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [location]);
  return null;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [location] = useLocation();
  useEffect(() => setPanel(null), [location]);
  return <div className="site-frame" id="top">
    <Header onPanel={setPanel} activePanel={panel} />
    <main id="main-content">{children}</main>
    <SiteFooter />
    <Overlay panel={panel} onClose={() => setPanel(null)} />
    <ScrollRestoration />
  </div>;
}
