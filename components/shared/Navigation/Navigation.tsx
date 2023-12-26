"use client"
import React, { useState, useEffect } from "react";
import { getSearchSuggestions } from "@/apis";
import ThemeToggle from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { SearchSuggestion } from "@/types/search";
import SearchResults from "./SearchResults";

const Navigation = () => {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchSuggestion[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 100);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (debouncedSearch) {
        const response = await getSearchSuggestions(debouncedSearch);
        setSearchData(response);
        setShowSearchResults(true);
      } else {
        setShowSearchResults(false);
      }
    };

    fetchSearchData();
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>logo</div>
      <div className="w-1/4 flex items-center gap-4 relative">
        <ThemeToggle />
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {showSearchResults && (
          <SearchResults
            searchData={searchData}
            onClose={() => setShowSearchResults(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Navigation;
