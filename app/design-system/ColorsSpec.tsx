import Link from "next/link";

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
  sample: React.ReactNode;
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
