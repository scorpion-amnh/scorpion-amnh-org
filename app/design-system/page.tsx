import type { Metadata } from "next";
import Link from "next/link";
import { TypeScaleRow, TypeTokenTable, type TypeTokenProps } from "@/app/design-system/TypographySpec";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Design System | Arachnology at AMNH",
  "Typography scale for the Scorpion Systematics Research Group website."
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
  { token: "p.lead", font: "Source Sans 3", size: "20px", weight: "400", leading: DEFAULT_LEADING, color: DEFAULT_COLOR },
  { token: "p", font: "Source Sans 3", size: "16px", weight: "400", leading: DEFAULT_LEADING, color: DEFAULT_COLOR },
  { token: "p.meta", font: "Source Sans 3", size: "14px", weight: "400", leading: DEFAULT_LEADING, color: "secondary (.text-meta)" },
  { token: "figcaption", font: "Source Sans 3", size: "14px", weight: "400", leading: DEFAULT_LEADING, color: "secondary (.text-meta)" },
  { token: "a", font: "Source Sans 3", size: "inherits", weight: "inherits", leading: "inherits", color: "link" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-1 text-meta">Design system</p>
          <h1 className="font-bold mb-3">Typography</h1>
          <p className="text-sm">
            Farnham Display · h1–h2 &nbsp;|&nbsp; Source Sans 3 · h3 and below, body, UI.
            Headings use title case site-wide; add <code className="text-xs">normal-case</code> to opt out.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="font-bold mb-4">Type scale</h2>
          <p className="mb-6 text-sm">
            Stacked preview from largest to smallest. Specs list leading and color only when they
            differ from the body default (leading 1.5, color primary).
          </p>

          <div className="rounded-sm border border-gray-200 px-4 md:px-6">
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
              <p className="text-xl">Introductory line under the page title.</p>
            </TypeScaleRow>

            <TypeScaleRow
              token="h2"
              spec={{ font: "Farnham Display", size: "30px", weight: "700", leading: "1.15" }}
            >
              <h2 className="font-bold">Graduate Students</h2>
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
                <Link href="/collections" className="text-color-link hover:text-color-link-hover underline">
                  link
                </Link>{" "}
                in body copy.
              </p>
            </TypeScaleRow>
          </div>
        </section>

        <section>
          <h2 className="font-bold mb-4">Tokens</h2>
          <TypeTokenTable rows={typeTokens} />
        </section>
      </div>
    </div>
  );
}
