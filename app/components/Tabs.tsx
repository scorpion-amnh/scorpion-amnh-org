type TabOption<T extends string> = {
  value: T;
  label: string;
};

type TabsProps<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Tabs<T extends string>({ options, value, onChange }: TabsProps<T>) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-6" role="tablist">
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              role="tab"
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative -mb-px px-1 pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-color-primary"
                  : "border-b-2 border-transparent hover:text-color-primary"
              }`}
              aria-selected={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
