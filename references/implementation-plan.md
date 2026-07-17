# Implementation Plan

## Progress

**Complete (as of 2026-07-17):** Stages **0**, **1**, **2**, **3**, **4**, and **5.1**.

**Not started:** Stage **5.2**, Stage **6**.

**Stage 7 before 5.2 / 6?** Yes — Stage 7 UX fixes can be done now. They build on the local content layer (`@/lib/content` → `localAdapter`) and do not require a CMS. Stages 5.2 and 6 only matter when moving content editing off repo JSON. Stage 7 depends on completed work in Stages 1–4 (and parts of Stage 3); it does **not** depend on 5.2 or 6. Copy and label changes remain subject to author review — document in `references/content-change-suggestions.md`.

**Stage 7 — already complete (removed from checklist below):** ExternalLink with icon (H1/H4); tab/section URL persistence on People and Collections (H3); `/` search shortcut and search `Escape` (H4/H7); validate-content script and CI gate (H5); error and not-found pages (H9).

---

## Stage 0 — Extract Content From JSX (do first, unblocks everything else)

**Status: Complete**
1. Create a `content/` directory at the repo root.
2. Create a `content/people/` directory.
3. For each person object in `app/people/data.ts`, create one JSON file at `content/people/<id>.json` containing its fields.
4. Convert every `bio` and `contact` HTML string in the migrated person JSON files to Markdown syntax.
5. Remove the `dangerouslySetInnerHTML` call in `app/people/page.tsx` (~line 1412) and replace it with a Markdown-rendering component.
6. Delete `app/people/data.ts` after every import of it is replaced with content-layer calls (built in Stage 1).
7. Create `content/publications.json`.
8. Parse every publication entry out of `app/publications/page.tsx` into `content/publications.json` with fields: `year`, `authors` (array of `{ name, isHighlighted }`), `title`, `journal`, `volume`, `pages`, `doi`.
9. Delete the hardcoded JSX bibliography list from `app/publications/page.tsx` after migration.
10. Create `content/gallery/arachnids.json`; move the 49-item hardcoded array out of `app/arachnids/page.tsx` into it; add an `alt` field to every entry.
11. Create `content/gallery/fieldwork.json`; move the hardcoded array out of `app/fieldwork/page.tsx` into it, preserving the `orientation` field.
12. Create `content/gallery/home.json` listing the home-page gallery images.
13. Replace the `fs.readdir` call in `app/page.tsx` with a static read of `content/gallery/home.json`.
14. Create `content/lab-history.json`; move `peopleGroupData` and `peopleGroupSectionData` out of `app/people/page.tsx` into it.
15. Add an explicit `image` field (exact filename, exact folder) to every person JSON file created in Step 3.
16. Delete `getNameBasedPeopleCandidates`, `peopleImageFilenameAliases`, and `peopleImageFolderOverrides` from `app/people/imageUtils.ts` once every person record has an explicit `image` field.
17. Rewrite `app/people/PeopleImage.tsx` to render the explicit `image` path directly, with a single `onError` fallback to the initials placeholder — remove the candidate-array retry loop.

## Stage 1 — Build Typed Content Layer

**Status: Complete**
1. Run `npm install zod`.
2. Create `lib/content/schema.ts`.
3. Define a Zod schema for each of: `Person`, `Publication`, `GalleryImage`, `LabHistoryEntry`, `Page`, `SiteSettings`.
4. Export the inferred TypeScript type for each schema.
5. Create `lib/content/index.ts`.
6. Implement `getPeople(): Person[]` in `lib/content/index.ts` — read and parse every file in `content/people/`, validate each against the `Person` schema, throw on validation failure.
7. Implement `getPublications(): Publication[]` — read `content/publications.json`, validate, sort by `year` descending.
8. Implement `getGallery(category: string): GalleryImage[]` — read `content/gallery/<category>.json`, validate.
9. Implement `getLabHistory(): LabHistoryEntry[]` — read `content/lab-history.json`, validate.
10. Implement `getSiteSettings(): SiteSettings` — read `content/site.json`, validate.
11. Create `content/site.json` with fields: `navItems`, `footerCopyright`, `footerLogo`, `defaultMetaTitle`, `defaultMetaDescription`.
12. Replace the hardcoded `navItems` array in `app/header.tsx` with `getSiteSettings().navItems`.
13. Replace the hardcoded copyright string in `app/components/Footer.tsx` with `getSiteSettings().footerCopyright`.
14. Update every component that imports from `app/people/data.ts` or uses an inline content array to import from `lib/content/index.ts` instead.
15. Create `scripts/validate-content.ts`.
16. In `scripts/validate-content.ts`, call every `get*` function from `lib/content/index.ts`, check every referenced image path exists on disk, and exit with code 1 on any schema or file-existence failure.
17. Add `"validate-content": "tsx scripts/validate-content.ts"` to the `scripts` field in `package.json`.
18. Add a `Validate content` step to `.github/workflows/deploy.yml` that runs `npm run validate-content` immediately before the `Build Next.js (static export)` step.

