"use client";

import { Listbox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  error?: string | null;
  disabled?: boolean;
  description?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  disabled,
  description,
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium sm:text-lg"
      >
        {label}
      </label>

      {description && (
        <p className="mb-1 text-sm text-gray-500">{description}</p>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            onBlur={onBlur}
            className={`w-full border rounded-md py-2 pl-3 pr-10 text-left bg-white text-sm shadow-sm focus:outline-none focus:ring-1 ${
              error
                ? "border-red-600 ring-red-600"
                : "border-gray-300 ring-primary"
            }`}
          >
            <span className="block truncate">
              {selectedOption?.label || "Select an option"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-primary text-white" : "text-gray-900"
                  }`
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
