# Backlog

Open work for the Scorpion Systematics Research Group site. **Website copy and bibliographic text are author-owned** — do not edit that content without explicit approval.

**Context:** Stages 0–5.1 are complete (local JSON content layer, server components, people search/navigation, CI validation). Stage 7 UX work and CMS migration (Stages 5.2–6) remain. Copy and structural changes belong in **Content** until the author approves them.

---

## Functionality

### People

- **Search accessibility (WCAG 2.2 AA):** Fix `PeopleSearch.tsx` — drop broken combobox/listbox pattern; use labeled input + results list of buttons; sr-only `aria-live` for match status; decorative icon `aria-hidden`; visible focus on results; optional focus move to selected person after jump. Preserve `/` shortcut and Escape-to-clear.
- **Section filter chips:** Category chips above people search, wired to `handleSectionSelect`; clarify filter-vs-search UX; sync with `?section=` when selected.
- **Copy link:** Button beside person headings (and section headings site-wide) copying a full share URL — people links need `?section=`, `?tab=`, and `#person-id`; not all sections have stable heading `id`s yet.
- **Missing photo label:** Show visible “Image unavailable” in `PeopleImage` initials fallback without layout shift.

### Publications

- **Search and filter:** Text search across title, authors, journal; optional year, author, and publication-type filters. (Year-by-year side nav was tried and removed — wrong pattern for 200+ entries across 31 years.) Scope with author before build.
- **Topic filter:** Not in schema today — define a rule or add a field with author approval before implementing.
- **Copy BibTeX:** Per-entry button generating BibTeX from structured fields; handle missing `doi`, `volume`, `pages`; test Safari clipboard.

### Collections

- **Legal specimen steps:** Convert legal specimen-deposition paragraphs to an ordered list (one step per item). Author must confirm order and wording.

### FAQ and glossary

- **FAQ page:** Create `content/faq.json` (`question`, `answer`, `category`); render at `/faq` with search/filter; link from Collections loan and visiting-scientist sections; add to sitemap. All FAQ copy is author-owned.
- **Glossary terms (low priority):** `GlossaryTerm` component with accessible tooltip; wrap taxonomic order names in body copy using author-supplied definitions; link terms to FAQ or `/glossary`.

### Site-wide polish

- **Gallery loading (optional):** Reserved box + subtle fade-in on `HomeGallery`, Arachnids grid, Fieldwork grid only — not blur placeholders; skip header/footer logos and inline figures.
- **Homepage taxonomy grid:** Restructure into two-column grid with group headers and consistent spacing.
- **Long-page readability:** Normalize Arachnids figure widths to a fixed column set; optional subheadings or pull-quotes inside paragraphs over ~150 words on Arachnids, Facilities, Collections — **author must approve any new copy extracted from body text**.
- **Duplicate intro:** Remove duplicated introductory paragraph from homepage or Arachnids page; keep one canonical version and link from the other — **author approval required**.

### Validation and errors

- **PDF link check:** Extend `validate-content` to fail when any `/documents/*.pdf` href in content or JSX points to a missing file.

---

## Content

Author review and data fixes. Log approvals in item status when resolved.

### Publications (`content/publications.json`)

- **AccessScience entry (2006):** Confirm `citationHtml` restoration matches intended published form.
- **Parser accuracy:** Spot-check entries (213 total); flag non-standard formats for `citationHtml` where structured fields cannot match original JSX.
- **Missing PDF links:** Many original entries linked to `research.amnh.org/users/lorenzo/PDF/…`; schema has no `pdfUrl`. Author decides whether to add field and populate site-wide.

### People (`content/people/*.json`, `/people`)

- **35 profiles with `"image": null`:** Supply filenames or accept placeholders.
- **Pío Colmenares JSON:** Set `{ "folder": "people", "filename": "Pio-Colmenares.jpg" }` (inline JSX already uses correct path; JSON still points at scorpion photo).
- **Wire sections to JSON:** Only Undergraduate Students renders from `getPeople()` today; reconcile remaining inline JSX with JSON before wiring other sections (see `references/people-image-audit-final.json`).
- **Image audit follow-up:** Spot-check auto-matched portraits; supply files for **31 profiles** still on placeholder (listed in audit JSON — high school, visiting, volunteer sections).
- **Undergraduate Students:** Confirm bios and photos; supply images for Cassandra Hansen and Michelle Yun if available.
- **Lab history group photos:** Verify `content/lab-history.json` paths and captions after remapping to `/images/people/…`.
- **Sidebar label:** Consider renaming **Lab Evolution** → **Lab Through the Years** (label only; keep `sectionId` `lab-evolution` for URLs).

### Site settings

- **Footer copyright:** Confirm wording and year in `content/site.json` (`footerCopyright`).

### Page copy and structure

- **Facilities — content structure:** Rework grouping, nav labels, and heading hierarchy so Arachnology vs. Associated AMNH facilities read coherently (copy preserved from legacy; nav merge only adjusted levels).
- **External link icons:** Confirm external-link icon on Research, Facilities, Collections is acceptable; decide whether to adopt `ExternalLink` on People profile links.
- **Per-page metadata:** Spot-check browser tab titles and descriptions on each route.
- **Figure refactors:** Author confirms images unchanged after `Figure` component migration on Facilities, Collections, Arachnids, and People lab history cards.

---

## Content management

Work for moving editing off repo JSON (Stages 5.2–6). **Not required** for current DreamHost deploy (`CONTENT_SOURCE=local`).

### Before CMS migration (Stage 5.2)

- Select headless CMS with webhook/API rebuild compatible with static export (or plan hosting change if dropping `output: 'export'`).
- Add stable `id` (or slug) to `Publication`, `GalleryImage`, and `LabHistoryEntry` in schema and JSON; treat ids as immutable after publish.
- Audit `Person.id` values against live hash links and search index; extend `validate-content` to fail on duplicate ids per collection.
- Create `scripts/import-to-cms.ts`; dry-run against staging; document local field → CMS field mappings in `references/`.
- Implement `lib/content/cmsAdapter.ts`; add CMS secrets to GitHub Actions; CI build with `CONTENT_SOURCE=cms` on staging before production switch.
- Webhook or `repository_dispatch` to redeploy on CMS publish.
- **Policy:** `Person.id` and `Page.slug` must never change after publication (URLs, search deep links, CMS sync).

### CMS migration (Stage 6)

- Execute Stage 5.2 checklist.
- Run one-time import via `import-to-cms.ts`.
- Switch production `CONTENT_SOURCE` to `cms`; monitor first deploy (page count, people search, images).
- Keep `content/` as fallback export until CMS editing is trusted; document rollback (`CONTENT_SOURCE=local` + redeploy).

### Optional (defer until core CMS works)

- Draft preview API (`app/api/preview/route.ts`) — requires non-static host or separate preview environment.
- Remove `output: 'export'` only if hosting supports Next.js server runtime or ISR.
