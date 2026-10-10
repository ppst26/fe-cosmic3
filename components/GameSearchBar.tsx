"use client";

import React, { useState } from "react";

interface GameSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function GameSearchBar({
  placeholder = "ค้นหาเกม | ค่ายเกม",
  onSearch,
}: GameSearchBarProps) {
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
      className="my-2.5 w-full"
      role="search"
      aria-label="แบบฟอร์มค้นหาเกมและผู้ให้บริการ"
    >
      <div
        className="relative flex h-[46px] w-full items-center rounded-[14px] border border-white/[0.08] bg-[rgba(18,17,39,0.8)] px-3.5 transition-all duration-150 focus-within:border-[var(--brand)]/50"
      >
        <label htmlFor="game-search-input" className="sr-only">
          ค้นหาเกมหรือผู้ให้บริการ
        </label>

        <span className="mr-2.5 shrink-0 text-base text-gray-400" aria-hidden="true">
          🔍
        </span>

        <input
          id="game-search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none focus:outline-none sm:text-base"
          autoComplete="off"
          spellCheck="false"
        />

        {query.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md p-1 text-sm text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="ล้างคำค้นหา"
          >
            ×
          </button>
        ) : null}
      </div>
    </form>
  );
}
