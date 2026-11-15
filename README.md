# A2Z Engineering Solutions

A complete architectural construction website built with React 19, TypeScript, TanStack Start, Tailwind CSS v4, and Lucide icons.

## Pages

- `/` — complete home page
- `/about` — company philosophy, mission, vision, values, and methodology
- `/services` — all four construction services
- `/services/grey-structure`, `/services/turnkey-projects`, `/services/finishing-works`, `/services/plaza-construction` — individual service details
- `/projects` — filterable illustrative concept gallery
- `/projects/contemporary-residence`, `/projects/modern-commercial-plaza`, `/projects/structural-framework`, `/projects/refined-living-spaces` — concept details, scope, galleries, and related concepts
- `/contact` — validated demo inquiry form

## Interactions

Sticky header, services dropdown, active navigation, mobile menu with Escape support, category filters, linked service and project details, required-field and email validation, demo loading and confirmation states, reset inquiry, back-to-top, smooth scrolling, keyboard focus states, reduced-motion support, and image transitions.

## Source structure

```text
src/
  assets/                  Generated architectural photography
  components/site/
    Layout.tsx             Header, footer, wordmark, back-to-top
    Sections.tsx           Shared editorial website sections
    ContactForm.tsx        Demo inquiry interaction
  components/ui/           Reusable design-system controls
  data/site.ts             Company, services, projects, metadata helpers
  lib/inquiry.ts           Independent inquiry validation
  routes/                  File-based pages and shared root shell
  test/                    Routing, inquiry, and category tests
  styles.css               Semantic design tokens and responsive styles
```

## Local development

Use a current Node.js LTS release and Bun. After downloading or cloning your repository:

```sh
bun install
bun run dev
bun run test
bun run build
```

Open the URL printed by the development server. No API keys or environment variables are required for this frontend demonstration. Route generation is automatic; do not edit `src/routeTree.gen.ts`.

## GitHub export and synchronization

In Lovable, open **Project settings → Git**, choose GitHub, authorize your account, and connect the project. Lovable creates a new repository and synchronizes the selected branch. Download the source using the code download option when available, or clone the connected repository. Connecting an existing repository is not supported by Lovable Git sync.

## Deployment

**Lovable:** choose Publish in the editor. All routes support direct links and refreshes without SPA rewrite rules.

**Vercel:** import the exported GitHub repository into Vercel. Use the existing TanStack Start/Nitro application, not a plain Vite static-site deployment. Set the build command to `bun run build`, installation to `bun install`, and the build environment variable `NITRO_PRESET=vercel`. Nitro generates Vercel's deployment output; do not point Vercel at a generic `dist` directory or add a catch-all SPA rewrite. If automatic detection does not select build output, use the Vercel Build Output API directory `.vercel/output`. The Lovable environment retains its own Cloudflare deployment target. An actual Vercel deployment has not been performed or verified.

## Content and limitations

- All architectural images are generated concept illustrations. No portfolio image represents actual completed A2Z work.
- Forms validate in the browser and show an explicit demo confirmation. They send no email, make no submission request, and store no inquiry.
- No address, telephone, email, social account, company history, awards, or statistics were invented.
- To go live with inquiries, replace the marked demo delay with an authenticated/validated server endpoint and email delivery. Store credentials only on the server. The static data layer can later be replaced by a CMS; no paid services, database, admin system, or authentication are currently connected.
- Each content route has its own title, description, Open Graph metadata, and Twitter card. Bundled images do not provide absolute social image URLs; hosting supplies the social preview. Route paths are ready for a sitemap once a canonical domain is available.

## Verified

Automated validation/category tests and routing tests pass. Browser checks cover every content URL, loaded images, mobile navigation, filtering, an invalid inquiry, a complete valid demo inquiry, and horizontal overflow at 360, 390, 430, 768, 1024, 1440, and 1920 pixels. The Lovable build passes with no browser runtime errors observed.


## Local preview
Run `npm install`, then `npm run dev`, and open the local URL printed by Vite.

## Brand mark note
The supplied project ZIP did not contain the original A2Z Engineers logo image. The header/footer therefore use a custom typographic A2Z emblem as a temporary brand treatment. Replace it with the approved company logo asset before public launch.
