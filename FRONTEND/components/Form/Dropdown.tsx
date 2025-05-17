import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  options: OptionType[];
  onSelect: (value: string) => void;
  placeholder?: string;
  classNames?: string;
  label?: string;
  errorMsg?: string;
  defaultValue?: string;
}

const Dropdown = ({
  options,
  onSelect,
  placeholder = "Select...",
  classNames,
  label,
  errorMsg,
  defaultValue,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(defaultValue || "");
  }, [defaultValue]);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: OptionType) => {
    setSelectedValue(option.value);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn("relative font-sans font-primary space-y-1.5", classNames)}
      ref={dropdownRef}
    >
      {label ? (
        <label
          className={cn(
            "font-[600] text-sm inline-block",
            errorMsg ? "text-red-500" : ""
          )}
        >
          {label}
        </label>
      ) : null}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-2.5 px-4 text-left border rounded-lg",
          !selectedValue ? "text-gray-400" : "text-gray-700",
          "focus:outline-none focus:ring-1",
          "text-sm flex items-center justify-between",
          errorMsg
            ? "focus:ring-red-500 border-red-500"
            : "focus:ring-accent border-gray-400 "
        )}
      >
        {selectedLabel}
        <ChevronDown size={15} />
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-2 overflow-auto bg-white rounded-lg shadow-xl max-h-60
          border border-gray-100 focus:outline-none"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 cursor-pointer hover:bg-blue-50 text-gray-700
                border-b border-gray-100 last:border-b-0 transition-colors text-sm"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {errorMsg ? (
        <span className="text-sm text-red-500">{errorMsg}</span>
      ) : null}
    </div>
  );
};

export default Dropdown;
