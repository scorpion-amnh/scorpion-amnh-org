import type { Metadata } from "next";
import Link from "next/link";
import {
  brandPaletteSteps,
  buildPaletteSteps,
  LinkColorSample,
  LinkOnDarkColorSample,
  PaletteScale,
  SemanticColorRow,
  SemanticColorTable,
  type SemanticColorToken,
} from "@/app/design-system/ColorsSpec";
import { TypeScaleRow, TypeTokenTable, type TypeTokenProps } from "@/app/design-system/TypographySpec";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Design System | Arachnology at AMNH",
  "Typography and color tokens for the Scorpion Systematics Research Group website."
);

const DEFAULT_LEADING = "1.5 (default)";
const DEFAULT_COLOR = "primary (default)";

const typeTokens: TypeTokenProps[] = [
  { token: "body", font: "Source Sans 3", size: "16px", weight: "400", leading: DEFAULT_LEADING, color: DEFAULT_COLOR },
  { token: "h1", font: "Farnham Display", size: "48px", weight: "700", leading: "1.1", color: DEFAULT_COLOR },
  { token: "h1.compact", font: "Farnham Display", size: "30px", weight: "700", leading: "1.15", color: DEFAULT_COLOR },
  { token: "h2", font: "Farnham Display", size: "30px", weight: "700", leading: "1.15", color: DEFAULT_COLOR },
  { token: "h3", font: "Source Sans 3", size: "24px", weight: "700", leading: "1.2", color: DEFAULT_COLOR },
  { token: "h4", font: "Source Sans 3", size: "20px", weight: "700", leading: "1.25", color: DEFAULT_COLOR },
  { token: "h5", font: "Source Sans 3", size: "18px", weight: "600", leading: "1.3", color: DEFAULT_COLOR },
  { token: "h6", font: "Source Sans 3", size: "16px", weight: "600", leading: "1.35", color: DEFAULT_COLOR },
  { token: "p.lead", font: "Source Sans 3", size: "20px (.text-lead)", weight: "400", leading: DEFAULT_LEADING, color: DEFAULT_COLOR },
  { token: "p", font: "Source Sans 3", size: "16px", weight: "400", leading: DEFAULT_LEADING, color: DEFAULT_COLOR },
  { token: "p.meta", font: "Source Sans 3", size: "14px", weight: "400", leading: DEFAULT_LEADING, color: "secondary (.text-meta)" },
  { token: "figcaption", font: "Source Sans 3", size: "14px", weight: "400", leading: DEFAULT_LEADING, color: "secondary (.text-meta)" },
  { token: "a", font: "Source Sans 3", size: "inherits", weight: "inherits", leading: "inherits", color: "link" },
];

