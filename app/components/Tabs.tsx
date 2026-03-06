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
      <div className="flex gap-6">
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative -mb-px px-1 pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-600 border-b-2 border-transparent hover:text-gray-800"
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
