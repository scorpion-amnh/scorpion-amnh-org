import type { ReactNode } from "react";

type PeopleCardProps = {
  children: ReactNode;
  containerClassName?: string;
  id?: string;
};

type PeopleCardSlotProps = {
  children: ReactNode;
  className?: string;
};

const buildClassName = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const PeopleCard = ({ children, containerClassName, id }: PeopleCardProps) => {
  const classes = buildClassName("people-card", id ? "person-anchor" : undefined, containerClassName);

  return (
    <div id={id} className={classes}>
      <div className="grid md:grid-cols-5 gap-6">{children}</div>
    </div>
  );
};

export const PeopleCardMedia = ({ children, className }: PeopleCardSlotProps) => {
  const classes = buildClassName("md:col-span-2", className);
  return <div className={classes}>{children}</div>;
};

export const PeopleCardBody = ({ children, className }: PeopleCardSlotProps) => {
  const classes = buildClassName("md:col-span-3", className);
  return <div className={classes}>{children}</div>;
};
