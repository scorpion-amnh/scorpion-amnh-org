import type { ReactNode } from "react";

type PeopleCardProps = {
  children: ReactNode;
  containerClassName?: string;
};

type PeopleCardSlotProps = {
  children: ReactNode;
  className?: string;
};

export const PeopleCard = ({ children, containerClassName }: PeopleCardProps) => {
  const classes = ["people-card", containerClassName].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="grid md:grid-cols-5 gap-6">{children}</div>
    </div>
  );
};

export const PeopleCardMedia = ({ children, className }: PeopleCardSlotProps) => {
  const classes = ["md:col-span-2", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};

export const PeopleCardBody = ({ children, className }: PeopleCardSlotProps) => {
  const classes = ["md:col-span-3", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};