## Stage 2 — Convert Pages to Server Components

**Status: Complete**
1. Remove `'use client'` from `app/research/page.tsx`.
2. Remove `'use client'` from `app/facilities/page.tsx`.
3. Remove `'use client'` from `app/publications/page.tsx`; render entries from `getPublications()`.
4. Remove `'use client'` from `app/arachnids/page.tsx`; render gallery from `getGallery('arachnids')`.
5. Remove `'use client'` from `app/fieldwork/page.tsx`; render gallery from `getGallery('fieldwork')`.
6. Keep `'use client'` only in: `app/header.tsx`, `app/components/SideNav.tsx`, `app/components/SideNavButton.tsx`, `app/components/Tabs.tsx`, `app/people/PeopleSearch.tsx`, `app/people/usePeopleNavigation.ts`.
7. In `app/collections/page.tsx`, extract the section-switching state and scroll logic into a new client component `app/collections/CollectionsSections.tsx`; keep `app/collections/page.tsx` as a Server Component that renders it.
8. Add a static `export const metadata: Metadata` block with a unique `title` and `description` to every route's `page.tsx`.
9. Create `app/sitemap.ts` exporting a `sitemap()` function that lists every route.
10. Create `app/robots.ts` exporting a `robots()` function.
11. Create `app/not-found.tsx` containing site navigation and a link to `/`.
12. Create `app/error.tsx`, `app/people/error.tsx`, and `app/publications/error.tsx` as route-level error boundaries.
13. Create `app/people/loading.tsx` and `app/publications/loading.tsx`.

## Stage 3 — Component and Code-Quality Refactor

**Status: Complete**
1. Split `app/people/page.tsx` into one file per section under `app/people/sections/` (e.g. `PrincipalInvestigatorSection.tsx`, `MuseumSpecialistsSection.tsx`, `TechnicalStaffSection.tsx`, one per entry in `peopleSections`).
2. Import and compose the section components from `app/people/page.tsx`.
3. Create `app/components/Figure.tsx` accepting `src`, `alt`, `caption`, `width`, `height` props.
4. Replace every manual `<figure><Image/><figcaption/></figure>` block in `app/arachnids/page.tsx`, `app/facilities/page.tsx`, `app/collections/page.tsx`, `app/people/PeopleGroupCard.tsx` with `Figure`.
5. Create `app/components/ExternalLink.tsx` that renders `target="_blank"`, `rel="noopener noreferrer"`, an external-link icon, and the classes `text-blue-600 hover:text-blue-800 underline`.
6. Replace every raw `<a target="_blank">` in `app/collections/page.tsx`, `app/facilities/page.tsx`, `app/research/page.tsx`, `app/people/page.tsx` with `ExternalLink`.
7. Create `app/people/ProfileLinksList.tsx` for the repeated CV/profile-link blocks in `app/people/page.tsx`.
8. Create `lib/shuffle.ts` exporting `hashText` and `deterministicShuffle`.
9. Delete the duplicate `hashText`/`deterministicShuffle` implementations in `app/components/HomeGallery.tsx`, `app/arachnids/page.tsx`, `app/fieldwork/page.tsx`; import both from `lib/shuffle.ts` in each file.
10. Create `lib/scrollMetrics.ts` exporting `getHeaderHeight()` and `getScrollGap()`.
11. Delete the duplicate implementations in `app/collections/page.tsx` and `app/people/usePeopleNavigation.ts`; import both from `lib/scrollMetrics.ts` in each file.
12. Rename `app/header.tsx` to `app/components/Header.tsx`; update the import path in `app/layout.tsx`.
13. Replace every relative import path (`../`, `../../`) with the `@/` alias defined in `tsconfig.json`.
14. Create `app/components/icons/MenuIcon.tsx`, `app/components/icons/CloseIcon.tsx`, `app/components/icons/SearchIcon.tsx`; move the corresponding inline `<svg>` markup out of `app/header.tsx` and `app/people/PeopleSearch.tsx` into them.
15. Add a `lint` step before the `build` step in `.github/workflows/deploy.yml`.
16. Run `npm run lint -- --fix`; manually resolve every remaining lint error.

