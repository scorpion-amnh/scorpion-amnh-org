import Link from "next/link";
import type { ReactNode } from "react";

export type SemanticColorToken = {
  token: string;
  cssVar: string;
  hex: string;
  tailwind: string;
  usage: string;
};

export type PaletteStep = {
  token: string;
  hex: string;
};

type SemanticColorRowProps = {
  token: SemanticColorToken;
  sample: ReactNode;
};

export function SemanticColorRow({ token, sample }: SemanticColorRowProps) {
  return (
    <div className="grid gap-4 border-b border-gray-100 py-4 last:border-b-0 md:grid-cols-[7rem_1fr_11rem]">
      <code className="self-start text-left text-xs text-meta">{token.token}</code>
      <div className="flex min-w-0 items-start gap-4 self-start">
        <div
          className="mt-0.5 size-10 shrink-0 rounded-sm border border-gray-200"
          style={{ backgroundColor: token.hex }}
          aria-hidden
        />
        <div className="min-w-0">{sample}</div>
      </div>
      <dl className="self-start space-y-0.5 text-xs text-meta">
        <div>
          <dt className="sr-only">Hex</dt>
          <dd>{token.hex}</dd>
        </div>
        <div>
          <dt className="sr-only">CSS variable</dt>
          <dd>{token.cssVar}</dd>
        </div>
        <div>
          <dt className="sr-only">Tailwind class</dt>
          <dd>{token.tailwind}</dd>
        </div>
      </dl>
    </div>
  );
}

type PaletteScaleProps = {
  name: string;
  steps: PaletteStep[];
};

export function PaletteScale({ name, steps }: PaletteScaleProps) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-b-0">
      <h3 className="mb-3 font-semibold">{name}</h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {steps.map((step) => (
          <div key={step.token} className="min-w-0">
            <div
              className="aspect-square w-full rounded-sm border border-gray-200"
              style={{ backgroundColor: step.hex }}
              title={`${step.token} · ${step.hex}`}
            />
            <p className="mt-1 truncate font-mono text-[10px] text-meta">{step.token}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SemanticColorTable({ rows }: { rows: SemanticColorToken[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-meta">
          <tr>
            <th className="px-4 py-3 font-semibold">Token</th>
            <th className="px-4 py-3 font-semibold">Hex</th>
            <th className="px-4 py-3 font-semibold">CSS variable</th>
            <th className="px-4 py-3 font-semibold">Tailwind</th>
            <th className="px-4 py-3 font-semibold">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.token}>
              <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
              <td className="px-4 py-3 font-mono text-xs">{row.hex}</td>
              <td className="px-4 py-3 font-mono text-xs">{row.cssVar}</td>
              <td className="px-4 py-3 font-mono text-xs">{row.tailwind}</td>
              <td className="px-4 py-3">{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LinkColorSample() {
  return (
    <p>
      Inline{" "}
      <Link href="/collections" className="text-color-link hover:text-color-link-hover link-underline">
        link
      </Link>{" "}
      in body copy.
    </p>
  );
}

export function LinkOnDarkColorSample() {
  return (
    <p className="rounded-sm bg-gray-90 px-3 py-2 text-color-light">
      Link on dark:{" "}
      <Link href="/collections" className="text-color-link-on-dark hover:text-color-link-on-dark-hover link-underline">
        collections
      </Link>
    </p>
  );
}

const brandColorHex: Record<string, string> = {
  "gray-00": "#F4F7FC",
  "gray-10": "#E1E2E5",
  "gray-20": "#C7C8CA",
  "gray-30": "#B0B1B3",
  "gray-40": "#969698",
  "gray-50": "#7E7F81",
  "gray-60": "#656767",
  "gray-70": "#4C4D4E",
  "gray-80": "#323232",
  "gray-90": "#181817",
  "cyan-00": "#F5FAFC",
  "cyan-10": "#D3ECF3",
  "cyan-20": "#A7DCEA",
  "cyan-30": "#7DD0E6",
  "cyan-40": "#4AC4E4",
  "cyan-50": "#1BBAE4",
  "cyan-60": "#1098BC",
  "cyan-70": "#097491",
  "cyan-80": "#054C5F",
  "cyan-90": "#02242D",
  "rust-00": "#FBF6F5",
  "rust-10": "#F3DBD3",
  "rust-20": "#F0B4A1",
  "rust-30": "#F48F6F",
  "rust-40": "#E3704B",
  "rust-50": "#CD5732",
  "rust-60": "#9F492D",
  "rust-70": "#783622",
  "rust-80": "#4F2315",
  "rust-90": "#25100A",
  "olive-00": "#FAFCF5",
  "olive-10": "#EAF2D4",
  "olive-20": "#D7E6AB",
  "olive-30": "#C7DE85",
  "olive-40": "#AEC767",
  "olive-50": "#95AD52",
  "olive-60": "#727F4D",
  "olive-70": "#555F3B",
  "olive-80": "#383E26",
  "olive-90": "#1A1D12",
  "gold-00": "#FBF9F5",
  "gold-10": "#F0E8D6",
  "gold-20": "#E2D2AF",
  "gold-30": "#D7C08C",
  "gold-40": "#CAAA64",
  "gold-50": "#BF9840",
  "gold-60": "#937739",
  "gold-70": "#6E5A2C",
  "gold-80": "#483A1C",
  "gold-90": "#221B0D",
};

export function buildPaletteSteps(prefix: string, steps: string[]): PaletteStep[] {
  return steps.map((step) => {
    const token = `${prefix}-${step}`;
    const hex = brandColorHex[token];
    if (!hex) {
      throw new Error(`Missing brand color for ${token}`);
    }
    return { token, hex };
  });
}

export const brandPaletteSteps = ["00", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
