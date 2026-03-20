"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextValue {
  searched: boolean;
  setSearched: (v: boolean) => void;
}

const SearchContext = createContext<SearchContextValue>({
  searched: false,
  setSearched: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searched, setSearched] = useState(false);
  return (
    <SearchContext.Provider value={{ searched, setSearched }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchState() {
  return useContext(SearchContext);
}

export function HideOnSearch({ children }: { children: ReactNode }) {
  const { searched } = useSearchState();
  if (searched) return null;
  return <>{children}</>;
}
