"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<T> {
  label?: string;
  name: string;
  value: T | null;
  onChange: (value: T) => void;
  error?: string | null;
  description?: string;
  options: T[];
  displayKey?: keyof T;
  placeholder?: string;
  disabled?: boolean;
}

const ComboboxField = <T extends SelectOption>({
  label,
  name,
  value,
  onChange,
  error,
  description,
  options,
  displayKey = "label",
  placeholder = "Search or select...",
  disabled = false,
}: SelectFieldProps<T>) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) =>
          String(item[displayKey]).toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      {/* Label */}
      <label htmlFor={name} className="label-class">
        {label}
      </label>

      {/* Description */}
      {description && (
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}

      {/* Combobox */}
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          {/* Input */}
          <ComboboxInput
            id={name}
            name={name}
            placeholder={placeholder}
            className="input-class border-[#aaa]"
            displayValue={(item: T) => (item ? String(item[displayKey]) : "")}
            onChange={(event) => setQuery(event.target.value)}
          />

          {/* Dropdown Button */}
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
            <IoChevronDown
              className={clsx(
                "h-4 w-4 transition-colors duration-200",
                disabled
                  ? "text-gray-400 "
                  : "text-[#aaa] group-hover:text-gray-700 "
              )}
            />
          </ComboboxButton>

          {/* Options */}
          <ComboboxOptions
            className={clsx(
              "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg",
              "bg-white ",
              "border border-gray-200 ",
              "shadow-lg ring-1 ring-black/5 ",
              "py-1 text-sm",
              "transition duration-100 ease-out",
              "data-[closed]:opacity-0 data-[closed]:scale-95",
              "data-[enter]:duration-100 data-[enter]:ease-out",
              "data-[leave]:duration-75 data-[leave]:ease-in"
            )}
          >
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-3 py-2 text-text-strong ">
                No results found.
              </div>
            ) : (
              filteredOptions.map((item, index) => (
                <ComboboxOption
                  key={item.value || index}
                  value={item}
                  className={({ focus, selected }) =>
                    clsx(
                      "relative cursor-pointer select-none px-3 py-2 pr-9",
                      "transition-colors duration-150",
                      focus && "bg-blue-50 ",
                      selected && "bg-blue-100"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          selected
                            ? "font-medium text-blue-900 "
                            : "text-gray-900 "
                        )}
                      >
                        {String(item[displayKey])}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <FaCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ComboboxField;
