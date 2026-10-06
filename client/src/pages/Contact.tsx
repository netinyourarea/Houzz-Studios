import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, Media, PageMeta, SectionLabel } from "@/components/site/Primitives";

const projectTypes = ["Residential interior", "Commercial interior", "Furniture enquiry", "Something else"];
const budgets = ["Under ₹5 lakh", "₹5–15 lakh", "₹15–30 lakh", "₹30 lakh+", "Still exploring"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  };
  return <>
    <PageMeta meta={{ title: "Start a Conversation — HOUZZ STUDIOS", description: "Tell HOUZZ STUDIOS about the space you are imagining. Begin a conversation about furniture or interior design." }} />
    <section className="contact-intro section-pad"><div className="contact-intro__copy"><Eyebrow>A GOOD PLACE TO BEGIN</Eyebrow><h1>Let’s create<br /><em>something</em><br />beautiful.</h1><p>Tell us a little about what you have in mind. A room, a piece, a feeling—you can start anywhere.</p><span className="contact-intro__index">HOUZZ STUDIOS · OPEN FOR CONVERSATION</span></div><div className="contact-intro__image"><Media src="/images/contact-studio.jpg" alt="A quiet, warm studio ready for a new conversation" priority /><span>THE FIRST STEP IS A NOTE</span></div></section>

    <section className="contact-main section-pad"><div className="contact-main__aside"><SectionLabel number="01">YOUR NOTE</SectionLabel><p className="lead-serif">Good work begins by listening.</p><p>Share as much or as little as you like. We’ll use this first conversation to understand what matters to you.</p><div className="contact-details"><div><span className="eyebrow">STUDIO VISITS</span><p>By appointment<br />Working across India</p></div><div><span className="eyebrow">A PLACE TO START</span><a href="#enquiry-form">Use the enquiry form <ArrowUpRight size={13} /></a></div><div><span className="eyebrow">PROJECTS</span><p>Mumbai · Goa · Bengaluru</p></div></div></div>
      <div className="contact-main__form-wrap">{submitted ? <div className="form-success" role="status" aria-live="polite"><span className="form-success__mark">H<br /><i />S</span><Eyebrow>THANK YOU</Eyebrow><h2>Your note is<br /><em>ready.</em></h2><p>This preview form does not send or store enquiries yet. Connect the studio’s preferred reply address before launch.</p><button type="button" className="text-arrow" onClick={() => setSubmitted(false)}>Write another note <ArrowRight size={15} /></button></div> : <form id="enquiry-form" className="contact-form" onSubmit={onSubmit}>
        <div className="form-row"><label>Name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Email <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
        <div className="form-row"><label>Phone <small>OPTIONAL</small><input name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label><label>Project Type <span>*</span><select name="projectType" defaultValue="" required><option value="" disabled>Select what brings you here</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label></div>
        <label>Budget <small>OPTIONAL</small><select name="budget" defaultValue=""><option value="">Choose a range, if known</option>{budgets.map((budget) => <option key={budget}>{budget}</option>)}</select></label>
        <label>Message <span>*</span><textarea name="message" rows={5} placeholder="A few words about the space or piece you’re imagining…" required /></label>
        <div className="contact-form__submit"><p>Fields marked * are required. Your note remains in this browser preview.</p><button className="button button--dark" type="submit">Prepare my note <ArrowRight size={16} /></button></div>
      </form>}</div>
    </section>

    <section className="contact-last-word"><div><Eyebrow>FURNITURE / INTERIORS / DESIGN</Eyebrow><p>Whatever the scale,<br /><em>start with what matters.</em></p></div><span>HOUZZ STUDIOS · INDIA</span></section>
  </>;
}
