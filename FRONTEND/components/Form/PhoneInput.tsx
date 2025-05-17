import { COUNTRIES } from "@/constant";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";

type Country = {
  code: string;
  name: string;
  dial_code: string;
};

interface IProps {
  label?: string;
  placeholder?: string;
  onChange?: (phoneNumber: string, dialCode : string)=> void;
  errorMsg?: string;
  defaultValue?: string;
  dialCode?: string;
}

const PhoneInput: React.FC<IProps> = ({
  label,
  placeholder,
  errorMsg,
  onChange,
  defaultValue,
  dialCode,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState(defaultValue || "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !triggerRef.current?.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setPhoneNumber(defaultValue || "");
  }, [defaultValue]);

  useEffect(() => {
    const findCountryInfo = COUNTRIES.filter(
      (item) => item.dial_code === dialCode
    );
    if (findCountryInfo[0]) {
      setSelectedCountry(findCountryInfo[0]);
    }
  }, [dialCode]);

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial_code.includes(searchQuery)
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onChange?.(phoneNumber, country.dial_code);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-full space-y-1.5">
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

      <div
        className={cn(
          "flex items-center w-full border overflow-hidden rounded-md focus-within:ring-1",
          errorMsg
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-400 focus-within:ring-accent"
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          className="flex items-center gap-2 p-2.5 px-4 border-r border-gray-400 bg-transparent hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ReactCountryFlag
            countryCode={selectedCountry.code}
            svg
            className="w-6 h-4"
          />
          <span className="text-sm text-gray-700">
            {selectedCountry.dial_code}
          </span>
        </button>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, ""); // Remove non-digits
            // setPhoneNumber(cleaned);
            // onChange?.(selectedCountry.dial_code + cleaned);
            onChange?.(cleaned, selectedCountry.dial_code);
          }}
          placeholder={placeholder}
          className="flex-1 p-2 text-sm outline-none"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-md z-50"
        >
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 text-sm border-b focus:outline-none focus:border-gray-300"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="flex items-center w-full p-2 text-sm hover:bg-gray-100 transition-colors"
              >
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  className="w-6 h-4 mr-2"
                />
                <span className="flex-1 text-left">{country.name}</span>
                <span className="text-gray-500">{country.dial_code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {errorMsg ? (
        <span className="text-sm text-red-500">{errorMsg}</span>
      ) : null}
    </div>
  );
};

export default PhoneInput;
