import { useState, type FormEvent } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, contacts } from '@/data/site';
import { validateInquiry, type Inquiry } from '@/lib/inquiry';

export function ContactForm() {
  const [values, setValues] = useState<Inquiry>({ name: '', email: '', phone: '', projectType: '', location: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  function change(key: keyof Inquiry, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateInquiry(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    const message = [
      'Hello A2Z Engineering Solutions, I would like to discuss a construction project.',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Project type: ${values.projectType}`,
      `Project location: ${values.location || 'Not provided'}`,
      `Project details: ${values.message}`,
    ].join('\n');
    window.open(`https://wa.me/${contacts[0].international}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  return <form className="contact-form" onSubmit={submit} noValidate aria-label="Project inquiry">
    {(['name', 'email', 'phone'] as const).map((key) => <div className="form-field" key={key}>
      <label htmlFor={`inquiry-${key}`}>{key === 'name' ? 'Full Name' : key === 'email' ? 'Email Address' : 'Phone Number'} *</label>
      <input id={`inquiry-${key}`} name={key} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel' : 'email'} value={values[key]} onChange={(event) => change(key, event.target.value)} placeholder={key === 'name' ? 'Your name' : key === 'email' ? 'you@example.com' : 'Your phone number'} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />
      {errors[key] && <span className="form-error" id={`${key}-error`}>{errors[key]}</span>}
    </div>)}
    <div className="form-field"><label htmlFor="inquiry-type">Project Type *</label><select id="inquiry-type" required value={values.projectType} onChange={(event) => change('projectType', event.target.value)} aria-invalid={!!errors.projectType} aria-describedby={errors.projectType ? 'type-error' : undefined}><option value="">Select a service</option>{services.map((service) => <option key={service.slug}>{service.title}</option>)}<option>Other Construction Inquiry</option></select>{errors.projectType && <span className="form-error" id="type-error">{errors.projectType}</span>}</div>
    <div className="form-field col-span-2"><label htmlFor="inquiry-location">Project Location</label><input id="inquiry-location" name="location" autoComplete="address-level2" value={values.location ?? ''} onChange={(event) => change('location', event.target.value)} placeholder="City or area of your project" /></div>
    <div className="form-field col-span-2"><label htmlFor="inquiry-message">Project Description *</label><textarea id="inquiry-message" required placeholder="Tell us a little about your project..." value={values.message} onChange={(event) => change('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span className="form-error" id="message-error">{errors.message}</span>}</div>
    <div className="col-span-2 flex flex-wrap items-center justify-between gap-4"><p className="form-note max-w-64">Your details will open in WhatsApp so you can review and send the inquiry directly to A2Z.</p><Button variant="gold" size="lg" type="submit">Send via WhatsApp <MessageCircle/><ArrowUpRight/></Button></div>
  </form>;
}