const semanticColorTokens: SemanticColorToken[] = [
  {
    token: "primary",
    cssVar: "--text-color-primary",
    hex: "#181817",
    tailwind: "text-color-primary",
    usage: "Body copy, headings, default text",
  },
  {
    token: "secondary",
    cssVar: "--text-color-secondary",
    hex: "#4C4D4E",
    tailwind: "text-color-secondary · .text-meta",
    usage: "Captions, metadata, supporting text",
  },
  {
    token: "light",
    cssVar: "--text-color-light",
    hex: "#F4F7FC",
    tailwind: "text-color-light",
    usage: "Text on dark panels (e.g. bg-gray-90)",
  },
  {
    token: "link",
    cssVar: "--text-color-link",
    hex: "#0A7A9A",
    tailwind: "text-color-link",
    usage: "Default inline links",
  },
  {
    token: "link-hover",
    cssVar: "--text-color-link-hover",
    hex: "#005F81",
    tailwind: "hover:text-color-link-hover",
    usage: "Link hover state on light backgrounds",
  },
  {
    token: "link-on-dark",
    cssVar: "--text-color-link-on-dark",
    hex: "#5FCAE5",
    tailwind: "text-color-link-on-dark",
    usage: "Links on dark backgrounds",
  },
  {
    token: "link-on-dark-hover",
    cssVar: "--text-color-link-on-dark-hover",
    hex: "#8EE4F2",
    tailwind: "hover:text-color-link-on-dark-hover",
    usage: "Link hover state on dark backgrounds",
  },
  {
    token: "background",
    cssVar: "--background",
    hex: "#FFFFFF",
    tailwind: "bg-background",
    usage: "Page background",
  },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-1 text-meta">Design system</p>
          <h1 className="font-bold mb-3">Design System</h1>
          <p className="text-sm">
            Typography and color tokens for the Scorpion Systematics Research Group website.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="font-bold mb-4">Typography</h2>
          <p className="mb-4 text-sm">
            Farnham Display · h1–h2 &nbsp;|&nbsp; Source Sans 3 · h3 and below, body, UI.
            Typography conventions follow <em>The Chicago Manual of Style</em> (CMOS), matching what site
            users expect from AMNH and scholarly publishing.
          </p>
          <p className="mb-10 text-sm">
            <strong className="font-semibold">Headings (CMOS headline style).</strong> Set title capitalization in
            markup. Lowercase articles (<code className="text-xs">a</code>, <code className="text-xs">an</code>,{" "}
            <code className="text-xs">the</code>), coordinating conjunctions (
            <code className="text-xs">and</code>, <code className="text-xs">but</code>,{" "}
            <code className="text-xs">for</code>, <code className="text-xs">or</code>,{" "}
            <code className="text-xs">nor</code>), and prepositions (
            <code className="text-xs">of</code>, <code className="text-xs">in</code>,{" "}
            <code className="text-xs">on</code>, <code className="text-xs">at</code>,{" "}
            <code className="text-xs">to</code>, etc.) unless they are the first or last word. Capitalize nouns,
            pronouns, verbs, adjectives, and adverbs. Example:{" "}
            <span className="text-meta">Theory and Practice of Systematics</span>. Add{" "}
            <code className="text-xs">normal-case</code> to opt out (proper names, acronyms, UI labels).
          </p>

          <h3 className="font-bold mb-4">Type scale</h3>
          <p className="mb-6 text-sm">
            Stacked preview from largest to smallest. Specs list leading and color only when they
            differ from the body default (leading 1.5, color primary).
          </p>

          <div className="mb-10 rounded-sm border border-gray-200 px-4 md:px-6">
            <TypeScaleRow
              token="h1"
              spec={{ font: "Farnham Display", size: "48px", weight: "700", leading: "1.1" }}
            >
              <h1 className="font-bold">People</h1>
            </TypeScaleRow>

            <TypeScaleRow
              token="p.lead"
              spec={{ font: "Source Sans 3", size: "20px", weight: "400" }}
            >
              <p className="text-lead">Introductory line under the page title.</p>
            </TypeScaleRow>

            <TypeScaleRow
              token="h2"
              spec={{ font: "Farnham Display", size: "30px", weight: "700", leading: "1.15" }}
            >
              <h2 className="font-bold">Theory and Practice of Systematics</h2>
            </TypeScaleRow>

            <TypeScaleRow
              token="h3"
              spec={{ font: "Source Sans 3", size: "24px", weight: "700", leading: "1.2" }}
            >
              <h3 className="font-bold">Subsection heading</h3>
            </TypeScaleRow>

            <TypeScaleRow token="p" spec={{ font: "Source Sans 3", size: "16px", weight: "400" }}>
              <p>Body copy in paragraphs and lists.</p>
            </TypeScaleRow>

            <TypeScaleRow
              token="h4"
              spec={{ font: "Source Sans 3", size: "20px", weight: "700", leading: "1.25" }}
            >
              <h4 className="font-bold">Card or sidebar block</h4>
            </TypeScaleRow>

            <TypeScaleRow
              token="h5"
              spec={{ font: "Source Sans 3", size: "18px", weight: "600", leading: "1.3" }}
            >
              <h5 className="font-semibold">Group label</h5>
            </TypeScaleRow>

            <TypeScaleRow
              token="h6"
              spec={{ font: "Source Sans 3", size: "16px", weight: "600", leading: "1.35" }}
            >
              <h6 className="font-semibold">Nested label</h6>
            </TypeScaleRow>

            <TypeScaleRow
              token="p.meta"
              spec={{ font: "Source Sans 3", size: "14px", weight: "400", color: "secondary" }}
            >
              <p className="text-meta">Postdoc from 2018 to 2020</p>
            </TypeScaleRow>

            <TypeScaleRow
              token="figcaption"
              spec={{ font: "Source Sans 3", size: "14px", weight: "400", color: "secondary" }}
            >
              <figcaption className="text-meta">Figure caption text</figcaption>
            </TypeScaleRow>

            <TypeScaleRow
              token="a"
              spec={{ font: "Source Sans 3", size: "inherits", weight: "inherits", color: "link" }}
            >
              <p>
                Inline{" "}
                <Link href="/collections" className="text-color-link hover:text-color-link-hover link-underline">
                  link
                </Link>{" "}
                in body copy.
              </p>
            </TypeScaleRow>
          </div>

          <h3 className="font-bold mb-4">Tokens</h3>
          <TypeTokenTable rows={typeTokens} />
        </section>

        <section>
          <h2 className="font-bold mb-4">Colors</h2>
          <p className="mb-10 text-sm">
            Semantic text colors are defined as CSS custom properties in{" "}
            <code className="text-xs">globals.css</code> and exposed as Tailwind utilities. Brand palettes live in{" "}
            <code className="text-xs">tailwind.config.js</code> and are available as{" "}
            <code className="text-xs">bg-</code>, <code className="text-xs">border-</code>, and related utilities
            (e.g. <code className="text-xs">bg-gray-90</code>, <code className="text-xs">text-cyan-70</code>).
          </p>

          <h3 className="font-bold mb-4">Semantic tokens</h3>
          <p className="mb-6 text-sm">
            Live previews of text colors used across the site. Link tokens include hover states in context.
          </p>

          <div className="mb-10 rounded-sm border border-gray-200 px-4 md:px-6">
            <SemanticColorRow
              token={semanticColorTokens[0]}
              sample={<p className="text-color-primary">Primary body and heading text</p>}
            />
            <SemanticColorRow
              token={semanticColorTokens[1]}
              sample={<p className="text-meta">Secondary metadata and caption text</p>}
            />
            <SemanticColorRow
              token={semanticColorTokens[2]}
              sample={
                <p className="rounded-sm bg-gray-90 px-3 py-2 text-color-light">Light text on a dark panel</p>
              }
            />
            <SemanticColorRow token={semanticColorTokens[3]} sample={<LinkColorSample />} />
            <SemanticColorRow token={semanticColorTokens[4]} sample={<LinkColorSample />} />
            <SemanticColorRow token={semanticColorTokens[5]} sample={<LinkOnDarkColorSample />} />
            <SemanticColorRow token={semanticColorTokens[6]} sample={<LinkOnDarkColorSample />} />
            <SemanticColorRow
              token={semanticColorTokens[7]}
              sample={
                <div className="rounded-sm border border-gray-200 px-3 py-2 text-sm">Page background swatch</div>
              }
            />
          </div>

          <h3 className="font-bold mb-4">Token reference</h3>
          <SemanticColorTable rows={semanticColorTokens} />

          <h3 className="mb-4 mt-10 font-bold">Brand palettes</h3>
          <p className="mb-6 text-sm">
            Full scales from light (left) to dark (right). Each step shares the same
            lightness as its gray counterpart (e.g. <code className="text-xs">cyan-40</code> is
            as dark as <code className="text-xs">gray-40</code>). The{" "}
            <code className="text-xs">00</code> step is a near-white tinted surface.
          </p>

          <div className="rounded-sm border border-gray-200 px-4 md:px-6">
            <PaletteScale name="Gray" steps={buildPaletteSteps("gray", brandPaletteSteps)} />
            <PaletteScale name="Cyan" steps={buildPaletteSteps("cyan", brandPaletteSteps)} />
            <PaletteScale name="Rust" steps={buildPaletteSteps("rust", brandPaletteSteps)} />
            <PaletteScale name="Olive" steps={buildPaletteSteps("olive", brandPaletteSteps)} />
            <PaletteScale name="Gold" steps={buildPaletteSteps("gold", brandPaletteSteps)} />
          </div>
        </section>
      </div>
    </div>
  );
}
