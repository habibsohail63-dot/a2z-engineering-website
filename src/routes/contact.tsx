import { createFileRoute } from '@tanstack/react-router';
import { ContactSection, PageHero } from '@/components/site/Sections';
import { images, pageHead } from '@/data/site';
export const Route=createFileRoute('/contact')({head:()=>pageHead('Contact Us — Rawalpindi Office','Visit A2Z Engineering Solutions at Zaki Arcade, Bahria Phase 7, Rawalpindi. Call 03005218901 or 03125000923, connect on WhatsApp, or send a project inquiry directly through WhatsApp.'),component:Contact});
function Contact(){return <><PageHero title="Let’s build something meaningful." subtitle="Your vision. Our attention. A conversation is where it all begins." eyebrow="Contact A2Z Engineering Solutions" image={images.interior}/><ContactSection/></>;}
