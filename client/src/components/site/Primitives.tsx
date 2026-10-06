import { ArrowDownRight, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { withBase } from "@/lib/utils";
import type { ReactNode } from "react";
import { phone, type PageMetaData } from "@/data/siteData";

export function PageMeta({ meta }: { meta: PageMetaData }) {
  useEffect(() => {
    document.title = meta.title;
    const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:type"]', "property", "og:type", meta.type ?? "website");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "HOUZZ STUDIOS");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
  }, [meta]);
  return null;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>{children}</p>;
}

export function ArrowLink({ href, children, light = false, className = "" }: { href: string; children: ReactNode; light?: boolean; className?: string }) {
  return <Link className={`arrow-link${light ? " arrow-link--light" : ""} ${className}`} href={href}><span>{children}</span><ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>;
}

export function RoundLink({ href, label, direction = "right" }: { href: string; label: string; direction?: "right" | "down" }) {
  const Icon = direction === "down" ? ArrowDownRight : ArrowRight;
  return <Link className="round-link" href={href} aria-label={label}><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></Link>;
}

export function Media({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return <img className={`media ${className}`} src={withBase(src)} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}

export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return <div className="section-label">{number && <span className="section-label__number">{number}</span>}<span>{children}</span></div>;
}

export function RevealText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal-text ${className}`}>{children}</div>;
}

export function CallLink({ className = "", children, label = phone.display, size = 15 }: { className?: string; children?: ReactNode; label?: string; size?: number }) {
  return <a className={`call-link ${className}`} href={`tel:${phone.tel}`} aria-label={`Call HOUZZ STUDIOS at ${phone.display}`}><Phone size={size} strokeWidth={1.6} aria-hidden="true" /><span className="call-link__text">{children ?? label}</span></a>;
}
