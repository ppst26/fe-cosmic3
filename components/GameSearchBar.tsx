"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useT } from "@/lib/i18n/I18nProvider";

interface GameSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  id?: string;
}

/**
 * GameSearchBar — ช่องค้นหาค่าย/เกม (ตรรกะเดียวกับ glass: เก็บคำค้นใน state แล้วส่งผ่าน onSearch)
 */
export function GameSearchBar({ placeholder, onSearch, className = "", id = "game-search" }: GameSearchBarProps) {
  const t = useT("home");
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${className}`.trim()}
      role="search"
      aria-label={t("search.formAriaLabel")}
    >
      <div className="relative flex h-11 w-full items-center rounded-[var(--radius-soft-md)] border border-[#e3e3e3] bg-white px-3.5 shadow-sm transition-colors focus-within:border-[var(--brand)] md:h-12">
        <label htmlFor={id} className="sr-only">
          {t("search.label")}
        </label>

        <Search className="mr-2.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />

        <input
          id={id}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-[var(--text-on-light)] outline-none placeholder:text-[var(--text-muted)]"
          autoComplete="off"
          spellCheck="false"
        />

        {query.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer rounded-md border-0 bg-transparent p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-on-light)]"
            aria-label={t("search.clear")}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
