# A2Z Engineering Solutions — pre-deployment review

## Changes in this review
- Preserved the Signature / Button Lighting design and existing PKR cost calculator.
- Added a Construction Insights page at `/blog` and linked it from desktop/mobile navigation and the footer.
- Replaced the non-functional demo contact form with a validated WhatsApp handoff. The visitor reviews the prefilled message in WhatsApp and presses Send.
- Updated contact-page wording so it no longer claims the form is a demo.

## Must be confirmed by A2Z before public launch
- Replace the temporary A2Z wordmark with the official company logo.
- Confirm the calculator's illustrative per-square-foot rates and marla conversion before publishing them as estimates. They are not approved quotations.
- Replace concept visuals with verified project photographs, or keep the concept labels visible.
- Confirm all phone/WhatsApp numbers and the office address.
- Confirm hosting/domain and configure HTTPS.

## Local verification
Run from this folder:

```bash
npm install
npm run build
npm run preview
```

The package registry timed out in the preparation environment, so a production build could not be executed here. Do not treat this checklist as proof of a successful build. Review the site in desktop and mobile browsers, test every route and WhatsApp handoff, then deploy.

## Contact form behavior
The contact form does not store submissions in a database or send email. It validates the fields and opens WhatsApp with a prefilled inquiry to the primary A2Z number. The visitor must send the message in WhatsApp.
