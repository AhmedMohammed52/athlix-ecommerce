import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

const options = ["Home", "Work", "Other"];

export default function AddressTypeSelect({
  value,
  onChange,
  error,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.includes(value) ? value : "Home";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(option) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex h-12 w-full items-center justify-between
          rounded-xl border
          bg-background
          px-4
          text-sm font-medium
          text-foreground
          outline-none
          transition-all duration-200

          ${
            error
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : isOpen
                ? "border-foreground ring-1 ring-ring"
                : "border-input hover:border-foreground/50"
          }

          disabled:cursor-not-allowed
          disabled:opacity-60
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption}</span>

        <FiChevronDown
          className={`
            size-4
            text-muted-foreground
            transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {isOpen && !disabled && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+6px)]
            z-50
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-background
            p-1
            shadow-xl
            animate-in
            fade-in
            slide-in-from-top-1
            duration-150
          "
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option === selectedOption;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`
                  flex
                  h-10
                  w-full
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  text-left
                  text-sm
                  transition-colors duration-150

                  ${
                    isSelected
                      ? "bg-muted font-medium text-foreground"
                      : "text-foreground hover:bg-muted/60"
                  }
                `}
              >
                <span>{option}</span>

                {isSelected && <FiCheck className="size-4 text-foreground" />}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
