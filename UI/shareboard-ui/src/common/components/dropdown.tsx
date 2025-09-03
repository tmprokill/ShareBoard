import { ChangeEvent } from "react";

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  label?: string;
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
}: DropdownProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}