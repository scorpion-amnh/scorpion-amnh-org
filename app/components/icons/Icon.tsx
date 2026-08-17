import type { HTMLAttributes } from "react";

type FaStyle = "solid" | "regular" | "brands";

const styleClass: Record<FaStyle, string> = {
  solid: "fa-solid",
  regular: "fa-regular",
  brands: "fa-brands",
};

/** Scales inline icons to 6/7 of the parent font size (e.g. 12px when text is 14px). */
export const inlineIconClassName = "inline-block align-[-0.125em] text-[6/7em]";

type IconProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  name: string;
  iconStyle?: FaStyle;
  inline?: boolean;
};

export function Icon({ name, iconStyle = "solid", inline, className, ...props }: IconProps) {
  return (
    <i
      className={[
        styleClass[iconStyle],
        `fa-${name}`,
        "shrink-0",
        inline ? inlineIconClassName : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    />
  );
}
