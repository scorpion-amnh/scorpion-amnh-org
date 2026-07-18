import type { ReactNode } from "react";

export type TypeSpec = {
  font: string;
  size: string;
  weight: string;
  leading?: string;
  color?: string;
};

type TypeScaleRowProps = {
  token: string;
  spec: TypeSpec;
  children: ReactNode;
};

export function TypeScaleRow({ token, spec, children }: TypeScaleRowProps) {
  return (
    <div className="grid gap-4 border-b border-gray-100 py-4 last:border-b-0 md:grid-cols-[7rem_1fr_11rem]">
      <code className="self-start text-left text-xs text-meta">{token}</code>
      <div className="min-w-0 self-start text-left">{children}</div>
      <dl className="self-start space-y-0.5 text-xs text-meta">
        <div>
          <dt className="sr-only">Typeface</dt>
          <dd>{spec.font}</dd>
        </div>
        <div>
          <dt className="sr-only">Size and weight</dt>
          <dd>
            {spec.size} · {spec.weight}
          </dd>
        </div>
        {spec.leading ? (
          <div>
            <dt className="sr-only">Leading</dt>
            <dd>Leading {spec.leading}</dd>
          </div>
        ) : null}
        {spec.color ? (
          <div>
            <dt className="sr-only">Color</dt>
            <dd>Color {spec.color}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

export type TypeTokenProps = {
  token: string;
  font: string;
  size: string;
  weight: string;
  leading: string;
  color: string;
};

export function TypeTokenTable({ rows }: { rows: TypeTokenProps[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-meta">
          <tr>
            <th className="px-4 py-3 font-semibold">Token</th>
            <th className="px-4 py-3 font-semibold">Typeface</th>
            <th className="px-4 py-3 font-semibold">Size</th>
            <th className="px-4 py-3 font-semibold">Weight</th>
            <th className="px-4 py-3 font-semibold">Leading</th>
            <th className="px-4 py-3 font-semibold">Color</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.token}>
              <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
              <td className="px-4 py-3">{row.font}</td>
              <td className="px-4 py-3">{row.size}</td>
              <td className="px-4 py-3">{row.weight}</td>
              <td className="px-4 py-3">{row.leading}</td>
              <td className="px-4 py-3">{row.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
