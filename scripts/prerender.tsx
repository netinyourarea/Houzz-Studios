import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

type PageMetaData = { title: string; description: string; type?: "website" | "article" | "product" };
const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "dist", "public");
const basePrefix = (process.env.VITE_BASE || "/").replace(/\/$/, "");

function escapeAttribute(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.tsx") as { default: React.ComponentType<{ ssrPath?: string }> };
    const data = await vite.ssrLoadModule("/src/data/siteData.ts") as {
      getPageMeta: (path: string) => PageMetaData;
      categories: { slug: string }[];
      products: { slug: string }[];
      projects: { slug: string }[];
    };
    const template = await fs.readFile(path.join(outputRoot, "index.html"), "utf8");
    const routes = new Set<string>([
      "/", "/about", "/furniture", "/interior-design", "/projects", "/contact",
      ...data.categories.map((item) => `/furniture/category/${item.slug}`),
      ...data.products.map((item) => `/furniture/product/${item.slug}`),
      ...data.projects.map((item) => `/projects/${item.slug}`),
    ]);

    for (const route of routes) {
      const meta = data.getPageMeta(route);
      const rootMarkup = renderToString(React.createElement(App, { ssrPath: basePrefix + route }));
      const head = [
        `<title>${escapeAttribute(meta.title)}</title>`,
        `<meta name="description" content="${escapeAttribute(meta.description)}" />`,
        `<meta property="og:title" content="${escapeAttribute(meta.title)}" />`,
        `<meta property="og:description" content="${escapeAttribute(meta.description)}" />`,
        `<meta property="og:type" content="${meta.type ?? "website"}" />`,
        `<meta name="twitter:title" content="${escapeAttribute(meta.title)}" />`,
        `<meta name="twitter:description" content="${escapeAttribute(meta.description)}" />`,
      ].join("\n    ");
      const html = template
        .replace("<!--PAGE_META-->", head)
        .replace('<div id="root"></div>', `<div id="root">${rootMarkup}</div>`);
      const destination = route === "/" ? path.join(outputRoot, "index.html") : path.join(outputRoot, route.replace(/^\//, ""), "index.html");
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, html);
    }

    const notFoundMeta = { title: "Page not found — HOUZZ STUDIOS", description: "The page could not be found. Return to HOUZZ STUDIOS to explore furniture and interiors." };
    const notFoundMarkup = renderToString(React.createElement(App, { ssrPath: basePrefix + "/__not-found__" }));
    const notFoundHead = `<meta name="robots" content="noindex,follow" />\n    <title>${escapeAttribute(notFoundMeta.title)}</title>\n    <meta name="description" content="${escapeAttribute(notFoundMeta.description)}" />`;
    const notFoundHtml = template.replace("<!--PAGE_META-->", notFoundHead).replace('<div id="root"></div>', `<div id="root">${notFoundMarkup}</div>`);
    await fs.writeFile(path.join(outputRoot, "404.html"), notFoundHtml);
    console.log(`Prerendered ${routes.size} public paths and a not-found document.`);
  } finally {
    await vite.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