## Stage 4 — Search and Navigation State Refactor

**Status: Complete**
1. Delete `buildPeopleIndex` and its `querySelectorAll` DOM traversal from `app/people/usePeopleNavigation.ts`.
2. Build the search index inside `usePeopleNavigation` directly from the array returned by `getPeople()` (fields: `name`, `id`, `sectionId`, `tab`).
3. On every Current/Alumni tab change, call `history.pushState` to add a `?tab=alumni` or `?tab=current` query parameter to the URL.
4. On mount, read the `tab` query parameter and set the corresponding tab state to restore it on browser back/forward navigation.
5. Add a `keydown` listener in `app/people/PeopleSearch.tsx` for `Escape` that clears `searchQuery` and blurs the input.
6. Add a global `keydown` listener for `/` that focuses the people search input when no other input is focused.

## Stage 5.1 — CMS Adapter Layer (deploy-safe refactor)

**Status: Complete**
1. Create `lib/content/types.ts` defining a `ContentSource` interface with one method per content loader (`getPeople`, `getPeopleSectionOrder`, `getPublications`, `getGallery`, `getLabHistory`, `getSiteSettings`).
2. Move the file-based loader into `lib/content/localAdapter.ts`; make it implement `ContentSource`.
3. Create `lib/content/getContentSource.ts` that returns the active adapter based on `process.env.CONTENT_SOURCE`, defaulting to `local` when unset or unrecognized.
4. Throw a clear build-time error when `CONTENT_SOURCE=cms` is set before `lib/content/cmsAdapter.ts` exists (Stage 6).
5. Keep `lib/content/index.ts` as the stable entry point — re-export the `get*` helpers and route each call through `getContentSource()` so existing `@/lib/content` imports keep working.
6. Leave image helpers (`getPersonImagePath`, `resolvePublicImagePath`, `imagePathExists`) in `lib/content/index.ts`; they are build/validation utilities, not CMS-backed content.
7. Pin `CONTENT_SOURCE: local` in `.github/workflows/deploy.yml` so DreamHost deploys always build from committed JSON in the repo.
8. Confirm stable identifiers in `lib/content/schema.ts`:
   - `Person.id` — stable; matches filename in `content/people/<id>.json` and people-page hash links.
   - `Page.slug` — defined in schema for future CMS pages.
   - `Publication`, `GalleryImage`, `LabHistoryEntry` — no dedicated `id` yet; `GalleryImage.src` and publication content fields are stable enough for local files but will need explicit ids before CMS import (see Stage 5.2).
9. Document in this file: **`Person.id` and `Page.slug` values must never change after publication** — they are used in URLs, search deep links, and future CMS sync.

## Stage 5.2 — Prepare for Stage 6 (CMS migration checklist)

**Status: Not started** — documentation only; execute when CMS migration is planned.
Complete these before enabling `CONTENT_SOURCE=cms` in production. None of this is required for DreamHost deploy to keep working.

### CMS product and hosting
1. Select a headless CMS that supports webhook- or API-triggered rebuilds compatible with `.github/workflows/deploy.yml` (static export to DreamHost, or plan a hosting change if dropping `output: 'export'`).
2. Decide whether production stays on DreamHost static hosting or moves to a Node/ISR host — Stage 6 Step 8 only applies if leaving static export.

### Schema and content identifiers
3. Add a stable `id` (or `slug`) field to `Publication` in `lib/content/schema.ts` and every entry in `content/publications.json`; generate ids once and treat them as immutable.
4. Add a stable `id` field to `GalleryImage` (or confirm `src` is the canonical CMS key) for `content/gallery/*.json`.
5. Add stable ids to `LabHistoryEntry` sections if the CMS model requires separate records per section.
6. Audit all `Person.id` values against live people-page hash links and search index entries; fix any mismatches before import.
7. Extend `scripts/validate-content.ts` to fail on duplicate `id` values within each collection once ids are added.

### Import tooling
8. Create `scripts/import-to-cms.ts` that reads every file under `content/` via `localAdapter` and creates the corresponding CMS records via API.
9. Run a dry-run import against a staging CMS environment; verify record counts match `npm run validate-content` output.
10. Document CMS collection field mappings in `references/` (one table per schema: local field → CMS field type).

