"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getSearchSuggestions } from "@/apis";
import ThemeToggle from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { SearchSuggestion } from "@/types/search";
import SearchResults from "./SearchResults";
import Logo from "../../Logo";
import Navbar from "./Navbar";
import { Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/stores/mobileMenu-store";

const Navigation = () => {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchSuggestion[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useMobileMenuStore();

  const debouncedSearch = useDebounce(search, 100);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    isOpen ? onClose() : onOpen();
  }, [isOpen, onClose, onOpen]);

  const closeSearchResults = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (debouncedSearch) {
        try {
          const response = await getSearchSuggestions(debouncedSearch);
          setSearchData(response);
          setShowSearchResults(true);
        } catch (error) {
          console.error("Error fetching search data:", error);
          // Optionally, handle the error state here
        }
      } else {
        setShowSearchResults(false);
      }
    };

    fetchSearchData();
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex items-center justify-between px-2 lg:px-5 py-4 relative">
        <div className="flex flex-row items-center gap-10">
          <Logo />
        </div>
        <div className="md:flex items-center gap-2 lg:gap-4 w-2/4 hidden">
          <Navbar />
          <ThemeToggle />
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {showSearchResults && !isOpen && (
          <SearchResults searchData={searchData} onClose={closeSearchResults} />
        )}
        <div className="lg:hidden" onClick={toggleMobileMenu}>
          <Menu size={30} />
        </div>
      </div>

      {isOpen && (
        <div className="fixed bg-neutral-100 dark:bg-neutral-900 min-h-screen w-[90vw] top-0 right-0 p-3 z-20">
          <div
            className="flex items-end justify-end"
            onClick={toggleMobileMenu}
          >
            <div className="pt-2 pb-5">
              <X size={30} />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={handleSearchChange}
              />
              {showSearchResults && (
                <SearchResults
                  searchData={searchData}
                  onClose={closeSearchResults}
                />
              )}
            </div>
            <Navbar />
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
