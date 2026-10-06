import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/site/Primitives";

export default function NotFound() {
  return <><PageMeta meta={{ title: "Page not found — HOUZZ STUDIOS", description: "The page could not be found. Return to HOUZZ STUDIOS to explore furniture and interiors." }} /><section className="not-found-page">
    <p className="eyebrow">404 / A TURN IN THE WRONG DIRECTION</p>
    <h1>This page<br /><em>isn’t here.</em></h1>
    <p>Let’s take you back to a room worth exploring.</p>
    <Link className="text-arrow" href="/"><ArrowLeft size={15} /> Return home</Link>
  </section></>;
}