### Adapter and CI
11. Create `lib/content/cmsAdapter.ts` implementing `ContentSource`, fetching from the CMS API at build time.
12. Add CMS API credentials as GitHub Actions secrets (e.g. `CMS_API_URL`, `CMS_API_TOKEN`); do **not** commit them.
13. Add a CI job matrix or env block that runs `validate-content` + `build` with `CONTENT_SOURCE=cms` against staging credentials before switching production.
14. Add a webhook endpoint or GitHub Actions `repository_dispatch` trigger so CMS publish events rerun `.github/workflows/deploy.yml`.
15. Only set `CONTENT_SOURCE: cms` in the deploy workflow **after** steps 11–14 pass on staging.

### Optional Stage 6 features (defer until core migration works)
16. Create `app/api/preview/route.ts` for draft preview (requires dropping pure static export or using a separate preview host).
17. Remove `output: 'export'` from `next.config.ts` only if the hosting target supports Next.js server runtime or ISR.

## Stage 6 — Real CMS Migration

**Status: Not started**
1. Execute the Stage 5.2 checklist.
2. Run `npx tsx scripts/import-to-cms.ts` once against the target CMS environment.
3. Switch production `CONTENT_SOURCE` from `local` to `cms` in `.github/workflows/deploy.yml` (or per-environment deploy config).
4. Monitor the first production deploy: confirm page count, people search, and image paths match the pre-migration static build.
5. Keep `content/` in the repo as a fallback export until CMS editing is trusted; document a rollback procedure (`CONTENT_SOURCE=local` + redeploy).

## Stage 7 — UX Fixes, Heuristic 1: Visibility of System Status

**Status: Not started** — may proceed before Stages 5.2 and 6 (see Progress above).

1. Add a `scroll` event listener in `app/people/usePeopleNavigation.ts` that recalculates `activeSection` based on the section heading nearest the viewport top. — **Watch:** Must coexist with explicit sidebar clicks and `?section=` URL restore; avoid fighting `shouldScrollOnSectionChange` and refresh scroll-to-top behavior.
2. In `app/components/Header.tsx`, swap the hamburger icon for the close icon when `isMenuOpen` is `true` (close icon already exists inside the drawer). — **Watch:** Keep `aria-expanded` and `aria-label` in sync on the toggle button.
3. Add a loading skeleton or blurred placeholder to every `Image` in gallery components while the source loads. — **Watch:** Site uses `images: { unoptimized: true }`; placeholders should not flash on every cached revisit.
4. Render `${filteredResults.length} results` above the results list in `app/people/PeopleSearch.tsx`. — **Watch:** Hide or adjust copy when the query is empty; keep accessible live-region behavior for screen readers.

## Stage 7 — UX Fixes, Heuristic 2: Match Between System and the Real World

1. Create `app/components/GlossaryTerm.tsx` that wraps a term in a `<button>` with a `title` attribute and a click-triggered tooltip. — **Watch:** Tooltip must work on keyboard focus, not just click; mobile needs a tap-friendly pattern.
2. Wrap every occurrence of "Scorpiones", "Pedipalpi", "Solifugae", "Amblypygi", and other order names in body copy with `GlossaryTerm`. — **Watch:** Author must supply definitions; do not invent taxonomy copy — log additions in `references/content-change-suggestions.md`.
3. Change the `"Lab Evolution"` label in `app/people/sections.ts` to `"Lab Through the Years"`. — **Watch:** Author approval required; `sectionId` stays `lab-evolution` (URLs and JSON must not change).

## Stage 7 — UX Fixes, Heuristic 3: User Control and Freedom

1. Add a `keydown` listener for `Escape` in `app/components/Header.tsx` that calls `setIsMenuOpen(false)` when the mobile nav is open. — **Watch:** Do not intercept `Escape` when focus is in People search (already clears search there).
2. Create `app/components/BackToTop.tsx`: a fixed-position button that appears once `window.scrollY > 800` and scrolls to the top on click.
3. Add `BackToTop` to `app/people/page.tsx`, `app/publications/page.tsx`, `app/arachnids/page.tsx`, `app/facilities/page.tsx`. — **Watch:** Account for fixed header height; avoid overlapping the mobile side nav on People/Collections.

## Stage 7 — UX Fixes, Heuristic 4: Consistency and Standards

1. Replace every remaining ad hoc `<a target="_blank">` with `ExternalLink` (many remain in legacy people section JSX, `MarkdownContent`, `Footer`, `ProfileLinksList`, `PublicationsClient`). — **Watch:** `MarkdownContent` external links need a renderer swap, not manual JSX edits in JSON bios.
2. Change the `"Visits and Requests"` heading in `app/page.tsx` from `<h4>` to `<h5>` to match its sibling heading level. — **Watch:** Verify heading hierarchy for accessibility after the change.
3. Align publications page `<h1>` text with the `"Publications"` nav label in `content/site.json` (currently **Scientific Publications** vs **Publications**). — **Watch:** Author chooses which string is canonical; update both places plus `metadata` title if needed.
4. Remove the `.people-compact` override block from `app/globals.css`; apply one consistent grid ratio to every `PeopleCard` usage. — **Watch:** Visual regression on alumni tab layouts; check mobile and desktop People page sections.

