import { describe, expect, it } from 'vitest';
import { company, contacts, phoneHref, whatsappHref } from '@/data/site';
describe('Verified company information', () => {
  it('has operated since 2018', () => { expect(company.since).toBe(2018); });
  it('uses the verified Rawalpindi office', () => { expect(company.address).toBe('Office # 04, Ground Floor, Zaki Arcade, Bahria Phase 7, Rawalpindi, Pakistan.'); });
  it.each([['03005218901', '923005218901'], ['03125000923', '923125000923']])('uses the correct international contact for %s', (phone, international) => {
    expect(contacts.find(contact => contact.phone === phone)?.international).toBe(international);
    expect(phoneHref(international)).toBe(`tel:+${international}`);
    expect(new URL(whatsappHref(international)).pathname).toBe(`/${international}`);
    expect(new URL(whatsappHref(international)).searchParams.get('text')).toContain('construction project');
  });
});