## Stage 7 — UX Fixes, Heuristic 6: Recognition Rather Than Recall

1. Create `app/components/TableOfContents.tsx` accepting a list of `{ id, label }` and rendering anchor links.
2. Add `TableOfContents` to `app/arachnids/page.tsx`, `app/facilities/page.tsx`, `app/research/page.tsx`, generated from each page's `h2` section list. — **Watch:** Long pages need `scroll-margin-top` for the fixed header (reuse `lib/scrollMetrics.ts` tokens).
3. Add a sticky year-jump navigation to `app/publications/page.tsx`, generated from distinct `year` values in `content/publications.json`. — **Watch:** Many year groups — consider collapsing or scrollable chip row on mobile.
4. Add category filter chips above the input in `app/people/PeopleSearch.tsx`, wired to `handleSectionSelect`. — **Watch:** Clarify UX vs search-by-name (filter sections vs filter results); sync with `?section=` when a chip is selected.

## Stage 7 — UX Fixes, Heuristic 7: Flexibility and Efficiency of Use

1. Add `author`, `year`, and `topic` filter controls to `app/publications/page.tsx` that filter the array returned by `getPublications()`. — **Watch:** "Topic" is not a schema field today — define a rule or add a field with author approval before implementing.
2. Add a "Copy BibTeX" button to each publication entry that generates BibTeX from structured fields and writes it to the clipboard. — **Watch:** Handle missing `doi`, `volume`, and `pages`; test Safari clipboard permissions.
3. Add a "Copy link" button next to every person heading and page section heading that copies `window.location.origin + pathname + '#' + id` to the clipboard. — **Watch:** People deep links need `?section=` and `?tab=` in addition to `#person-id` for a reliable share URL; not all sections have stable heading `id`s yet.

## Stage 7 — UX Fixes, Heuristic 8: Aesthetic and Minimalist Design

1. Restructure the taxonomy list in `app/page.tsx` into a two-column grid with group headers and consistent spacing.
2. Normalize every figure image width in `app/arachnids/page.tsx` to one of a fixed set of grid columns instead of arbitrary pixel values. — **Watch:** Preserve `Figure` component aspect ratios; re-check layout after width normalization.
3. Add a subheading or pull-quote component inside every paragraph exceeding 150 words in `app/arachnids/page.tsx`, `app/facilities/page.tsx`, `app/collections/page.tsx`. — **Watch:** Author must approve any new subheadings or pull-quote text extracted from body copy.
4. Delete the duplicated introductory paragraph from either `app/page.tsx` or `app/arachnids/page.tsx`; keep one canonical version and link to it from the other. — **Watch:** Author approval required — do not delete or rewrite copy without review.

## Stage 7 — UX Fixes, Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors

1. In `app/people/PeopleImage.tsx`, render a visible "Image unavailable" label inside the initials-fallback state (currently `PhotoPlaceholder` only). — **Watch:** Keep layout stable so cards don't jump when images fail.
2. Add a check for every `href` pointing to `/documents/*.pdf` to `scripts/validate-content.ts`; fail validation if the file is missing. — **Watch:** Scan both JSX and Markdown/HTML in JSON content fields, not just static pages.

## Stage 7 — UX Fixes, Heuristic 10: Help and Documentation

1. Convert the legal specimen-deposition paragraphs in `app/collections/page.tsx` into an ordered `<ol>` list with one step per `<li>`. — **Watch:** Author must confirm step order and wording; restructuring only, no copy edits without review.
2. Create `content/faq.json` with `{ question, answer, category }` entries covering the loan and visit process. — **Watch:** All FAQ copy is author-owned; add route to `app/sitemap.ts` when the page exists.
3. Create `app/faq/page.tsx` that renders `content/faq.json` with a search/filter input.
4. Add a link to `/faq` from the "Loan Requests" and "Visiting Scientists" sections in `app/collections/page.tsx`.
5. Link every `GlossaryTerm` tooltip (Heuristic 2) to its full entry on `/faq` or a dedicated `/glossary` page. — **Watch:** Depends on Heuristic 2 and FAQ/glossary content existing first.
